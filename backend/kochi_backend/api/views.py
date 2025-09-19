from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .mongo import get_db
from datetime import datetime
from django.http import HttpResponse
import csv
import io

@api_view(["GET"]) 
@permission_classes([AllowAny])
def stats_overview(request):
    db = get_db()
    data = {
        "trainsReady": 147,
        "maintenanceAlerts": 8,
        "adDeadlines": 3,
        "systemHealth": 98.2,
    }
    return Response(data)

# Data Prediction tabs
@api_view(["GET"]) 
@permission_classes([AllowAny])
def fitness_list(request):
    db = get_db()
    # Build fitness certificate view from trainsets validity fields
    rows = []
    for ts in db.trainsets.find({}, {"_id": 0, "train_id": 1, "rolling_stock_validity": 1, "signalling_validity": 1, "telecom_validity": 1, "valid_until": 1, "fitness": 1}):
        status = ts.get("fitness") or "Valid"
        expiry = ts.get("valid_until") or ts.get("rolling_stock_validity") or ts.get("signalling_validity") or ts.get("telecom_validity") or ""
        cert_type = "Consolidated"
        risk = "Low" if status == "Valid" else ("Medium" if status == "Due Soon" else "High")
        rows.append({
            "trainId": ts.get("train_id"),
            "status": status,
            "expiry": expiry,
            "type": cert_type,
            "risk": risk,
        })
    return Response(rows)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def jobcards_list(request):
    db = get_db()
    docs = list(db.jobcards.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def branding_list(request):
    db = get_db()
    # Derive branding view from branding_campaigns
    docs = []
    for c in db.branding_campaigns.find({}, {"_id": 0}):
        docs.append({
            "campaign": c.get("name"),
            "train": c.get("train_id"),
            "status": c.get("status"),
            "expiry": "",
            "revenue": "$0"
        })
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def mileage_list(request):
    db = get_db()
    docs = []
    for ts in db.trainsets.find({}, {"_id": 0, "train_id": 1, "mileage": 1}):
        docs.append({"trainId": ts.get("train_id"), "mileage": ts.get("mileage"), "target": "100,000", "variance": "-", "efficiency": "-"})
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def cleaning_list(request):
    db = get_db()
    docs = []
    for c in db.cleaning_slots.find({}, {"_id": 0}):
        docs.append({
            "trainId": c.get("train_id"),
            "bay": c.get("bay"),
            "time": c.get("time"),
            "status": c.get("status"),
            "type": c.get("type"),
        })
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def stabling_list(request):
    db = get_db()
    docs = []
    for ts in db.trainsets.find({}, {"_id": 0, "train_id": 1, "bay": 1}):
        docs.append({"trainId": ts.get("train_id"), "bay": str(ts.get("bay") or "-"), "position": "-", "occupied": "-", "depart": "-", "status": "Occupied" if ts.get("bay") else "Available"})
    return Response(docs)

# Train audit (legacy)
@api_view(["GET"]) 
@permission_classes([AllowAny])
def trains_list(request):
    db = get_db()
    docs = list(db.trains.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def train_detail(request, train_id: str):
    db = get_db()
    doc = db.trains.find_one({"id": train_id}, {"_id": 0})
    if not doc:
        return Response({"detail": "Not found"}, status=404)
    return Response(doc)

# Trainsets with embedded relations
@api_view(["GET"]) 
@permission_classes([AllowAny])
def trainsets_list(request):
    db = get_db()
    trainsets = list(db.trainsets.find({}, {"_id": 0}))
    campaign_by_id = {c["campaign_id"]: c for c in db.branding_campaigns.find({}, {"_id": 0})}

    results = []
    for ts in trainsets:
        train_id = ts.get("train_id")
        jobcards = list(db.jobcards.find({"train_id": train_id}, {"_id": 0}))
        cleaning_slot = db.cleaning_slots.find_one({"train_id": train_id}, {"_id": 0})
        branding = None
        branding_info = ts.get("branding") or {}
        campaign_id = branding_info.get("campaign_id")
        if campaign_id:
            branding = campaign_by_id.get(campaign_id)
        results.append({
            **ts,
            "jobcards": jobcards,
            "cleaning_slot": cleaning_slot,
            "branding_campaign": branding,
        })
    return Response(results)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def trainset_detail(request, train_id: str):
    db = get_db()
    ts = db.trainsets.find_one({"train_id": train_id}, {"_id": 0})
    if not ts:
        return Response({"detail": "Not found"}, status=404)
    jobcards = list(db.jobcards.find({"train_id": train_id}, {"_id": 0}))
    cleaning_slot = db.cleaning_slots.find_one({"train_id": train_id}, {"_id": 0})
    branding = None
    branding_info = ts.get("branding") or {}
    campaign_id = branding_info.get("campaign_id")
    if campaign_id:
        branding = db.branding_campaigns.find_one({"campaign_id": campaign_id}, {"_id": 0})
    result = {**ts, "jobcards": jobcards, "cleaning_slot": cleaning_slot, "branding_campaign": branding}
    return Response(result)

# Schedules endpoint
@api_view(["GET"]) 
@permission_classes([AllowAny])
def schedules_list(request):
    db = get_db()
    today = datetime.utcnow().strftime("%Y-%m-%d")
    schedule = db.schedules.find_one({"date": today}, {"_id": 0})
    if not schedule:
        schedule = {"date": today, "ranked_list": [], "conflicts": [], "reasoning": "No schedule available"}
    else:
        enriched = []
        for item in schedule.get("ranked_list", []):
            train_id = item.get("train_id")
            ts = db.trainsets.find_one({"train_id": train_id}, {"_id": 0})
            if ts:
                item = {**item, "trainset": ts}
            enriched.append(item)
        schedule["ranked_list"] = enriched
    return Response(schedule)

# Simulation
@api_view(["POST"]) 
@permission_classes([AllowAny])
def simulation_run(request):
    description = request.data.get("description", "")
    impact = [
        {"metric": "Service Frequency", "baseline": "Every 3 minutes", "simulated": "Every 5 minutes", "impact": "Reduced by 40%", "status": "critical"},
        {"metric": "Passenger Capacity", "baseline": "12,000/hour", "simulated": "8,400/hour", "impact": "Reduced by 30%", "status": "warning"},
        {"metric": "Average Delay", "baseline": "2.1 minutes", "simulated": "7.3 minutes", "impact": "Increased by 247%", "status": "critical"},
        {"metric": "Resource Utilization", "baseline": "85%", "simulated": "92%", "impact": "Increased by 8%", "status": "normal"},
    ]
    solutions = [
        {"title": "Deploy backup trains from depot B", "details": "Restore 60% of lost capacity", "implementation": "15 minutes", "cost": "$1,200"},
        {"title": "Reroute trains via alternate track", "details": "Reduce delays by 40%", "implementation": "5 minutes", "cost": "$300"},
        {"title": "Activate emergency bus service", "details": "Handle 2,000 passengers/hour", "implementation": "30 minutes", "cost": "$2,500"},
    ]
    return Response({"description": description, "impact": impact, "solutions": solutions})

# ML analysis
@api_view(["GET"]) 
@permission_classes([AllowAny])
def ml_failures(request):
    db = get_db()
    docs = list(db.ml_failures.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def ml_trends(request):
    db = get_db()
    docs = list(db.ml_trends.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def ml_suggestions(request):
    db = get_db()
    docs = list(db.ml_suggestions.find({}, {"_id": 0}))
    return Response(docs)

# ML train and predictions stubs
@api_view(["POST"]) 
@permission_classes([AllowAny])
def ml_train(request):
    db = get_db()
    run = {"started_at": datetime.utcnow().isoformat() + "Z", "status": "queued"}
    db.ml_runs.insert_one(run)
    return Response({"detail": "Training started", "run": run}, status=202)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def ml_predictions(request):
    db = get_db()
    docs = list(db.ml_predictions.find({}, {"_id": 0}))
    return Response(docs)

# Reports
@api_view(["GET"]) 
@permission_classes([AllowAny])
def report_csv(request):
    db = get_db()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["train_id", "fitness", "status", "mileage", "bay", "passengers"])
    for ts in db.trainsets.find({}, {"_id": 0}):
        writer.writerow([
            ts.get("train_id"), ts.get("fitness"), ts.get("status"), ts.get("mileage"), ts.get("bay"), ts.get("passengers")
        ])
    resp = HttpResponse(output.getvalue(), content_type="text/csv")
    resp["Content-Disposition"] = "attachment; filename=report.csv"
    return resp

@api_view(["GET"]) 
@permission_classes([AllowAny])
def report_pdf(request):
    return Response({"detail": "PDF generation not implemented in this demo"}, status=501)

@api_view(["POST"]) 
@permission_classes([AllowAny])
def ingest_upload(request):
    file = request.FILES.get("file")
    if not file:
        return Response({"detail": "file is required"}, status=400)
    try:
        data = file.read().decode("utf-8")
    except Exception:
        return Response({"detail": "failed to read file"}, status=400)

    db = get_db()
    reader = csv.DictReader(io.StringIO(data))

    def parse_dt(value: str):
        try:
            return datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
        except Exception:
            return None

    trainsets, jobcards, branding_campaigns, cleaning_slots = [], [], [], []
    now = datetime.utcnow()
    for row in reader:
        train_id = (row.get("train_id") or "").strip()
        if not train_id:
            continue
        rolling_valid = parse_dt(row.get("rolling_stock_validity", ""))
        signalling_valid = parse_dt(row.get("signalling_validity", ""))
        telecom_valid = parse_dt(row.get("telecom_validity", ""))
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

    if trainsets:
        db.trainsets.insert_many(trainsets)
    if jobcards:
        db.jobcards.insert_many(jobcards)
    if branding_campaigns:
        db.branding_campaigns.insert_many(branding_campaigns)
    if cleaning_slots:
        db.cleaning_slots.insert_many(cleaning_slots)

    return Response({
        "inserted": {
            "trainsets": len(trainsets),
            "jobcards": len(jobcards),
            "branding_campaigns": len(branding_campaigns),
            "cleaning_slots": len(cleaning_slots)
        }
    })
