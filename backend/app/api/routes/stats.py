
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
    return {"Sharpe Ratio": sharpe}

def get_sortino_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    sortino = qs.stats.sortino(portfolio_data["returns"], rf=RISK_FREE_RATE)
    return {"Sortino Ratio": sortino}

def get_calmar_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    calmar = qs.stats.calmar(portfolio_data["returns"])
    return {"Calmar Ratio": calmar}

def get_alpha(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    market_returns = portfolio_data["returns"]  # Sostituisci con benchmark reale se disponibile
    alpha = ep.alpha(portfolio_data["returns"], market_returns, risk_free=RISK_FREE_RATE)
    return {"Alpha": alpha}

def get_beta(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    market_returns = portfolio_data["returns"]
    beta = ep.beta(portfolio_data["returns"], market_returns)
    return {"Beta": beta}

def get_treynor_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    market_returns = portfolio_data["returns"]
    treynor = ep.treynor_ratio(portfolio_data["returns"], market_returns, risk_free=RISK_FREE_RATE)
    return {"Treynor Ratio": treynor}

def get_omega_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    port = rp.Portfolio(returns=portfolio_data["returns"].to_frame())
    omega = port.omega_ratio()
    return {"Omega Ratio": omega}

def get_information_ratio(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    market_returns = portfolio_data["returns"]
    info_ratio = ep.information_ratio(portfolio_data["returns"], market_returns)
    return {"Information Ratio": info_ratio}

def get_maximum_drawdown(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    max_drawdown = qs.stats.max_drawdown(portfolio_data["returns"])
    return {"Maximum Drawdown": max_drawdown}

def get_total_return(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    total_return = qs.stats.comp(portfolio_data["returns"])
    return {"Total Return": total_return}

def get_value_at_risk(portfolio_data):
    
    portfolio_data["returns"] = portfolio_data["portfolio_value"].pct_change().dropna()
    
    model = arch_model(portfolio_data["returns"], vol="Garch", p=1, q=1)
    res = model.fit(disp="off")
    forecast_vol = res.conditional_volatility[-1]

    # The 1.645 quantile is the critical value for a normal distribution at 95% confidence
    var_95_garch = -1.645 * forecast_vol 
    return {"95% Value at Risk (VaR)": var_95_garch}

