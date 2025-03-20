
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


@router.get("/sharpee_ratio/", tags=["stats"])
def get_sharpee_ratio():
    sharpe = qs.stats.sharpe(portfolio_data["returns"], rf=RISK_FREE_RATE)
    return {"Sharpe Ratio": sharpe}

@router.get("/sortino_ratio/", tags=["stats"])
def get_sortino_ratio():
    sortino = qs.stats.sortino(portfolio_data["returns"], rf=RISK_FREE_RATE)
    return {"Sortino Ratio": sortino}

@router.get("/calmar_ratio/", tags=["stats"])
def get_calmar_ratio():
    calmar = qs.stats.calmar(portfolio_data["returns"])
    return {"Calmar Ratio": calmar}

@router.get("/alpha/", tags=["stats"])
def get_alpha():
    market_returns = portfolio_data["returns"]  # Sostituisci con benchmark reale se disponibile
    alpha = ep.alpha(portfolio_data["returns"], market_returns, risk_free=RISK_FREE_RATE)
    return {"Alpha": alpha}

@router.get("/beta/", tags=["stats"])
def get_beta():
    market_returns = portfolio_data["returns"]
    beta = ep.beta(portfolio_data["returns"], market_returns)
    return {"Beta": beta}

@router.get("/treynor_ratio/", tags=["stats"])
def get_treynor_ratio():
    market_returns = portfolio_data["returns"]
    treynor = ep.treynor_ratio(portfolio_data["returns"], market_returns, risk_free=RISK_FREE_RATE)
    return {"Treynor Ratio": treynor}

@router.get("/omega_ratio/", tags=["stats"])
def get_omega_ratio():
    port = rp.Portfolio(returns=portfolio_data["returns"].to_frame())
    omega = port.omega_ratio()
    return {"Omega Ratio": omega}

@router.get("/information_ratio/", tags=["stats"])
def get_information_ratio():
    market_returns = portfolio_data["returns"]
    info_ratio = ep.information_ratio(portfolio_data["returns"], market_returns)
    return {"Information Ratio": info_ratio}

@router.get("/maximum_drawdown", tags=["stats"])
def get_maximum_drawdown():
    max_drawdown = qs.stats.max_drawdown(portfolio_data["returns"])
    return {"Maximum Drawdown": max_drawdown}

@router.get("/total_return/", tags=["stats"])
def get_total_return():
    total_return = qs.stats.comp(portfolio_data["returns"])
    return {"Total Return": total_return}

@router.get("/value_at_risk/", tags=["stats"])
def get_value_at_risk():
    model = arch_model(portfolio_data["returns"], vol="Garch", p=1, q=1)
    res = model.fit(disp="off")
    forecast_vol = res.conditional_volatility[-1]

    # The 1.645 quantile is the critical value for a normal distribution at 95% confidence
    var_95_garch = -1.645 * forecast_vol 
    return {"95% Value at Risk (VaR)": var_95_garch}

