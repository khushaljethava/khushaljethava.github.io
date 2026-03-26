---
title: "Python Web Scraping: The Complete Guide for 2026"
description: A complete guide to web scraping with Python covering BeautifulSoup, Selenium, Playwright, handling pagination and authentication, ethical scraping practices, storing scraped data, and a practical project scraping job listings.
date: 2026-04-04 12:00:00 +0800
categories: [Python]
tags: [python, web-scraping]
image:
  path: "/commons/Python Web Scraping The Complete Guide for 2026.png"
  alt: "Python Web Scraping: The Complete Guide for 2026"
---

## Why Web Scraping?

Web scraping extracts structured data from websites. Price monitoring, lead generation, research data collection, competitor analysis, news aggregation — these all rely on scraping. Python is the most popular language for it because of mature libraries like BeautifulSoup, Selenium, and Playwright.

This guide covers the full scraping toolkit: static page parsing, dynamic page handling, authentication, pagination, data storage, and ethical practices. We finish with a complete project that scrapes job listings.

## Setting Up

Install the core libraries:

```python
pip install requests beautifulsoup4 lxml selenium playwright pandas
playwright install chromium
```

## BeautifulSoup for Static Pages

BeautifulSoup parses HTML and lets you navigate the document tree. It works with `requests` to fetch pages and extract data.

```python
import requests
from bs4 import BeautifulSoup

url = "https://news.ycombinator.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, "lxml")

# Find all story titles
titles = soup.select(".titleline > a")
for i, title in enumerate(titles[:10], 1):
    print(f"{i}. {title.text} - {title.get('href', 'N/A')}")
```

### Selecting Elements

BeautifulSoup supports both CSS selectors and its own find methods:

```python
# CSS selectors (recommended)
soup.select("div.article")           # Elements by class
soup.select("#main-content")          # Element by ID
soup.select("table tr td")           # Nested elements
soup.select("a[href^='https']")      # Attribute selectors
soup.select("div.card > h3")         # Direct children

# find() and find_all()
soup.find("h1")                       # First h1
soup.find_all("a", class_="link")    # All matching elements
soup.find("div", {"data-id": "123"}) # By attribute
```

### Extracting Data

```python
import requests
from bs4 import BeautifulSoup

def scrape_quotes():
    """Scrape quotes from a practice site."""
    url = "https://quotes.toscrape.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "lxml")

    quotes = []
    for div in soup.select("div.quote"):
        text = div.select_one("span.text").text
        author = div.select_one("small.author").text
        tags = [tag.text for tag in div.select("a.tag")]
        quotes.append({
            "text": text,
            "author": author,
            "tags": tags
        })

    return quotes

data = scrape_quotes()
for q in data[:3]:
    print(f'"{q["text"]}" — {q["author"]}')
    print(f"  Tags: {', '.join(q['tags'])}")
```

### Adding Headers and Session Management

Websites may block requests that look automated. Set proper headers:

```python
import requests
from bs4 import BeautifulSoup

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
})

response = session.get("https://example.com")
soup = BeautifulSoup(response.text, "lxml")
```

## Handling Pagination

Most scraping targets span multiple pages. Handle this with a loop:

```python
import requests
from bs4 import BeautifulSoup
import time

def scrape_all_pages(base_url: str, max_pages: int = 50) -> list:
    """Scrape data across multiple pages."""
    all_items = []
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })

    for page in range(1, max_pages + 1):
        url = f"{base_url}?page={page}"
        response = session.get(url)

        if response.status_code != 200:
            print(f"Page {page}: HTTP {response.status_code}, stopping.")
            break

        soup = BeautifulSoup(response.text, "lxml")
        items = soup.select("div.item")

        if not items:
            print(f"Page {page}: No items found, stopping.")
            break

        for item in items:
            title = item.select_one("h3").text.strip()
            link = item.select_one("a")["href"]
            all_items.append({"title": title, "link": link, "page": page})

        print(f"Page {page}: {len(items)} items scraped")
        time.sleep(1)  # Be polite — wait between requests

    return all_items

items = scrape_all_pages("https://example.com/listings")
print(f"Total items scraped: {len(items)}")
```

For sites with "next page" links instead of page numbers:

```python
def scrape_with_next_link(start_url: str) -> list:
    """Follow 'next' links to paginate."""
    all_items = []
    url = start_url
    session = requests.Session()

    while url:
        response = session.get(url)
        soup = BeautifulSoup(response.text, "lxml")

        items = soup.select("div.item")
        for item in items:
            all_items.append(item.text.strip())

        # Find the next page link
        next_link = soup.select_one("a.next")
        url = next_link["href"] if next_link else None

        time.sleep(1)

    return all_items
```

