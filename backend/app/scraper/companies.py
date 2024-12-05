import json
import requests
from typing import List, Dict
import brotli

class WellfoundJobScraper:
    def __init__(self):
        # mimic the browser request
        self.headers = {
            # ":authority:": "wellfound.com",
            # ":method:": "POST",
            # ":path:": "/graphql",
            # ":scheme:": "https",
            "Accept": "*/*",
            "Accept-encoding": "gzip, deflate, br, zstd",
            "Accept-language": "en-GB,en;q=0.7",
            "Apollographql-client-name": "talent-web",
            "Content-type": "application/json",
            "Origin": "https://wellfound.com",
            "Priority": "u=1, i",
            "Referer": "https://wellfound.com/jobs",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "same-origin", 
            "Sec-Fetch-Site": "same-origin",
            "Sec-Gpc": "1",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "X-Angellist-D-Client-Referrer-Resource": "/jobs",
            "X-Apollo-Operation-Name": "JobSearchResultsX",
            "X-Apollo-Signature" : "1733401165-LvEj0wYsOIy%2BzSx2NAdVxKIxX3gefRPh2AakHunyUpE%3D",
            "X-Requested-With": "XMLHttpRequest",
            "Cookie" : "ajs_anonymous_id=3f74e26f-6910-40a6-8f20-73b54c51cd4c; logged_in=true; _wellfound=7a4a660a0b0493b2d15323a3e3015b4d.i; cf_clearance=_lbT17d7VRUJIkOqXTBg6SdM8r9pCiOmQRnlERLAD54-1733401166-1.2.1.1-VYLkX2Kvyn9Op_u0hIolbaBurrkJDQc5kZyYwq9FXgWS02Df.aQ6ERtPdojm4US1o0dco7h4SPz2jeGy5ngeZA3U3ZjIL2usFRX8_dgT7W0ho35T3.QLR_ur6DdxWRbEcA7Rzv4fk1jrqndXCAOhRzPWV3vPspxOcWZmixpG.14ao7NZkTBlKXPIbLO0fx4einwxwyjRGb1F1LGp2fG9WX7uibawGERHhMEvZhqIBTOKyA.O2yRU9.tcZcVEmC.3fCWw3YAK1n26cbWkGncnHxxi5FJLFOuQxADJGe5kROxBkDlWNG41b1QFS2a51qnf6SyQdJTa09566qL7vqhv7q5foA.Cwkk8qz4_4eqRF0NliPvg1B07KO6fMqKcqXePZL57JorpMcrLJyZ24FnM4g; datadome=zW_~Hg0R7nywHAPZtYemNwNKcT5l7sYdDOd10QTYuruj0cbSIN_t2CbQcMgV61ULQ3Atk_Db4XZl8Hq0SDplY88vl3tYc1wN1uHbWiRZi69NB70mo64auCKOb4U2Ch96"
        }

        # attach the cookies
        self.cookies = {
            "ajs_anonymous_id": "4b1d4467-7819-49ca-8779-8d1c1d72e6f3",
            "logged_in": "true",
            "*wellfound": "0baa98d6e90b3ef6cbfb7ddfec24455f.i",
            "cf*clearance": "bw5pe5Uty588d848uqRDSi7hhukmBf2VTxPATemtVbU-1733400444-1.2.1.1-vFuLJlo.phKl0Ehn5E04DemIJMB4NrfqIRKuB9ITCNk_nrKp9uBRzFBm9ahAEiwPFVC3pTnr9mcoF1eqhNmluYxHZ1FWsJ9vVKCkrDI4S90FKrt0OlXQybj1LBmK3.v41nV69zTJQ7C6ab0h2.Ohw28F.Lp2CGX5BjpZO4qhiqhgztF0qOqFwo0CxfpA6LtBS.odM2forIab0Grg855ZA5Sy1zgQg3sP4FDNznq5TK2QD1MSo0VgdBhF0yttHyD1DOl9bGRY8rLqA88D1aDuarhX1hU6TEczq.wtayGg.E04STv5vQYOX4ejB2TFWw7qT7EefEAsJ1Ya2bv4tTF_R.Kr8hontJd2CttNp3..q.pbYRlgnDhj5UUfesgr1nFhzSF.HIg_ho9XfifSEN0KfQ",
            "datadome": "u6tjZE25IxyBtD5bHoY3W94~N2L7OAoZ_pJddcz4sZIApjTvLiAyj_VWVBCxVfgxawQFZTlH6qvBhPVqVSNeqyvkZ8uYAHXfvBTZrgevqgZ1E~u~ITrXynvNDGNNh37H"
        }

    def search_jobs(
        self, 
        userCustomJobTitles : List[str]
    ) -> List[Dict]:
        # GraphQL payload 
        payload = {
            "operationName": "JobSearchResultsX",
            "variables": {
                "filterConfigurationInput": {
                    "page": 1,
                    "customJobTitles": 
                        userCustomJobTitles
                    ,
                    "equity": {
                        "min": None,
                        "max": None
                    },
                    "remotePreference": "REMOTE_OPEN",
                    "salary": {
                        "min": None,
                        "max": None
                    },
                    "yearsExperience": {
                        "min": None,
                        "max": None
                    }
                }
            },
            "extensions": {
                "operationId": "tfe/2aeb9d7cc572a94adfe2b888b32e64eb8b7fb77215b168ba4256b08f9a94f37b"
            }
        }

        try:
            response = requests.post(
                "https://wellfound.com/graphql",
                json=payload,
                headers=self.headers,
                cookies=self.cookies
            )
            response.raise_for_status()

            try:
                data = response.json()
                jobs = []
                
                for edge in data['data']['talent']['jobSearchResults']['startups']['edges']:
                    node = edge.get('node', {})
                    if node.get('__typename') == 'StartupSearchResult':
                        job_listing = node.get('highlightedJobListings', [{}])[0]
                        jobs.append({
                            'job_title': job_listing.get('title', 'N/A'),
                            'company_name': node.get('name', 'N/A'),
                            'salary': job_listing.get('compensation', 'N/A'),
                            'company_type' : 'StartupSearchResult'
                        })
                    elif node.get('__typename') == 'PromotedResult':
                        job_node = node.get('promotedStartup', node)
                        job_listing = job_node.get('highlightedJobListings', [{}])[0]
                        jobs.append({
                            'job_title': job_listing.get('title', 'N/A'),
                            'company_name': job_node.get('name', 'N/A'),
                            'salary': job_listing.get('compensation', 'N/A'),
                            'company_type' : 'PromotedResult'
                        })
                    elif node.get('__typename') == 'FeaturedStartups':
                        for featured_job in node.get('featuredStartups', []):
                            job_node = featured_job.get('promotedStartup', featured_job)
                            job_listing = job_node.get('highlightedJobListings', [{}])[0]
                            jobs.append({
                                'job_title': job_listing.get('title', 'N/A'),
                                'company_name': job_node.get('name', 'N/A'),
                                'salary': job_listing.get('compensation', 'N/A'),
                                'company_type' : 'FeaturedStartups'
                            })
                return jobs
                
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}")
                decompressed_data = brotli.decompress(response.content)
                data = json.loads(decompressed_data)
                print('decompressed data : ',data) 
                return False          

        except requests.RequestException as e:
            print(f"Error fetching jobs: {e}")
            return []
