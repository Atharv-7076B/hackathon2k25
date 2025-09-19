from typing import Optional
import os
from pymongo import MongoClient

_client: Optional[MongoClient] = None

def get_client() -> MongoClient:
    global _client
    if _client is None:
        uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        _client = MongoClient(uri)
    return _client

def get_db():
    db_name = os.getenv("MONGODB_DB", "kochi_metro")
    return get_client()[db_name]