## Dynamic Pages with Selenium

Many modern websites load content with JavaScript. BeautifulSoup only sees the initial HTML. Selenium controls a real browser to render JavaScript content.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def setup_driver():
    """Create a headless Chrome driver."""
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    driver = webdriver.Chrome(options=options)
    return driver

def scrape_dynamic_page(url: str) -> list:
    """Scrape a JavaScript-rendered page."""
    driver = setup_driver()
    driver.get(url)

    # Wait for content to load
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.product-card")))

    products = []
    cards = driver.find_elements(By.CSS_SELECTOR, "div.product-card")

    for card in cards:
        name = card.find_element(By.CSS_SELECTOR, "h3.name").text
        price = card.find_element(By.CSS_SELECTOR, "span.price").text
        products.append({"name": name, "price": price})

    driver.quit()
    return products

products = scrape_dynamic_page("https://example.com/products")
```

### Handling Infinite Scroll

Some pages load more content as you scroll down:

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

def scrape_infinite_scroll(url: str, scroll_count: int = 10) -> str:
    """Scroll down to load all content, then return page source."""
    options = Options()
    options.add_argument("--headless=new")
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    last_height = driver.execute_script("return document.body.scrollHeight")

    for i in range(scroll_count):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)  # Wait for content to load

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            print(f"Reached bottom after {i + 1} scrolls")
            break
        last_height = new_height

    page_source = driver.page_source
    driver.quit()
    return page_source
```

## Dynamic Pages with Playwright

Playwright is a newer alternative to Selenium with better async support and auto-waiting:

```python
from playwright.sync_api import sync_playwright

def scrape_with_playwright(url: str) -> list:
    """Scrape a dynamic page using Playwright."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Set viewport and user agent
        page.set_viewport_size({"width": 1920, "height": 1080})

        page.goto(url)

        # Wait for specific content to appear
        page.wait_for_selector("div.product-card", timeout=10000)

        # Extract data using page.evaluate for complex operations
        products = page.evaluate("""
            () => {
                const cards = document.querySelectorAll('div.product-card');
                return Array.from(cards).map(card => ({
                    name: card.querySelector('h3').textContent.trim(),
                    price: card.querySelector('.price').textContent.trim(),
                    link: card.querySelector('a').href
                }));
            }
        """)

        browser.close()
        return products

products = scrape_with_playwright("https://example.com/products")
for p in products[:5]:
    print(f"{p['name']} - {p['price']}")
```

### Async Playwright for Speed

```python
import asyncio
from playwright.async_api import async_playwright

async def scrape_multiple_pages(urls: list[str]) -> list:
    """Scrape multiple pages concurrently with Playwright."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        async def scrape_one(url):
            page = await browser.new_page()
            await page.goto(url)
            await page.wait_for_selector("div.content", timeout=10000)
            title = await page.title()
            content = await page.inner_text("div.content")
            await page.close()
            return {"url": url, "title": title, "content": content[:200]}

        tasks = [scrape_one(url) for url in urls]
        results = await asyncio.gather(*tasks)

        await browser.close()
        return results

urls = [
    "https://example.com/page1",
    "https://example.com/page2",
    "https://example.com/page3",
]
results = asyncio.run(scrape_multiple_pages(urls))
```

## Handling Authentication

Some sites require login before you can access data:

```python
import requests
from bs4 import BeautifulSoup

def scrape_with_login(login_url: str, target_url: str, username: str, password: str) -> str:
    """Log in to a site and scrape a protected page."""
    session = requests.Session()

    # Get the login page to extract CSRF token
    login_page = session.get(login_url)
    soup = BeautifulSoup(login_page.text, "lxml")
    csrf_token = soup.select_one("input[name='csrf_token']")["value"]

    # Submit login form
    login_data = {
        "username": username,
        "password": password,
        "csrf_token": csrf_token
    }
    response = session.post(login_url, data=login_data)

    if response.status_code != 200:
        raise Exception(f"Login failed: HTTP {response.status_code}")

    # Now access the protected page
    target_response = session.get(target_url)
    return target_response.text
```

For sites using cookie-based auth, you can also set cookies directly:

```python
session = requests.Session()
session.cookies.set("session_id", "your_session_cookie_value")
response = session.get("https://example.com/dashboard")
```

## Storing Scraped Data

### CSV with Pandas

```python
import pandas as pd

def save_to_csv(data: list[dict], filename: str):
    """Save scraped data to CSV."""
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False, encoding="utf-8")
    print(f"Saved {len(df)} rows to {filename}")

# Usage
scraped_data = [
    {"title": "Python Developer", "company": "Acme Corp", "salary": "$120,000"},
    {"title": "Data Scientist", "company": "DataCo", "salary": "$130,000"},
]
save_to_csv(scraped_data, "jobs.csv")
```

