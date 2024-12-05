import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

class Base:
    URL = "https://wellfound.com"

class WellfoundLogin:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)
        self.cookies = [
            {"name": "ajs_anonymous_id", "value": "4b1d4467-7819-49ca-8779-8d1c1d72e6f3"},
            {"name": "logged_in", "value": "true"},
            {"name": "wellfound", "value": "0baa98d6e90b3ef6cbfb7ddfec24455f.i"},
            {"name": "cfclearance", "value": "bw5pe5Uty588d848uqRDSi7hhukmBf2VTxPATemtVbU-1733400444-1.2.1.1-vFuLJlo.phKl0Ehn5E04DemIJMB4NrfqIRKuB9ITCNk_nrKp9uBRzFBm9ahAEiwPFVC3pTnr9mcoF1eqhNmluYxHZ1FWsJ9vVKCkrDI4S90FKrt0OlXQybj1LBmK3.v41nV69zTJQ7C6ab0h2.Ohw28F.Lp2CGX5BjpZO4qhiqhgztF0qOqFwo0CxfpA6LtBS.odM2forIab0Grg855ZA5Sy1zgQg3sP4FDNznq5TK2QD1MSo0VgdBhF0yttHyD1DOl9bGRY8rLqA88D1aDuarhX1hU6TEczq.wtayGg.E04STv5vQYOX4ejB2TFWw7qT7EefEAsJ1Ya2bv4tTF_R.Kr8hontJd2CttNp3..q.pbYRlgnDhj5UUfesgr1nFhzSF.HIg_ho9XfifSEN0KfQ"},
            # {"name": "mkrastck", "value": "105d3fa4432a62065203cb85b17464b1%3A1733400775.335053"},
            {"name": "datadome", "value": "u6tjZE25IxyBtD5bHoY3W94~N2L7OAoZ_pJddcz4sZIApjTvLiAyj_VWVBCxVfgxawQFZTlH6qvBhPVqVSNeqyvkZ8uYAHXfvBTZrgevqgZ1E~u~ITrXynvNDGNNh37H"},
        ]

    def attach_cookies(self):
        """Attach cookies to the browser."""
        self.driver.get(Base.URL)  # Navigate to base URL to set domain
        for cookie in self.cookies:
            self.driver.add_cookie(cookie)
        self.driver.refresh()  # Refresh to apply cookies

    def login(self, email=None, password=None):
        """Perform login to Wellfound."""
        try:
            # Attach cookies and check if already logged in
            self.attach_cookies()
            if "/jobs" in self.driver.current_url:
                print("Login successful using cookies")
                return True
            
            # Navigate to login page if cookies don't work
            self.driver.get(f"{Base.URL}/login")

            # Fill email
            email_input = self.wait.until(
                EC.presence_of_element_located((By.ID, "user_email"))
            )
            email_input.send_keys(email)

            # Fill password
            password_input = self.driver.find_element(By.ID, "user_password")
            password_input.send_keys(password)

            # Submit login
            login_button = self.driver.find_element(By.NAME, "commit")
            login_button.click()

            # Wait for login to complete
            self.wait.until(
                EC.url_contains("/jobs")
            )
            
            return True
        except Exception as e:
            print(f"Login failed: {e}")
            return False
