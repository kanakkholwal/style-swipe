import csv
import json
import os
import re
import time

import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

ITEMS_TO_SCRAPE = 1000

ITEMS = {
    "men": [
        "t-shirt", "shirts", "jeans", "trousers", "shorts", "jackets", "sweatshirts",
        "suits", "blazers", "innerwear", "track pants", "hoodies", "ethnic wear",
        "kurta", "vests", "socks", "sweaters", "coats", "cargos", "swimwear", "nightwear"
    ],
    "women": [
        "t-shirt", "tops", "dresses", "jeans", "trousers", "shorts", "skirts", "jackets",
        "sweatshirts", "suits", "blazers", "innerwear", "leggings", "kurti", "ethnic wear",
        "saree", "sweaters", "swimwear", "nightwear", "shrugs", "jumpsuits", "track pants",
        "cardigans", "tunics", "gowns", "palazzos"
    ]
}

PROGRESS_FILE = "progress.json"
OUTPUT_FILE = "myntra_products.csv"
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
LABELS= ['description', 'image_url','gender','item_type','specifications'] 

def get_search_url(gender, query, page_number):
    template = f"https://www.myntra.com/{gender}-clothing?rawQuery={query}&p={page_number}&f=Gender%3A{gender}%2C{gender}"
    return template


def extract_image_url(style):
    # Use regex to extract the URL from the background-image style
    match = re.search(r'url\(["\']?(.*?)["\']?\)', style)
    return match.group(1) if match else None

def scrape_item(soup,item_type,index,gender):
    
    # Get descriptions
    description_elements = soup.find_all('h4', class_='product-product')
    descriptions = [desc.text for desc in description_elements] if description_elements else [None]

    # Get product URLs
    li_elements = soup.find_all('li', class_="product-base")
    
    product_urls = [
        'http://myntra.com/' + li.find('a', {'data-refreshpage': 'true', 'target': '_blank'})['href']
        if li.find('a', {'data-refreshpage': 'true', 'target': '_blank'}) else None
        for li in li_elements
    ] if li_elements else [None]

    # Scrape product images from individual product pages
    images = []
    specifications = []
    for url in product_urls:
        _specifications = {}
        image_url = None
        if url:
            try:
                driver.get(url)
                time.sleep(1.5)  # Allow the page to load

                page_soup = BeautifulSoup(driver.page_source, 'html.parser')

                # Extract image URL from the background-image style
                image_div = page_soup.find('div', class_='image-grid-image')
                if image_div and 'style' in image_div.attrs:
                    image_url = extract_image_url(image_div['style'])
                images.append(image_url or None)

                # Extract specifications
                rows = page_soup.find_all('div', class_='index-row')
                for row in rows:
                    key = row.find('div', class_='index-rowKey')
                    value = row.find('div', class_='index-rowValue')
                    if key and value:
                        # if key is None or value is None:
                        formatted_key = key.text.lower().replace(' ', '_')
                        # Check if the original key is in ACCEPTABLE_KEYS
                        original_key = key.text.strip()
                        if original_key in ACCEPTABLE_KEYS:
                            _specifications[formatted_key] = value.text
            except Exception as e:
                print(f"Failed to navigate to {url}. Error: {e}")
                images.append(None)

        specifications.append(_specifications)

    
    progress = get_current_progress()
    if progress['no_of_scraped_items'] < ITEMS_TO_SCRAPE:
        # Write each scraped product to the CSV file
        with open(OUTPUT_FILE, mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            print(f"Writing {len(images)} entries to {OUTPUT_FILE}, {len(images) == len(product_urls)}")
            # update progress
            if len(images) == len(product_urls):
                for i in range(len(product_urls)):
                        writer.writerow([
                            descriptions[i] or "N/A",
                            images[i],
                            gender,
                            item_type,
                            specifications[i] or {}
                        ])
            else:
                print(f"Length of images and product_urls do not match. Images: {len(images)}, Product URLs: {len(product_urls)}")

        # update progress
        progress = get_current_progress()
        progress['no_of_scraped_items'] += len(images)
        progress['page_number']+=1
        try:
            update_progress(progress)
        except Exception as e:
            print(f"Error occurred while updating progress in 'scrape_item': {e}")

        


def get_current_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            progress = json.load(f)
        return progress
    else:
        return None
    
def update_progress(progress):
    json_object = json.dumps(progress, indent=4)
    try:
        # Writing to PROGRESS_FILE.json
        with open(PROGRESS_FILE, "w") as outfile:
            outfile.write(json_object)
    except Exception as e:
        print(f"Error occurred while updating progress in 'update_progress': {e}")

# Create CSV file and write headers if the file is empty or does not exist
if not os.path.isfile(OUTPUT_FILE):
    with open(OUTPUT_FILE, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(LABELS)

    # scraping logic

driver = webdriver.Chrome()

for key, value in ITEMS.items():
    if get_current_progress() is None:
        update_progress({
                        "gender":key,
                        "item_type_index":0,
                        "no_of_scraped_items":0,
                        "page_number":1
            
        })
    else:
        current_progress = get_current_progress()
        update_progress({
                "item_type_index": current_progress["item_type_index"],
                "no_of_scraped_items": current_progress["no_of_scraped_items"],
                "page_number": current_progress["page_number"],
                "gender": key if current_progress["gender"] == key else current_progress["gender"]
            })

                
    print(f"Progress: {get_current_progress()}")
            
    for key_index in range(get_current_progress()['item_type_index'],len(value)):
            if get_current_progress()["no_of_scraped_items"] < ITEMS_TO_SCRAPE:
                # item_type to be searched
                query = value[key_index] 
                page_number = get_current_progress()["page_number"]
                for page_index in range(page_number, 20):
                    if get_current_progress()['no_of_scraped_items'] < ITEMS_TO_SCRAPE:
                        query_url = get_search_url(key,query,page_index)
                        driver.get(query_url)
                        soup = BeautifulSoup(driver.page_source, 'html.parser')
                        print(f"Scraping {query_url}")
                        scrape_item(soup,item_type=query,index=page_index,gender=key)
                        print(f"Progress: {get_current_progress()}")
                    else:
                        break
                    

            progress = get_current_progress()
            
            if progress['item_type_index'] == len(value)-1:
                progress["item_type_index"] = 0
            else:
                progress["item_type_index"] += 1
                
            if progress['no_of_scraped_items'] >= ITEMS_TO_SCRAPE:
                    progress["no_of_scraped_items"] = 0
                    
            progress["page_number"] = 1

            try:
                update_progress(progress)
            except Exception as e:
                print(f"Error occurred while updating progress in 'for i in range(item_type_index,len(value))' loop: {e}")
                print(f"Progress: {get_current_progress()}")

                
    

    driver.quit()
    # Display the stats of the scraped dataset
    try:
        # Load the dataset to DataFrame for easier analysis
        df = pd.read_csv(OUTPUT_FILE)

        # Basic stats
        total_entries = len(df)
        missing_values = df.isna().sum()  # Count of None/NaN values in each column
        non_missing_values = df.notna().sum()  # Count of non-None/NaN values in each column
        column_stats = df.describe(include='all')  # Summary statistics for all columns

        # Display the stats
        print(f"Total entries in the dataset: {total_entries}")
        print("\nNumber of missing values per label:")
        print(missing_values)
        print("\nNumber of non-missing values per label:")
        print(non_missing_values)
        print("\nColumn statistics:")
        print(column_stats)

    except Exception as e:
        print(f"Error while reading or displaying the dataset stats: {e}")


print(f"Data scraping completed and saved to '{OUTPUT_FILE}'")

