
from fastapi import APIRouter, HTTPException, status, Depends, Request


router = APIRouter(prefix="/historical")

@router.get("/", tags=["historical"])
def get():
    pass