import json
import os
import re
import time

from bs4 import BeautifulSoup
from selenium import webdriver

ITEMS_TO_SCRAPE = 150
ITEMS = {
    # "men": [
    #     "t-shirt","shirts", "jeans", "trousers", "shorts", "jackets", "sweatshirts",
    #     "suits", "blazers", "innerwear", "track pants", "hoodies", "ethnic wear",
    #     "kurta", "vests", "socks", "sweaters", "coats", "cargos", "swimwear", "nightwear"
    # ],
    "women": [
        # "t-shirt", "tops",
        # "dresses", "jeans", "trousers", "shorts", 
        "skirts", "jackets",
        "sweatshirts", "suits", "blazers", "innerwear", "leggings", "kurti", "ethnic wear",
        "saree", "sweaters", "swimwear", "nightwear", "shrugs", "jumpsuits", "track pants",
        "cardigans", "tunics", "gowns", "palazzos"
    ]
}
OUTPUT_FILE = "myntra_test_data.json"
ACCEPTABLE_KEYS = set({
    'Main Trend', 'Pattern Coverage',
    'Fabric', 'Length',
    'Print or Pattern Type',
    'Pattern',
    'Neck',
    'Sleeve Length', 
    'Type',
    'Occasion',
    'Fit'
})
def get_search_url(gender, query, page_number):
    template = f"https://www.myntra.com/{gender}-clothing?rawQuery={query}&p={page_number}&f=Gender%3A{gender}%2C{gender}"
    return template


def extract_image_url(style):
    match = re.search(r'url\(["\']?(.*?)["\']?\)', style)
    return match.group(1) if match else None

def scrape_item(soup, item_type, gender):
    data = []

    li_elements = soup.find_all('li', class_="product-base")
    product_urls = [
        'http://myntra.com/' + li.find('a', {'data-refreshpage': 'true'})['href']
        for li in li_elements if li.find('a', {'data-refreshpage': 'true'})
    ]

    for url in product_urls:
        product_data = {"product_url": url, "gender": gender, "item_type": item_type}
        try:
            driver.get(url)
            time.sleep(1.5)
            page_soup = BeautifulSoup(driver.page_source, 'html.parser')

            image_divs = page_soup.find_all('div', class_='image-grid-image')\
                # loop through all image divs and extract image urls
            product_data["image_urls"] = []
            for image_div in image_divs:
                product_data["image_urls"].append(extract_image_url(image_div['style']))
                
            product_data["title"] = page_soup.find('h1', class_='pdp-title').text if page_soup.find('h1', class_='pdp-title') else None
            product_data["description"] = page_soup.find('h1', class_='pdp-name').text if page_soup.find('h1', class_='pdp-name') else None
            price_div = page_soup.find('span', class_='pdp-price')
            mrp_div = page_soup.find('span', class_='pdp-mrp')
            product_data["price"] = price_div.text.strip() if price_div else "N/A"
            product_data["mrp"] = mrp_div.text.strip() if mrp_div else "N/A"

            spec_rows = page_soup.find_all('div', class_='index-row')
            specifications = {}
            for row in spec_rows:
                key = row.find('div', class_='index-rowKey')
                value = row.find('div', class_='index-rowValue')
                if key and value and key.text.strip() in ACCEPTABLE_KEYS:
                    specifications[key.text.strip()] = value.text.strip()
            product_data["specifications"] = specifications
        except Exception as e:
            print(f"Error scraping product {url}: {e}")
        data.append(product_data)
    
    return data

def save_to_json(data, file_name):
    if os.path.exists(file_name):
        with open(file_name, 'r') as f:
            existing_data = json.load(f)
    else:
        existing_data = []
    existing_data.extend(data)
    with open(file_name, 'w') as f:
        json.dump(existing_data, f, indent=4)

driver = webdriver.Chrome()

for gender, categories in ITEMS.items():
    for item_type in categories:
        scraped_items = 0
        if scraped_items >= ITEMS_TO_SCRAPE:
            break
        for page in range(1, 3):
            if scraped_items >= ITEMS_TO_SCRAPE:
                print("Scraped enough items. Exiting...")
                break
            search_url = get_search_url(gender, item_type, page)
            driver.get(search_url)
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            print(f"Scraping {search_url}")
            data = scrape_item(soup, item_type, gender)
            scraped_items += len(data)
            save_to_json(data, OUTPUT_FILE)
            print(f"Total scraped items: {scraped_items}")

driver.quit()
print(f"Data scraping completed and saved to '{OUTPUT_FILE}'")
