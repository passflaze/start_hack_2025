
from fastapi import APIRouter, HTTPException, status, Depends, Request
import pandas as pd
import numpy as np
import quantstats as qs
import empyrical as ep
import riskfolio as rp
from arch import arch_model

router = APIRouter(prefix="/stats")

# TEST VARIABLES --------------------------------
portfolio_data = pd.DataFrame({
    "date": pd.date_range(start="2022-01-01", periods=500, freq="D"),
    "portfolio_value": np.cumsum(np.random.normal(0.5, 2, 500)) + 1000
})
portfolio_data.set_index("date", inplace=True)

portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()

RISK_FREE_RATE = 0.02 / 252
#----------------------------------------------------------------


def get_sharpee_ratio(portfolio_data):
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    sharpe = qs.stats.sharpe(portfolio_data["returns"], rf=RISK_FREE_RATE)
    return {"Sharpe Ratio": float(sharpe)}

def get_sortino_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    sortino = qs.stats.sortino(portfolio_data["returns"], rf=RISK_FREE_RATE)
    return {"Sortino Ratio": float(sortino)}

def get_calmar_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    calmar = qs.stats.calmar(portfolio_data["returns"])
    return {"Calmar Ratio": float(calmar)}

def get_alpha(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    market_returns = portfolio_data["returns"]  # Sostituisci con benchmark reale se disponibile
    alpha = ep.alpha(portfolio_data["returns"], market_returns, risk_free=RISK_FREE_RATE)
    return {"Alpha": float(alpha)}


def get_maximum_drawdown(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    max_drawdown = qs.stats.max_drawdown(portfolio_data["returns"])
    return {"Maximum Drawdown": float(max_drawdown)}

def get_total_return(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    total_return = qs.stats.comp(portfolio_data["returns"])
    return {"Total Return": float(total_return)}


