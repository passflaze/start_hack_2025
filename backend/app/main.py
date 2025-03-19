from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware

from datetime import date
from app.api.main import api_router

def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"

from app.pydantic_models import *



app = FastAPI(
    title="Seven", 
    root_path='/v1/seven',
    generate_unique_id_function=custom_generate_unique_id
)

origins = [
    "http://localhost:80",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=3600
)








