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


class FinalResult(BaseModel):
    weights: List[float]
    stats: List[StatRatio]
    time_serie: dict
