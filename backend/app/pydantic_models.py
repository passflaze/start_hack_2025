from pydantic import BaseModel, EmailStr
from typing import Optional, Literal, Union, Dict, List
from datetime import date, datetime, time
from enum import Enum
from fastapi import UploadFile

class HistoricalData(BaseModel):
    ticker: str
    time_serie: dict

class StatRatio(BaseModel):
    name: str
    value: float


class Asset(BaseModel):
    label: str
    weight: float

class FinalResult(BaseModel):
    assets: List[Asset]
    stats1: List[dict]
    stats2: List[dict]
    time_serie: List[dict]
    risk_profile: str
    goal: str
