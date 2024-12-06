# Wellfound Job Scraper [(Watch the app in action)](https://www.dropbox.com/scl/fi/ijfxociwr6569i78wasqf/demo_working_wf_scraping.mov?rlkey=6o5s08lud20x2fqbxko3jo0n5&st=87lr7t46&dl=0)

## Overview

A full-stack job scraping application that enables users to search for jobs on Wellfound using custom keywords. The project leverages FastAPI for the backend, React with Vite and Tailwind CSS for the frontend, and implements sophisticated web scraping techniques to bypass anti-bot security measures.

## Docs - Checkout http://localhost:8000/docs after running local python fastapi backend server

## Tech Stack

### Backend
- Python
- FastAPI
- Requests library
- Other helper lib

### Frontend
- React
- Vite
- Tailwind CSS
- Shadcn UI Components

## Prerequisites

- Python 
- Node.js
- pip
- npm / yarn / pnpm / bun


### Backend Cookies/Headers Setup

1. Navigate to /backend/app/scraper/companies.py file
```
Replace all the cookies and headers from your wellfound cookie storage
```

## Running the Application

### Start Backend
```bash
cd backend/app
uvicorn app.main:app --reload   
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## Endpoint Description

### `/search-jobs` Endpoint

#### Request Payload
```json
{
  "userKeywords" : ["laravel","backend"]
}
```

#### Response Payload
```json
[
    {
        "job_title": "Full-Stack Engineer (Remote)",
        "company_name": "Infisical",
        "salary": "$70k – $150k • 0.1% – 0.5%",
        "company_type": "PromotedResult"
    },
]
```

## Anti-Bot Bypass Techniques

The application implements advanced techniques to bypass Wellfound's security:

- Manual cookie + header injection such as for example : (`cf_clearance`)
- Apollo GraphQL signature
- Brotli Compression/Decompression Algorithm

## Legal Disclaimer

🚨 This tool is for educational purposes. Always respect Wellfound's terms of service and robots.txt. Ensure you have proper authorization before scraping.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Subramanian - nsubbu2004@gmail.com
