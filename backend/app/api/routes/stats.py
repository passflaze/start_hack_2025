
from fastapi import APIRouter, HTTPException, status, Depends, Request


router = APIRouter(prefix="/stats")

@router.get("/sharpee_ratio/", tags=["stats"])
def get_sharpee_ratio():
    pass