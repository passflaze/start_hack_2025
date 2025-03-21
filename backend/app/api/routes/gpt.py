from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from deepgram import Deepgram
import asyncio
import os
import json
import ast
import requests
from app.pydantic_models import FinalResult, Asset
import urllib.parse
from app.api.routes.stats import *
from app.sentiment_analysis import get_sentiment_score
from app.api.routes.historical import asset_list


api_key_gemini = "AIzaSyDwep2fdGC4e8OZ1O46yhCxqq9pUgyVgB0"
api_key_gemini_luca = "AIzaSyDwep2fdGC4e8OZ1O46yhCxqq9pUgyVgB0"


from google import genai

client = genai.Client(api_key=api_key_gemini)
client2 = genai.Client(api_key=api_key_gemini_luca)

router = APIRouter(prefix="/gpt")

@router.post("/send_text", response_model=FinalResult, tags=["gpt"])
def send_gpt(text: str):
      model = "GEMINI"
   
   
      query_info = f"""
      Between the tags, you will find a conversation between a financial advisor and their client.  
This conversation may be incomplete.  

<tag>  
{text}  
</tag>  

### **Your Task:**  
Analyze the conversation and summarize the client from a **financial perspective** by identifying:  
1. **Financial situation** (if mentioned).  
2. **Investment goals** (if available).  
3. **Risk profile** (if possible).  

### **Response Format (STRICT RULES)**  
- If sufficient information is available, return a **concise summary** in plain text.  
- If the conversation lacks sufficient details, return exactly 'No info yet'.

       """

      encoded_query_info = urllib.parse.quote(query_info)

      
      response2 = client.models.generate_content(
      model="gemini-2.0-flash", contents=encoded_query_info
      )
      
      info_client = response2.text
      

      query = f"""
       You must define an asset allocation based on the information provided in the text enclosed within <tag></tag>.  

        Consider that this text is an excerpt from an actual conversation between a financial advisor and their client.  
        The conversation may be incomplete.  

        <tag>  
        {text}  
        </tag>  

        If the provided information is insufficient, create a very generic asset allocation.  

        ### **Instructions:**  
        1. Based on the information inside the <tag> section, determine the client's **risk profile**.  
        2. Define an **asset allocation** using the following assets:  

          - iShares Core S&P 500  
          - iShares Core MSCI World  
          - iShares Core MSCI Emerging Markets IMI  
          - iShares Nasdaq 100  
          - iShares MSCI ACWI  
          - Vanguard FTSE All-World  
          - iShares Core DAX  
          - Lyxor Core STOXX Europe 600 (DR)  
          - iShares Core MSCI Europe  
          - Xtrackers MSCI USA  
          - Xtrackers MSCI Emerging Markets  
          - iShares Core EURO STOXX 50  
          - Real Estate Sector  
          - ETF Bond USA 7  
          - ETF Bond USA 10  
          - ETF Bond USA 15  
          - ETF Bond USA 20  
          - ETF Bond USA 30  
          - ETF Inflation Adjusted USA 7  
          - ETF Inflation Adjusted USA 15  
          - Bitcoin  
          - Gold  
          - Silver  
          - Crude Oil  
          - Cash Liquidity  

        3. Assign a **weight** to each asset so that the sum of all weights is exactly **1**.  

        ### **Response Format (CRITICAL)**  
        Return only a **single array** of exactly **24 elements**, where each element represents the weight of the corresponding asset.  

        **DO NOT** include any extra text, explanations, or formatting. Your response must strictly follow this pattern:  

        plaintext
        [0.1, 0.1, 0.2, 0.05, 0.00, 0.0, 0.1, 0.0, 0.05, 0.05, 0.0, 0.0, 0.1, 0.05, 0.0,
        0.01, 0.06, 0.02, 0.00, 0.05, 0.0, 0.0, 0.02, 0.04] 
       """
      
      encoded_query = urllib.parse.quote(query)

      response = client.models.generate_content(
      model="gemini-2.0-flash", contents=encoded_query
      )
      # url = f"https://idchat-api-containerapp01-dev.orangepebble-16234c4b.switzerlandnorth.azurecontainerapps.io/llm?query={encoded_query}"
      # response = requests.post(url)
      # str_weights = response.json()['content']
      str_weights = response.text
      
      from app.api.routes.historical import portfolio_builder
       
       #final_result = FinalResult()

      weights = ast.literal_eval(str_weights)
       
      portfolio = portfolio_builder(weights)

      #portfolio_list = portfolio.to_dict()

      portfolio['date'] = pd.to_datetime(portfolio.index)  # Ensure date is in datetime format

      portfolio_list = [{'date': row[1], 'value': row[0]} for row in portfolio.itertuples(index=False)]           
       
      list_stats1 = [
         get_sharpee_ratio(portfolio),
         get_sortino_ratio(portfolio),
         get_calmar_ratio(portfolio),
         
      ]

      list_stats2 = [
         
         get_alpha(portfolio),
         get_maximum_drawdown(portfolio),
         get_total_return(portfolio),
      ]

      assets = []
      for i, weight in enumerate(weights):
          t = Asset(
              weight = weight,
              label = asset_list[i][0]
          )
          assets.append(t)
      
      final_result = FinalResult(
              assets = assets,
              stats1 =  list_stats1,
              stats2 = list_stats2,
              time_serie =  portfolio_list,
              risk_profile = "null",#r_info[1],
              goal = "null",#r_info[0]
              info = info_client
          )
      
      
      return final_result

    #portfolio builder ritorna un dataframe

    #con il dataframe ottenuto chiamiamo le funzioni di calcolo delgi indici di simo

    #convertiamo il dataframe in una lista di coppie per i grafici

    #returniamo un pydantic





