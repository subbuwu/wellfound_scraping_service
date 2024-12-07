# Wellfound Job + Messaging Service/Scraper - Manual Header/Cookie Injection 
# Watch the App In Action :
# 1) Job Scraping Service : [Click Here](https://www.dropbox.com/scl/fi/ijfxociwr6569i78wasqf/demo_working_wf_scraping.mov?rlkey=6o5s08lud20x2fqbxko3jo0n5&st=87lr7t46&dl=0)
# 2) Messaging Service : [Click Here](https://www.dropbox.com/scl/fi/euycqp1kdldkh5qhdwq6q/Screen-Recording-2024-12-07-at-7.58.14-PM.mov?rlkey=1v6nqnfk89tgmoz0uk1xs9l8g&st=jd6vusfh&dl=0)

## Overview
 
A full-stack job scraping application that enables users to search for jobs on Wellfound using custom keywords and messasing service. The project leverages FastAPI for the backend, React with Vite and Tailwind CSS for the frontend, and implements scraping techniques through graphql endpoints to bypass anti-bot security measures.

## Screenshots of app :
<img width="1800" alt="Screenshot 2024-12-06 at 9 13 50 PM" src="https://github.com/user-attachments/assets/5939a0f9-d6f5-45d5-9e2c-282124f85da7">
<img width="630" alt="Screenshot 2024-12-06 at 9 14 38 PM" src="https://github.com/user-attachments/assets/005459b3-d64f-4ec5-908a-c3b1e3115280">
<img width="1800" alt="Screenshot 2024-12-07 at 8 09 09 PM" src="https://github.com/user-attachments/assets/c880aad0-d274-4a42-a69d-347177dd387a">
<img width="1800" alt="Screenshot 2024-12-07 at 8 10 08 PM" src="https://github.com/user-attachments/assets/d98c24dc-70af-4895-ab5a-4e7beea9f930">

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

### `/send-message` Endpoint

#### Request Payload
```json
{
  "userMessage" : "Hey there , How's it going ?"
}
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
