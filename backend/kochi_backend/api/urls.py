from django.urls import path
from . import views

urlpatterns = [
    path("stats/overview/", views.stats_overview),

    path("prediction/fitness/", views.fitness_list),
    path("prediction/jobcards/", views.jobcards_list),
    path("prediction/branding/", views.branding_list),
    path("prediction/mileage/", views.mileage_list),
    path("prediction/cleaning/", views.cleaning_list),
    path("prediction/stabling/", views.stabling_list),

    path("trains/", views.trains_list),
    path("trains/<str:train_id>/", views.train_detail),

    path("trainsets/", views.trainsets_list),
    path("trainsets/<str:train_id>/", views.trainset_detail),

    path("schedules/", views.schedules_list),

    path("simulations/run/", views.simulation_run),

    path("ml/failures/", views.ml_failures),
    path("ml/trends/", views.ml_trends),
    path("ml/suggestions/", views.ml_suggestions),
    path("ml/train/", views.ml_train),
    path("ml/predictions/", views.ml_predictions),

    path("reports/pdf/", views.report_pdf),
    path("reports/csv/", views.report_csv),

    path("ingest/upload/", views.ingest_upload),
]
