from fastapi import APIRouter, HTTPException, status, Depends, Request
from app.pydantic_models import *
import pickle
import os


asset_list = [
['iShares Core S&P 500', 'CSSPX.MI'], 
['iShares Core MSCI World', 'SWDA.MI'], 
['iShares Core MSCI Emerging Markets IMI', 'EIMI.MI'], 
['iShares Nasdaq 100', 'CSNDX.MI'], 
['iShares MSCI ACWI', 'IUSQ.MI'], 
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

def create_portfolio_time_series(init_amount, weights, asset_list, data_dir):
    """
    Crea una serie temporale dell'andamento del portafoglio basata sui pesi degli asset.
    
    :param init_amount: Capitale iniziale del portafoglio.
    :param weights: Lista di pesi per gli asset.
    :param asset_list: Lista degli asset con i rispettivi ticker.
    :param data_dir: Directory dove si trovano i file pickle delle serie storiche.
    :return: DataFrame con la serie temporale del portafoglio.
    """
    
    if len(weights) != len(asset_list):
        raise ValueError("La lunghezza della lista dei pesi deve corrispondere alla lunghezza della lista degli asset.")
    
    portfolio_df = None
    
    for i, (asset_name, ticker) in enumerate(asset_list):
        file_path = f"{data_dir}/{ticker}"+"_data"+".pkl"
        try:
            asset_data = load_pickle(file_path)
            asset_data = asset_data.sort_index()  # da controllare ordine
            
            if portfolio_df is None:
                portfolio_df = asset_data.copy()
                portfolio_df.columns = ['Price']
                portfolio_df['Portfolio'] = portfolio_df['Price'] * weights[i]
            else:
                asset_data.columns = ['Price']
                portfolio_df = portfolio_df.join(asset_data, how='outer', rsuffix=f'_{ticker}')
                portfolio_df[f'Portfolio_{ticker}'] = portfolio_df[f'Price_{ticker}'] * weights[i]
        except FileNotFoundError:
            print(f"File non trovato per {ticker}, verrà ignorato.")
    
    if portfolio_df is None:
        raise ValueError("Nessun dato caricato. Controllare la directory e i file disponibili.")
    
    # Sommare tutti i contributi degli asset per ottenere il valore del portafoglio
    portfolio_df['Portfolio'] = portfolio_df.filter(like='Portfolio_').sum(axis=1)
    
    # Normalizzare rispetto al capitale iniziale
    portfolio_df['Portfolio'] = (portfolio_df['Portfolio'] / portfolio_df['Portfolio'].iloc[0]) * init_amount
    
    return portfolio_df[['Portfolio']]

def portfolio_builder(weights):
    
    init_amount = 1000000
    
    data_directory = "app/files"  # Directory con i file pickle
    portfolio_series = create_portfolio_time_series(init_amount, weights, asset_list, data_directory)
    
    # Salvataggio della serie temporale nella directory "app/files"
    save_path = "app/files/portfolio_series.pkl"
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    portfolio_series.to_pickle(save_path)
    

    
    return {"message": "Portfolio salvato con successo", "file_path": save_path}