### SQLite Database

```python
import sqlite3
from contextlib import contextmanager

@contextmanager
def get_db(db_path: str = "scraped_data.db"):
    conn = sqlite3.connect(db_path)
    try:
        yield conn
    finally:
        conn.close()

def setup_database():
    """Create the jobs table."""
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                company TEXT,
                location TEXT,
                salary TEXT,
                url TEXT UNIQUE,
                scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

def save_jobs(jobs: list[dict]):
    """Insert jobs, skipping duplicates based on URL."""
    with get_db() as conn:
        inserted = 0
        for job in jobs:
            try:
                conn.execute(
                    "INSERT INTO jobs (title, company, location, salary, url) VALUES (?, ?, ?, ?, ?)",
                    (job["title"], job["company"], job.get("location"), job.get("salary"), job["url"])
                )
                inserted += 1
            except sqlite3.IntegrityError:
                pass  # Duplicate URL, skip
        conn.commit()
        print(f"Inserted {inserted} new jobs ({len(jobs) - inserted} duplicates skipped)")

setup_database()
```

### JSON for Nested Data

```python
import json
from pathlib import Path

def save_to_json(data: list[dict], filename: str):
    """Save data to JSON with proper formatting."""
    Path(filename).write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    print(f"Saved {len(data)} items to {filename}")

def append_to_json(new_data: list[dict], filename: str):
    """Append to an existing JSON file."""
    path = Path(filename)
    existing = json.loads(path.read_text()) if path.exists() else []
    existing.extend(new_data)
    save_to_json(existing, filename)
```

## Ethical Scraping Practices

Web scraping sits in a gray area. Follow these practices to stay on the right side:

**Respect robots.txt.** Check what the site allows:

```python
from urllib.robotparser import RobotFileParser

def can_scrape(url: str, user_agent: str = "*") -> bool:
    """Check if scraping a URL is allowed by robots.txt."""
    from urllib.parse import urlparse
    parsed = urlparse(url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"

    parser = RobotFileParser()
    parser.set_url(robots_url)
    parser.read()

    return parser.can_fetch(user_agent, url)

if can_scrape("https://example.com/products"):
    print("Scraping allowed")
else:
    print("Scraping blocked by robots.txt")
```

**Rate limiting.** Do not hammer servers. Add delays between requests:

```python
import time
import random

def polite_request(session, url, min_delay=1.0, max_delay=3.0):
    """Make a request with a random delay to be polite."""
    time.sleep(random.uniform(min_delay, max_delay))
    return session.get(url)
```

**Additional guidelines:**

- Check the site's Terms of Service
- Do not scrape personal or private data
- Cache responses to avoid repeated requests
- Identify yourself with a custom User-Agent that includes contact info
- Use official APIs when they exist — scraping is a last resort
- Do not overload small sites; adjust your rate based on the server's capacity

## Complete Project: Scraping Job Listings

Here is a complete scraper that collects job listings, handles pagination, stores results in SQLite, and exports to CSV:

