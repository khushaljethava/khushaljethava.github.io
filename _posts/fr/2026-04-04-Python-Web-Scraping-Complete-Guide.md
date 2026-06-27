---
title: "Web Scraping avec Python : le guide complet pour 2026"
description: Un guide complet du web scraping avec Python couvrant BeautifulSoup, Selenium, Playwright, la gestion de la pagination et de l'authentification, les pratiques éthiques de scraping, le stockage des données extraites et un projet pratique de scraping d'offres d'emploi.
date: 2026-04-04 12:00:00 +0800
categories: [Python]
tags: [python, web-scraping]
lang: fr
translations: [hi, es, pt, fr, de]
image:
  path: "/commons/Python Web Scraping The Complete Guide for 2026.webp"
  alt: "Flux de travail de web scraping avec Python utilisant BeautifulSoup, Selenium et Playwright pour extraire des données structurées de sites web"
---

## Pourquoi le web scraping ?

Le web scraping extrait des données structurées de sites web. Surveillance des prix, génération de prospects, collecte de données de recherche, analyse de la concurrence, agrégation d'actualités — tout cela repose sur le scraping. Une fois que vous avez extrait des données, vous pouvez les transmettre à l'[analyse de sentiment](/posts/Sentiment-Analysis-with-Python/) ou aux [systèmes de recommandation](/posts/Building-Recommendation-Systems-with-Python/) pour obtenir des informations plus approfondies. Python est le langage le plus populaire pour cela grâce à des bibliothèques matures comme BeautifulSoup, Selenium et Playwright.

Ce guide couvre l'ensemble de la boîte à outils du scraping : analyse de pages statiques, gestion de pages dynamiques, authentification, pagination, stockage des données et pratiques éthiques. Nous terminons par un projet complet qui extrait des offres d'emploi.

Lorsque j'ai constitué des jeux de données d'entraînement pour des modèles de vision par ordinateur chez Codiste, le web scraping était souvent la première étape du pipeline. Pour notre système de détection de dommages automobiles, nous avons extrait des dizaines de milliers d'images de véhicules à partir de galeries publiques de sinistres d'assurance et de forums automobiles afin de compléter les données propriétaires de notre client. L'infrastructure de scraping s'est finalement révélée tout aussi importante que l'architecture du modèle elle-même.

## Configuration

Installez les bibliothèques principales :

```python
pip install requests beautifulsoup4 lxml selenium playwright pandas
playwright install chromium
```

## BeautifulSoup pour les pages statiques

BeautifulSoup analyse le HTML et vous permet de naviguer dans l'arborescence du document. Il fonctionne avec `requests` pour récupérer les pages et extraire les données.

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

### Sélectionner des éléments

BeautifulSoup prend en charge à la fois les sélecteurs CSS et ses propres méthodes de recherche :

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

### Extraire des données

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

### Ajouter des en-têtes et la gestion de session

Les sites web peuvent bloquer les requêtes qui semblent automatisées. Définissez des en-têtes appropriés :

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

## Gérer la pagination

La plupart des cibles de scraping s'étendent sur plusieurs pages. Gérez cela avec une boucle :

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

Pour les sites avec des liens « page suivante » au lieu de numéros de page :

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

## Pages dynamiques avec Selenium

De nombreux sites web modernes chargent le contenu avec JavaScript. BeautifulSoup ne voit que le HTML initial. Selenium contrôle un véritable navigateur pour rendre le contenu JavaScript.

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

### Gérer le défilement infini

Certaines pages chargent plus de contenu au fur et à mesure que vous faites défiler vers le bas :

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

## Pages dynamiques avec Playwright

Playwright est une alternative plus récente à Selenium avec un meilleur support asynchrone et l'attente automatique :

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

### Playwright asynchrone pour la vitesse

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

## Gérer l'authentification

Certains sites exigent une connexion avant de pouvoir accéder aux données :

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

