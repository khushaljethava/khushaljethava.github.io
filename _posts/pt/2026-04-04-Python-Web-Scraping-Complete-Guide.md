---
title: "Web Scraping com Python: O Guia Completo para 2026"
description: Um guia completo de web scraping com Python cobrindo BeautifulSoup, Selenium, Playwright, tratamento de paginação e autenticação, práticas éticas de scraping, armazenamento de dados extraídos e um projeto prático que extrai vagas de emprego.
date: 2026-04-04 12:00:00 +0800
categories: [Python]
tags: [python, web-scraping]
lang: pt
translations: [hi, es, pt]
image:
  path: "/commons/Python Web Scraping The Complete Guide for 2026.webp"
  alt: "Fluxo de trabalho de web scraping com Python usando BeautifulSoup, Selenium e Playwright para extrair dados estruturados de sites"
---

## Por Que Web Scraping?

O web scraping extrai dados estruturados de sites. Monitoramento de preços, geração de leads, coleta de dados de pesquisa, análise da concorrência, agregação de notícias — tudo isso depende de scraping. Depois de extrair os dados, você pode alimentá-los em [análise de sentimentos](/posts/Sentiment-Analysis-with-Python/) ou [sistemas de recomendação](/posts/Building-Recommendation-Systems-with-Python/) para obter insights mais profundos. Python é a linguagem mais popular para isso por causa de bibliotecas maduras como BeautifulSoup, Selenium e Playwright.

Este guia cobre o conjunto completo de ferramentas de scraping: análise de páginas estáticas, tratamento de páginas dinâmicas, autenticação, paginação, armazenamento de dados e práticas éticas. Terminamos com um projeto completo que extrai vagas de emprego.

Quando construí conjuntos de dados de treinamento para modelos de visão computacional na Codiste, o web scraping era frequentemente o primeiro passo do pipeline. Para o nosso sistema de detecção de danos em veículos, extraímos dezenas de milhares de imagens de veículos de galerias públicas de sinistros de seguros e fóruns automotivos para complementar os dados proprietários do nosso cliente. A infraestrutura de scraping acabou sendo tão importante quanto a própria arquitetura do modelo.

## Configuração

Instale as bibliotecas principais:

```python
pip install requests beautifulsoup4 lxml selenium playwright pandas
playwright install chromium
```

## BeautifulSoup para Páginas Estáticas

O BeautifulSoup analisa HTML e permite navegar pela árvore do documento. Ele funciona com `requests` para buscar páginas e extrair dados.

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

### Selecionando Elementos

O BeautifulSoup suporta tanto seletores CSS quanto seus próprios métodos de busca:

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

### Extraindo Dados

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

### Adicionando Cabeçalhos e Gerenciamento de Sessão

Os sites podem bloquear requisições que parecem automatizadas. Defina cabeçalhos apropriados:

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

## Tratando a Paginação

A maioria dos alvos de scraping abrange várias páginas. Trate isso com um loop:

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

Para sites com links de "próxima página" em vez de números de página:

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

## Páginas Dinâmicas com Selenium

Muitos sites modernos carregam conteúdo com JavaScript. O BeautifulSoup só enxerga o HTML inicial. O Selenium controla um navegador real para renderizar conteúdo JavaScript.

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

### Tratando o Scroll Infinito

Algumas páginas carregam mais conteúdo à medida que você rola para baixo:

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

## Páginas Dinâmicas com Playwright

O Playwright é uma alternativa mais recente ao Selenium, com melhor suporte assíncrono e espera automática:

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

### Playwright Assíncrono para Mais Velocidade

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

## Tratando Autenticação

Alguns sites exigem login antes de você poder acessar os dados:

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

Para sites que usam autenticação baseada em cookies, você também pode definir cookies diretamente:

```python
session = requests.Session()
session.cookies.set("session_id", "your_session_cookie_value")
response = session.get("https://example.com/dashboard")
```

## Armazenando Dados Extraídos

Depois que seus dados estiverem armazenados, você pode [visualizar tendências e padrões](/posts/Python-Data-Visualization-Matplotlib-Seaborn/) para dar sentido a grandes conjuntos de dados extraídos.

### CSV com Pandas

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

### Banco de Dados SQLite

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

### JSON para Dados Aninhados

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

## Práticas Éticas de Scraping

O web scraping fica em uma área cinzenta. Siga estas práticas para permanecer do lado certo:

**Respeite o robots.txt.** Verifique o que o site permite:

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

Pela minha experiência, a verificação do `robots.txt` não é apenas uma questão de ética — ela economiza tempo de depuração. Uma vez passei horas resolvendo problemas em um scraper que continuava sendo bloqueado, só para perceber que o site explicitamente proibia os caminhos que eu estava acessando. Verificar o `robots.txt` primeiro teria poupado todo esse esforço e me apontado para a API pública deles.

**Limitação de taxa.** Não sobrecarregue os servidores. Adicione atrasos entre as requisições:

```python
import time
import random

def polite_request(session, url, min_delay=1.0, max_delay=3.0):
    """Make a request with a random delay to be polite."""
    time.sleep(random.uniform(min_delay, max_delay))
    return session.get(url)
```

**Diretrizes adicionais:**

- Verifique os Termos de Serviço do site
- Não extraia dados pessoais ou privados
- Armazene as respostas em cache para evitar requisições repetidas
- Identifique-se com um User-Agent personalizado que inclua informações de contato
- Use APIs oficiais quando existirem — o scraping é o último recurso
- Não sobrecarregue sites pequenos; ajuste sua taxa de acordo com a capacidade do servidor

## Projeto Completo: Extraindo Vagas de Emprego

Aqui está um scraper completo que coleta vagas de emprego, trata a paginação, armazena os resultados em SQLite e exporta para CSV:

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

## Tratamento de Erros e Tentativas

Scrapers de produção precisam de lógica de tentativas:

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

## Resumo

O web scraping com Python se resume a escolher a ferramenta certa para o tipo de página:

- **HTML estático** — Use `requests` + BeautifulSoup. Rápido, simples, baixo uso de recursos.
- **Páginas renderizadas com JavaScript** — Use Playwright ou Selenium. Mais lento, mas lida com conteúdo dinâmico.
- **Dados servidos por API** — Verifique a aba Network nas DevTools do navegador. Muitos sites "dinâmicos" carregam dados de APIs JSON que você pode chamar diretamente, dispensando o navegador por completo.

Práticas essenciais: respeite o `robots.txt`, limite a taxa das suas requisições, trate erros com tentativas, armazene os dados de forma incremental para não perder o progresso e use restrições de unicidade para evitar duplicatas. Comece com a abordagem mais simples e adicione complexidade apenas quando necessário.

## Posts Relacionados

- [Análise de Sentimentos com Python](/posts/Sentiment-Analysis-with-Python/) -- Analise o tom e a opinião de dados de texto extraídos em escala.
- [Visualização de Dados em Python com Matplotlib e Seaborn](/posts/Python-Data-Visualization-Matplotlib-Seaborn/) -- Transforme conjuntos de dados extraídos em gráficos e painéis envolventes.
- [Construindo Sistemas de Recomendação com Python](/posts/Building-Recommendation-Systems-with-Python/) -- Use dados de produtos ou conteúdo extraídos para alimentar recomendações personalizadas.
