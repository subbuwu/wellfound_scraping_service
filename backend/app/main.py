from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from .scraper.services import WellfoundJobScraper
from typing import List

load_dotenv()

app = FastAPI(title="Wellfound Job Scraper")

origins = [
    "http://localhost:5173",    # Vite default dev server
    "http://localhost:3000",    # Alternative local dev port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        # Allows all methods
    allow_headers=["*"],        # Allows all headers
)

class SearchRequest(BaseModel):
    userKeywords: List[str] = None
    
class SendMessageRequest(BaseModel):
    userMessage : str = None

@app.post("/search-jobs")
async def search_jobs(request: SearchRequest):
    try:
        # call class
        scraper = WellfoundJobScraper()
        
        # call the search_jobs method
        jobs = scraper.search_jobs(
            userCustomJobTitles=request.userKeywords
        )
        
        #return final result to frontend
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  
    
@app.post('/send-message')
async def send_message(request:SendMessageRequest):
    try:
        scraper = WellfoundJobScraper()
        
        messageRes = scraper.send_message(
            userMessage=request.userMessage
        )
        
        return messageRes
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    
    
@app.post('/get-all-messages')
async def get_all_messages():
    try :
        scraper = WellfoundJobScraper()
        
        allMessages = scraper.get_all_messages()
        
        return allMessages
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))