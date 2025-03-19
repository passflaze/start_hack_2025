from fastapi import APIRouter
from app.api.routes import stats, historical
api_router = APIRouter()

api_router.include_router(historical.router)
api_router.include_router(stats.router)