Pour les sites utilisant une authentification basée sur les cookies, vous pouvez également définir les cookies directement :

```python
session = requests.Session()
session.cookies.set("session_id", "your_session_cookie_value")
response = session.get("https://example.com/dashboard")
```

## Stocker les données extraites

Une fois vos données stockées, vous pouvez [visualiser les tendances et les modèles](/posts/Python-Data-Visualization-Matplotlib-Seaborn/) pour donner du sens à de grands jeux de données extraits.

### CSV avec Pandas

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

### Base de données SQLite

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

### JSON pour les données imbriquées

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

## Pratiques éthiques de scraping

Le web scraping se situe dans une zone grise. Suivez ces pratiques pour rester du bon côté :

**Respectez robots.txt.** Vérifiez ce que le site autorise :

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

D'après mon expérience, la vérification de `robots.txt` ne concerne pas seulement l'éthique — elle vous fait gagner du temps de débogage. J'ai un jour passé des heures à dépanner un scraper qui se faisait constamment bloquer, pour finalement réaliser que le site interdisait explicitement les chemins que j'atteignais. Vérifier `robots.txt` en premier m'aurait épargné tout cet effort et m'aurait orienté vers leur API publique à la place.

**Limitation du débit.** Ne martelez pas les serveurs. Ajoutez des délais entre les requêtes :

```python
import time
import random

def polite_request(session, url, min_delay=1.0, max_delay=3.0):
    """Make a request with a random delay to be polite."""
    time.sleep(random.uniform(min_delay, max_delay))
    return session.get(url)
```

**Directives supplémentaires :**

- Vérifiez les conditions d'utilisation du site
- N'extrayez pas de données personnelles ou privées
- Mettez en cache les réponses pour éviter les requêtes répétées
- Identifiez-vous avec un User-Agent personnalisé incluant des informations de contact
- Utilisez les API officielles lorsqu'elles existent — le scraping est un dernier recours
- Ne surchargez pas les petits sites ; ajustez votre débit en fonction de la capacité du serveur

## Projet complet : extraire des offres d'emploi

Voici un scraper complet qui collecte des offres d'emploi, gère la pagination, stocke les résultats dans SQLite et exporte en CSV :

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

## Gestion des erreurs et nouvelles tentatives

Les scrapers de production ont besoin d'une logique de nouvelles tentatives :

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

## Résumé

Le web scraping avec Python revient à choisir le bon outil selon le type de page :

- **HTML statique** — Utilisez `requests` + BeautifulSoup. Rapide, simple, faible utilisation des ressources.
- **Pages rendues avec JavaScript** — Utilisez Playwright ou Selenium. Plus lent mais gère le contenu dynamique.
- **Données issues d'API** — Vérifiez l'onglet Network dans les DevTools du navigateur. De nombreux sites « dynamiques » chargent des données à partir d'API JSON que vous pouvez appeler directement, en contournant entièrement le navigateur.

Pratiques clés : respectez `robots.txt`, limitez le débit de vos requêtes, gérez les erreurs avec des nouvelles tentatives, stockez les données de manière incrémentielle pour éviter de perdre votre progression, et utilisez des contraintes d'unicité pour éviter les doublons. Commencez par l'approche la plus simple et n'ajoutez de la complexité que lorsque c'est nécessaire.

## Articles connexes

- [Analyse de sentiment avec Python](/posts/Sentiment-Analysis-with-Python/) -- Analysez à grande échelle le ton et l'opinion des données textuelles extraites.
- [Visualisation de données Python avec Matplotlib et Seaborn](/posts/Python-Data-Visualization-Matplotlib-Seaborn/) -- Transformez les jeux de données extraits en graphiques et tableaux de bord convaincants.
- [Construire des systèmes de recommandation avec Python](/posts/Building-Recommendation-Systems-with-Python/) -- Utilisez les données de produits ou de contenu extraites pour alimenter des recommandations personnalisées.
