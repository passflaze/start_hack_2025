#!/bin/bash
set -e

# Avvia Uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
