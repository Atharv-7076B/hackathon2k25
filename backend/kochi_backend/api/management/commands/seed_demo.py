from django.core.management.base import BaseCommand
from kochi_backend.api.mongo import get_db

class Command(BaseCommand):
    help = "Seed MongoDB with demo data for the dashboard"

    def handle(self, *args, **options):
        db = get_db()

        # Fitness
        db.fitness.delete_many({})
        db.fitness.insert_many([
            {"trainId": "TR-4521", "status": "Valid", "expiry": "2024-03-15", "type": "Annual", "risk": "Low"},
            {"trainId": "TR-4522", "status": "Expired", "expiry": "2024-01-20", "type": "Monthly", "risk": "High"},
            {"trainId": "TR-4523", "status": "Valid", "expiry": "2024-05-10", "type": "Annual", "risk": "Low"},
            {"trainId": "TR-4524", "status": "Due Soon", "expiry": "2024-02-05", "type": "Quarterly", "risk": "Medium"},
        ])

        # Job cards
        db.jobcards.delete_many({})
        db.jobcards.insert_many([
            {"jobId": "JC-2024-001", "train": "TR-4521", "type": "Brake System", "status": "Open", "priority": "High", "assigned": "Team A"},
            {"jobId": "JC-2024-002", "train": "TR-4522", "type": "Engine Check", "status": "Open", "priority": "Medium", "assigned": "Team B"},
            {"jobId": "JC-2024-003", "train": "TR-4523", "type": "Cleaning", "status": "Closed", "priority": "Low", "assigned": "Team C"},
            {"jobId": "JC-2024-004", "train": "TR-4524", "type": "Electrical", "status": "Open", "priority": "High", "assigned": "Team A"},
        ])

        # Branding
        db.branding.delete_many({})
        db.branding.insert_many([
            {"campaign": "Metro Express", "train": "TR-4521", "status": "Active", "expiry": "2024-06-15", "revenue": "$15,000"},
            {"campaign": "City Transit", "train": "TR-4522", "status": "Expired", "expiry": "2024-01-30", "revenue": "$12,500"},
        ])

        # Mileage
        db.mileage.delete_many({})
        db.mileage.insert_many([
            {"trainId": "TR-4521", "mileage": "125,430", "target": "130,000", "variance": "+3.5%", "efficiency": "High"},
            {"trainId": "TR-4522", "mileage": "98,750", "target": "100,000", "variance": "-1.3%", "efficiency": "Normal"},
        ])

        # Cleaning
        db.cleaning.delete_many({})
        db.cleaning.insert_many([
            {"trainId": "TR-4521", "bay": "Bay 3", "time": "2024-02-01 14:00", "status": "Completed", "type": "Deep Clean"},
            {"trainId": "TR-4522", "bay": "Bay 1", "time": "2024-02-01 16:00", "status": "In Progress", "type": "Standard"},
        ])

        # Stabling
        db.stabling.delete_many({})
        db.stabling.insert_many([
            {"trainId": "TR-4521", "bay": "A-12", "position": "Platform Side", "occupied": "18:30", "depart": "05:45", "status": "Occupied"},
            {"trainId": "TR-4522", "bay": "B-7", "position": "Maintenance", "occupied": "20:15", "depart": "06:30", "status": "Available"},
        ])

        # Trains
        db.trains.delete_many({})
        db.trains.insert_many([
            {"id": "TR-4521", "name": "Metro Express 2020", "fitness": "Valid", "jobs": 2, "mileage": "125,430", "bay": "A-12", "status": "Active"},
            {"id": "TR-4522", "name": "Metro Express 2019", "fitness": "Expired", "jobs": 5, "mileage": "98,750", "bay": "M-3", "status": "Maintenance"},
            {"id": "TR-4523", "name": "Metro Express 2021", "fitness": "Valid", "jobs": 1, "mileage": "87,250", "bay": "B-7", "status": "Active"},
            {"id": "TR-4524", "name": "Metro Express 2020", "fitness": "Due Soon", "jobs": 3, "mileage": "112,800", "bay": "A-5", "status": "Active"},
            {"id": "TR-4525", "name": "Metro Express 2022", "fitness": "Valid", "jobs": 0, "mileage": "112,800", "bay": "C-2", "status": "Active"},
        ])

        # ML
        db.ml_failures.delete_many({})
        db.ml_failures.insert_many([
            {"title": "Brake System Failure", "train": "TR-4521", "timeframe": "7-10 days", "probability": 78, "risk": "High", "subtitle": "Schedule immediate inspection"},
            {"title": "Engine Performance Drop", "train": "TR-4522", "timeframe": "14-21 days", "probability": 65, "risk": "Medium", "subtitle": "Monitor closely and plan maintenance"},
            {"title": "Door Mechanism Issue", "train": "TR-4523", "timeframe": "30-45 days", "probability": 45, "risk": "Low", "subtitle": "Include in next scheduled maintenance"},
        ])

        db.ml_trends.delete_many({})
        db.ml_trends.insert_many([
            {"label": "Overall System Health", "value": 92, "change": "+2.3%", "status": "Improving", "color": "primary"},
            {"label": "Predictive Accuracy", "value": 87, "change": "+1.8%", "status": "Stable", "color": "primary"},
            {"label": "Maintenance Efficiency", "value": 74, "change": "-0.5%", "status": "Declining", "color": "primary"},
        ])

        db.ml_suggestions.delete_many({})
        db.ml_suggestions.insert_many([
            {"train": "TR-4521", "component": "Brake Pads", "action": "Replace within 5 days", "priority": "High", "savings": 2400},
            {"train": "TR-4522", "component": "Oil Filter", "action": "Service within 2 weeks", "priority": "Medium", "savings": 800},
            {"train": "TR-4523", "component": "Door Seals", "action": "Inspect and lubricate", "priority": "Low", "savings": 350},
        ])

        self.stdout.write(self.style.SUCCESS("Seeded demo data successfully."))
