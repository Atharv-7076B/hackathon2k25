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
    docs = list(db.fitness.find({}, {"_id": 0}))
    return Response(docs)

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
    docs = list(db.branding.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def mileage_list(request):
    db = get_db()
    docs = list(db.mileage.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def cleaning_list(request):
    db = get_db()
    docs = list(db.cleaning.find({}, {"_id": 0}))
    return Response(docs)

@api_view(["GET"]) 
@permission_classes([AllowAny])
def stabling_list(request):
    db = get_db()
    docs = list(db.stabling.find({}, {"_id": 0}))
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
