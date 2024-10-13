import csv
import os
import re
import time

from bs4 import BeautifulSoup
from selenium import webdriver

# Search term
query = "t-shirts"
# gender => ("men","women")
gender="men" 

# File to save the data
csv_file = f'myntra_products_{gender}.csv'


def search_url(query, page_number):
    template = f"https://www.myntra.com/{gender}-clothing?rawQuery={query}&p={page_number}&f=Gender%3A{gender}%2C{gender}"
    return template

# Path to your ChromeDriver
driver = webdriver.Chrome()



# Create CSV file and write headers if the file is empty or does not exist
if not os.path.isfile(csv_file) or os.path.getsize(csv_file) == 0:
    with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Description', 'Product URL', 'Image', 'Specifications'])

def extract_image_url(style):
    # Use regex to extract the URL from the background-image style
    match = re.search(r'url\(["\']?(.*?)["\']?\)', style)
    return match.group(1) if match else None

def get_data(index):
    driver.get(search_url(query, index))
    soup = BeautifulSoup(driver.page_source, 'html.parser')

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
                images.append(image_url or "N/A")

                # Extract specifications
                rows = page_soup.find_all('div', class_='index-row')
                for row in rows:
                    key = row.find('div', class_='index-rowKey')
                    value = row.find('div', class_='index-rowValue')
                    if key and value:
                        _specifications[key.text] = value.text
            except Exception as e:
                print(f"Failed to navigate to {url}. Error: {e}")
                images.append("N/A")

        specifications.append(_specifications)

    # Write each scraped product to the CSV file
    with open(csv_file, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        for i in range(len(product_urls)):
            writer.writerow([
                descriptions[i] or "N/A",
                product_urls[i] or "N/A",
                images[i] or "N/A",
                gender,
                specifications[i] or "N/A"
            ])
        print(f"Page {index} data saved to {csv_file}")

for i in range(1, 20):
    get_data(i)

# Close the driver after scraping
driver.quit()

print("Data scraping completed and saved to 'myntra_products.csv'")
