from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from .scraper.companies import WellfoundJobScraper
from typing import List

load_dotenv()

app = FastAPI(title="Wellfound Job Scraper")

class SearchRequest(BaseModel):
    userKeywords: List[str] = None

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