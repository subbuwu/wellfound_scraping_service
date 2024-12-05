import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from .scraper.initDriver import create_chrome_driver
from .scraper.login import WellfoundLogin
from .scraper.companies import WellfoundJobScraper


load_dotenv()

app = FastAPI(title="Wellfound Job Scraper")

class SearchRequest(BaseModel):
    query: str = None
    page: int = 1
    remote_only: bool = True

@app.on_event("startup")
async def startup_event():
    # Create global driver and login
    from selenium import webdriver
    options = webdriver.ChromeOptions()
    app.state.driver = webdriver.Chrome(options=options)
    # login = WellfoundLogin(app.state.driver)

    # # Login using cookies or fallback credentials
    # if not login.login(email, password):
    #     raise HTTPException(status_code=500, detail="Login failed")

@app.on_event("shutdown")
async def shutdown_event():
    # Quit the driver when app shuts down
    app.state.driver.quit()

@app.post("/search-jobs")
async def search_jobs(request: SearchRequest):
    """
    Search for job listings on Wellfound
    """
    try:
        scraper = WellfoundJobScraper(app.state.driver)
        jobs = scraper.search_jobs(
            query=request.query,
            page=request.page,
            remote_only=request.remote_only
        )
        return jobs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  