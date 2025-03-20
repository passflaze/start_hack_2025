from fastapi import APIRouter
from app.api.routes import stats, historical, gpt
api_router = APIRouter()

api_router.include_router(historical.router)
api_router.include_router(stats.router)
api_router.include_router(gpt.router)