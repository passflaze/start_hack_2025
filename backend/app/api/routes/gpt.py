from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from deepgram import Deepgram
import asyncio
import os
import json
import ast
import requests
from app.pydantic_models import FinalResult
import urllib.parse
from app.api.routes.stats import *

router = APIRouter(prefix="/gpt")

@router.post("/send_text", tags=["gpt"])
def send_gpt(text: str):
   

      from sentiment_analysis import sentiment_analysis
      sentiment = sentiment_analysis(text)
   
      query_info = f"""
       between the tags you will hear a conversation between a financial advisor and his client.
         the conversation may not be complete.
       
       <tag>
       {text}
       </tag>

       From this conversation i want to know the client goals and the risk profile.
       Return me a array with two strings inside, in the first one define the goal of the client,
       in the second one his risk profile on a 0-10 scale.
       
       Example of the answer:
       ["Retirement as early as possible", "7"]
       
       Another example
       ["Buy an house for my brother", "5"]
       
       """

      encoded_query_info = urllib.parse.quote(query_info)

      

      url_info = f"https://idchat-api-containerapp01-dev.orangepebble-16234c4b.switzerlandnorth.azurecontainerapps.io/llm?query={encoded_query_info}"
      response_info = requests.post(url_info)
       
      r_info = response_info.json()
      r_info = ast.literal_eval(r_info["content"])
       


      query = f"""
       you have to define an asset allocation given the information of the following text surrounded by <tag></tag>.
       Consider that the text is extracted from an actual conversation from a financial advisor and his client.
       the conversation may not be complete.
       
       <tag>
       {text}
       </tag>

       If you think this information is not complete, consider a very generic asset allocation, 

       Given this information between tags, you have to determine the client's profile risk and define
       an asset allocation based on the following assets:

       ['iShares Core S&P 500'], 
       ['iShares Core MSCI World'], 
       ['iShares Core MSCI Emerging Markets IMI'], 
       ['iShares Nasdaq 100'], 
       ['iShares MSCI ACWI'], 
       ['Vanguard FTSE All-World'],
       ['iShares Core DAX'], 
       ['Lyxor Core STOXX Europe 600 (DR)'], 
       ['iShares Core MSCI Europe'], 
       ['Xtrackers MSCI USA'], 
       ['Xtrackers MSCI Emerging Markets'], 
       ['iShares Core EURO STOXX 50'], 
       ["Real Estate Sector"],
       ["ETF Bond USA 7"],  
       ["ETF Bond USA 10"],  
       ["ETF Bond USA 15"],  
       ["ETF Bond USA 20"], 
       ["ETF Bond USA 30"],  
       ["ETF Inflation Adjusted USA 7",],
       ["ETF Inflation Adjusted USA 15",],
       ["Bitcoin",],
       ["Gold",],
       ["Silver",],
       ["Crude Oil",],
       ["Cash Liquidity",]

       for each asset, you should decide a weight in the portfolio.
       the sum of all the weights should be 1.

       Return me only one array of 25 elements, where each element is the weight of an asset.
       you can only return an answer like the following.
       don't say anithing except the following array.

       IT'S CRITICAL THAT YOU ANSWER WITH THIS PATTERN!!!!!!!!!!
       DON'T WRITE ANYTHING ELSE
       
       
       [0.1, 0.1, 0.2, 0.05, 0.00, 0.0, 0.1, 0.0, 0.05, 0.05, 0.0, 0.0, 0.1, 0.05, 0.0,
       0.01, 0.06, 0.02, 0.00, 0.05, 0.0, 0.0, 0.02, 0.04, 0.0] 
       """

      encoded_query = urllib.parse.quote(query)


      url = f"https://idchat-api-containerapp01-dev.orangepebble-16234c4b.switzerlandnorth.azurecontainerapps.io/llm?query={encoded_query}"
       

      response = requests.post(url)
      r = response.json()
       
      from app.api.routes.historical import portfolio_builder
       

      string_weights = r["content"]

       #final_result = FinalResult()

      weights = ast.literal_eval(string_weights)
       
      portfolio = portfolio_builder(weights)
      portfolio_json = portfolio.to_json()
       
       
       
      list_stats = [
         get_sharpee_ratio(portfolio),
         get_sortino_ratio(portfolio),
         get_calmar_ratio(portfolio),
         get_alpha(portfolio),
         get_beta(portfolio),
         get_treynor_ratio(portfolio),
         get_omega_ratio(portfolio),
         get_information_ratio(portfolio),
         get_maximum_drawdown(portfolio),
         get_total_return(portfolio),
         get_value_at_risk(portfolio),
      ]
      
      final_result.stats = FinalResult(
        weights: weights
        stats: list_stats
        time_serie: portfolio_json
        risk_profile: r_info[1]
        goal: r_info[0]
      )

    #portfolio builder ritorna un dataframe

    #con il dataframe ottenuto chiamiamo le funzioni di calcolo delgi indici di simo

    #convertiamo il dataframe in una lista di coppie per i grafici

    #returniamo un pydantic



def send_gpt(text: str):

       query_2 = f"""
       between the tags you will hear a conversation between a financial advisor and his client.
         the conversation may not be complete.
       
       <tag>
       {text}
       </tag>

       From this conversation i want to know the client goals and the risk profile.
       Return me a array with two strings inside, in the first one define the goal of the client,
       in the second one his risk profile on a 0-10 scale.
       
       Example of the answer:
       ["Retirement as early as possible", "7"]
       
       Another example
       ["Buy an house for my brother", "5"]
       
       """

       encoded_query = urllib.parse.quote(query)

       url = f"https://idchat-api-containerapp01-dev.orangepebble-16234c4b.switzerlandnorth.azurecontainerapps.io/llm?query={encoded_query}"


       response = requests.post(url)
       r = response.json()
       
       from app.api.routes.historical import portfolio_builder
       

       string_weights = r["content"]