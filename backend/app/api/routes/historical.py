from fastapi import APIRouter, HTTPException, status, Depends, Request
from app.pydantic_models import *
import pickle
import pandas as pd
import os


asset_list = [
['iShares Core S&P 500', 'CSSPX.MI'], 
['iShares Core MSCI World', 'SWDA.MI'], 
['iShares Core MSCI Emerging Markets IMI', 'EIMI.MI'], 
['iShares Nasdaq 100', 'CSNDX.MI'], 
['iShares MSCI ACWI', 'ACWI'], 
['Vanguard FTSE All-World', 'VWCE.MI'], ['iShares Core DAX', 'EXS1.MI'], 
['Lyxor Core STOXX Europe 600 (DR)', 'MEUD.MI'], 
['iShares Core MSCI Europe', 'SMEA.MI'], 
['Xtrackers MSCI USA', 'XD9U.MI'], 
['Xtrackers MSCI Emerging Markets', 'XMME.MI'], 
['iShares Core EURO STOXX 50', 'CSSX5E.MI'], 
["Real Estate Sector", "XLRE"],
["ETF Bond USA 7", "GOVT"],  
["ETF Bond USA 10", "TLH"],  
["ETF Bond USA 15", "LTPZ"],  
["ETF Bond USA 20", "XTLT.TO"], 
["ETF Bond USA 30", "UTHY"],  
["ETF Inflation Adjusted USA 7", "TIP"],
["ETF Inflation Adjusted USA 15", "LTPZ"],
["Bitcoin", "BTC=F"],
["Gold", "GC=F"],
["Silver", "SI=F"],
["Crude Oil", "CL=F"],
["Cash Liquidity", "CSH.PA"]]

duration_backtest = 10

router = APIRouter(prefix="/portfolio")

def load_pickle(file_path):
    """Carica un file pickle e restituisce il contenuto."""
    with open(file_path, 'rb') as f:
        return pickle.load(f)


def portfolio_builder(weights):
    
    portfolio_df = load_pickle("./app/files/portfolio.pkl")
    weighted_df = portfolio_df * weights

    portfolio_df = pd.DataFrame(index = weighted_df.index)
    portfolio_df["portfolio_value"] = weighted_df.sum(axis = 1)

    print(portfolio_df)

    portfolio_df.dropna(inplace = True)
    return portfolio_df
