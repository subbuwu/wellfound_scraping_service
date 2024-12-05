import os
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
    """
    Search for job listings on Wellfound
    """
    try:
        scraper = WellfoundJobScraper()
        jobs = scraper.search_jobs(
            userCustomJobTitles=request.userKeywords
        )
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  