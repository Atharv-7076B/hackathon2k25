import csv
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from kochi_backend.api.mongo import get_db
from datetime import datetime

class Command(BaseCommand):
    help = "Ingest kmrl_train_data.csv into MongoDB collections (trainsets, jobcards, branding_campaigns, cleaning_slots, schedules) with required relationships."

    def add_arguments(self, parser):
        parser.add_argument("csv_path", nargs="?", default="kmrl_train_data.csv", help="Path to CSV file")

    def handle(self, *args, **options):
        csv_path = Path(options["csv_path"]).resolve()
        if not csv_path.exists():
            raise CommandError(f"CSV not found: {csv_path}")
        db = get_db()

        trainsets = []
        jobcards = []
        branding_campaigns = []
        cleaning_slots = []

        def parse_dt(value: str):
            try:
                return datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
            except Exception:
                return None

        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                train_id = (row.get("train_id") or "").strip()
                if not train_id:
                    continue

                now = datetime.utcnow()
                rolling_valid = parse_dt(row.get("rolling_stock_validity", ""))
                signalling_valid = parse_dt(row.get("signalling_validity", ""))
                telecom_valid = parse_dt(row.get("telecom_validity", ""))
                # The earliest validity date is the limiting factor
                valid_dates = [d for d in [rolling_valid, signalling_valid, telecom_valid] if d]
                valid_until = min(valid_dates).strftime("%Y-%m-%d %H:%M:%S") if valid_dates else ""
                fitness = "Valid" if all([(rolling_valid and rolling_valid > now), (signalling_valid and signalling_valid > now), (telecom_valid and telecom_valid > now)]) else ("Due Soon" if any([d and d > now for d in [rolling_valid, signalling_valid, telecom_valid]]) else "Expired")

                campaign_id = f"CMP_{train_id}"
                trainsets.append({
                    "train_id": train_id,
                    "name": train_id,
                    "fitness": fitness,
                    "status": "Active" if (row.get("job_card_status", "").strip().lower() != "open") else "Maintenance",
                    "mileage": row.get("current_mileage") or "",
                    "bay": row.get("stabling_bay") or "",
                    "passengers": int(float(row.get("passengers") or 0)),
                    "stations_covered": int(float(row.get("stations_covered") or 0)),
                    "ticket_sales": float(row.get("ticket_sales") or 0.0),
                    "branding": {"campaign_id": campaign_id},
                    "rolling_stock_validity": row.get("rolling_stock_validity") or "",
                    "signalling_validity": row.get("signalling_validity") or "",
                    "telecom_validity": row.get("telecom_validity") or "",
                    "valid_until": valid_until,
                })

                jobcards.append({
                    "job_id": f"JC_{train_id}_001",
                    "train_id": train_id,
                    "type": "General",
                    "priority": "High" if (row.get("job_card_status", "").strip().lower() == "open") else "Medium",
                    "status": row.get("job_card_status") or "Closed",
                    "assigned": "Team A",
                })

                hours_left = int(float(row.get("branding_hours_left") or 0))
                branding_campaigns.append({
                    "campaign_id": campaign_id,
                    "name": f"Campaign for {train_id}",
                    "status": "Active" if hours_left > 0 else "Expired",
                    "hours_left": hours_left,
                    "train_id": train_id,
                })

                cleaning_slots.append({
                    "train_id": train_id,
                    "bay": row.get("stabling_bay") or "",
                    "time": row.get("last_deep_clean_date") or "",
                    "status": "Completed",
                    "type": "Deep Clean",
                })

        db.trainsets.delete_many({})
        if trainsets:
            db.trainsets.insert_many(trainsets)
        db.jobcards.delete_many({})
        if jobcards:
            db.jobcards.insert_many(jobcards)
        db.branding_campaigns.delete_many({})
        if branding_campaigns:
            db.branding_campaigns.insert_many(branding_campaigns)
        db.cleaning_slots.delete_many({})
        if cleaning_slots:
            db.cleaning_slots.insert_many(cleaning_slots)

        ranked = []
        for ts in trainsets:
            ranked.append({"train_id": ts["train_id"], "score": ts.get("passengers", 0)})
        ranked.sort(key=lambda x: x["score"], reverse=True)
        schedule_doc = {
            "date": datetime.utcnow().strftime("%Y-%m-%d"),
            "ranked_list": ranked,
            "conflicts": [],
            "reasoning": "Ranked by passengers descending.",
        }
        db.schedules.delete_many({"date": schedule_doc["date"]})
        db.schedules.insert_one(schedule_doc)

        self.stdout.write(self.style.SUCCESS(
            f"Ingested {len(trainsets)} trainsets, {len(jobcards)} jobcards, {len(branding_campaigns)} campaigns, {len(cleaning_slots)} cleaning slots."
        ))
