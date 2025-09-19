# Kochi Metro Backend (Django + MongoDB)

This backend provides REST APIs for the Kochi Metro dashboard using Django REST Framework and MongoDB (via PyMongo).

## Quickstart

1. Create and activate venv

```
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies

```
pip install -r requirements.txt
```

3. Configure environment

Create a `.env` file in `backend/`:

```
DJANGO_SECRET_KEY=change-me
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=kochi_metro
```

4. Run server

```
python manage.py runserver 0.0.0.0:8000
```

5. Seed sample data

```
python manage.py seed_demo
```

## Endpoints

- GET /api/stats/overview/
- GET /api/prediction/fitness/
- GET /api/prediction/jobcards/
- GET /api/prediction/branding/
- GET /api/prediction/mileage/
- GET /api/prediction/cleaning/
- GET /api/prediction/stabling/
- GET /api/trains/
- GET /api/trains/<train_id>/
- POST /api/simulations/run/
- GET /api/ml/failures/
- GET /api/ml/trends/
- GET /api/ml/suggestions/

All responses are JSON. Data is stored in MongoDB collections with similar names.