```python
import requests
from bs4 import BeautifulSoup
import sqlite3
import pandas as pd
import time
import random
import logging
from dataclasses import dataclass, asdict
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class Job:
    title: str
    company: str
    location: str
    salary: str
    description: str
    url: str
    posted_date: str

class JobScraper:
    def __init__(self, db_path: str = "jobs.db"):
        self.db_path = db_path
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "JobScraper/1.0 (contact: your@email.com)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        })
        self._setup_db()

    def _setup_db(self):
        conn = sqlite3.connect(self.db_path)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                company TEXT,
                location TEXT,
                salary TEXT,
                description TEXT,
                url TEXT UNIQUE,
                posted_date TEXT,
                scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        conn.close()

    def _polite_get(self, url: str) -> requests.Response:
        """Make a rate-limited request."""
        time.sleep(random.uniform(1.0, 2.5))
        response = self.session.get(url, timeout=30)
        response.raise_for_status()
        return response

    def scrape_listing_page(self, url: str) -> list[Job]:
        """Scrape job cards from a listing page."""
        response = self._polite_get(url)
        soup = BeautifulSoup(response.text, "lxml")
        jobs = []

        for card in soup.select("div.job-card"):
            try:
                title = card.select_one("h2.job-title a").text.strip()
                job_url = card.select_one("h2.job-title a")["href"]
                company = card.select_one("span.company").text.strip()
                location = card.select_one("span.location").text.strip()

                salary_el = card.select_one("span.salary")
                salary = salary_el.text.strip() if salary_el else "Not listed"

                date_el = card.select_one("time")
                posted_date = date_el["datetime"] if date_el else ""

                jobs.append(Job(
                    title=title,
                    company=company,
                    location=location,
                    salary=salary,
                    description="",  # Will be filled by detail scraping
                    url=job_url,
                    posted_date=posted_date
                ))
            except (AttributeError, KeyError) as e:
                logger.warning(f"Failed to parse job card: {e}")
                continue

        return jobs

    def scrape_job_detail(self, job: Job) -> Job:
        """Scrape the full description from a job detail page."""
        try:
            response = self._polite_get(job.url)
            soup = BeautifulSoup(response.text, "lxml")
            description_el = soup.select_one("div.job-description")
            if description_el:
                job.description = description_el.get_text(separator="\n").strip()
        except Exception as e:
            logger.warning(f"Failed to scrape detail for {job.url}: {e}")
        return job

    def save_jobs(self, jobs: list[Job]):
        """Save jobs to SQLite, skipping duplicates."""
        conn = sqlite3.connect(self.db_path)
        inserted = 0
        for job in jobs:
            try:
                conn.execute(
                    """INSERT INTO jobs (title, company, location, salary, description, url, posted_date)
                       VALUES (?, ?, ?, ?, ?, ?, ?)""",
                    (job.title, job.company, job.location, job.salary,
                     job.description, job.url, job.posted_date)
                )
                inserted += 1
            except sqlite3.IntegrityError:
                pass
        conn.commit()
        conn.close()
        logger.info(f"Saved {inserted} new jobs ({len(jobs) - inserted} duplicates)")

    def get_next_page_url(self, soup: BeautifulSoup) -> str | None:
        """Find the next page link."""
        next_btn = soup.select_one("a.next-page")
        return next_btn["href"] if next_btn else None

    def run(self, start_url: str, max_pages: int = 20, scrape_details: bool = True):
        """Run the full scraping pipeline."""
        url = start_url
        all_jobs = []

        for page_num in range(1, max_pages + 1):
            if not url:
                break

            logger.info(f"Scraping page {page_num}: {url}")
            jobs = self.scrape_listing_page(url)

            if not jobs:
                logger.info("No jobs found, stopping.")
                break

            if scrape_details:
                for i, job in enumerate(jobs):
                    logger.info(f"  Detail {i+1}/{len(jobs)}: {job.title}")
                    jobs[i] = self.scrape_job_detail(job)

            all_jobs.extend(jobs)
            self.save_jobs(jobs)

            # Get next page
            response = self.session.get(url)
            soup = BeautifulSoup(response.text, "lxml")
            url = self.get_next_page_url(soup)

        logger.info(f"Scraping complete: {len(all_jobs)} total jobs")
        return all_jobs

    def export_csv(self, output_path: str = "jobs_export.csv"):
        """Export all jobs from the database to CSV."""
        conn = sqlite3.connect(self.db_path)
        df = pd.read_sql_query("SELECT * FROM jobs ORDER BY scraped_at DESC", conn)
        conn.close()
        df.to_csv(output_path, index=False)
        logger.info(f"Exported {len(df)} jobs to {output_path}")
        return df

# Usage
scraper = JobScraper()
jobs = scraper.run("https://example-jobboard.com/python-jobs", max_pages=10)
df = scraper.export_csv("python_jobs.csv")
print(f"\nScraped {len(df)} jobs total")
print(df[["title", "company", "location", "salary"]].head(10))
```

## Error Handling and Retries

Production scrapers need retry logic:

```python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_robust_session() -> requests.Session:
    """Create a session with automatic retries."""
    session = requests.Session()

    retries = Retry(
        total=3,
        backoff_factor=1,          # Wait 1s, 2s, 4s between retries
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"],
    )

    adapter = HTTPAdapter(max_retries=retries)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })

    return session

session = create_robust_session()
response = session.get("https://example.com")  # Will retry on failure
```

## Summary

Web scraping with Python comes down to choosing the right tool for the page type:

- **Static HTML** — Use `requests` + BeautifulSoup. Fast, simple, low resource usage.
- **JavaScript-rendered pages** — Use Playwright or Selenium. Slower but handles dynamic content.
- **API-backed data** — Check the Network tab in browser DevTools. Many "dynamic" sites load data from JSON APIs that you can call directly, skipping the browser entirely.

Key practices: respect `robots.txt`, rate-limit your requests, handle errors with retries, store data incrementally to avoid losing progress, and use unique constraints to prevent duplicates. Start with the simplest approach and add complexity only when needed.
