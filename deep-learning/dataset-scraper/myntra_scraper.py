import json
import time

from bs4 import BeautifulSoup
from selenium import webdriver


def search_url(url, page_number):
    template = 'https://www.myntra.com/men-clothing?rawQuery={}&p={}&f=Gender%3Amen%2Cmen%20women'
    return template.format(url, page_number)

# Path to your ChromeDriver
driver = webdriver.Chrome()

# search term
query = "t-shirts"

# Lists to store product information
brands = []
descriptions = []
product_urls = []
images = []
specifications = []


def get_data(index):
    driver.get(search_url(query, index))
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Get descriptions
    try:
        description_elements = soup.find_all('h4', class_='product-product')
        descriptions.extend([desc.text for desc in description_elements])
    except AttributeError:
        descriptions.append(None)

    print("Descriptions:", descriptions)

    # Get product URLs
    try:
        li_elements = soup.find_all('li', class_="product-base")
        for li in li_elements:
            a_element = li.find('a', {'data-refreshpage': 'true', 'target': '_blank'})
            product_urls.append('http://myntra.com/' + a_element['href'])
    except AttributeError:
        product_urls.append(None)

    print("Product URLs:", product_urls)

    # Get product images
    try:
        img_elements = soup.find_all('img', class_="img-responsive")
        images.extend([img['src'] for img in img_elements])
    except AttributeError:
        images.append(None)

    # If number of images is less than the number of products, add None for missing images
    while len(images) < len(product_urls):
        images.append(None)

    print("Images:", images)

    # Scrape product details by visiting individual product pages
    for url in product_urls:
        try:
            print("Navigating to:", url)
            driver.get(url)
            time.sleep(1.5)  # Allow the page to load

            page_soup = BeautifulSoup(driver.page_source, 'html.parser')
            rows = page_soup.find_all('div', class_='index-row')

            _specifications = {}
            for row in rows:
                key = row.find('div', class_='index-rowKey').text
                _specifications[key] = row.find('div', class_='index-rowValue').text

            specifications.append(_specifications)

        except Exception as e:
            print(f"Failed to navigate to {url}. Error: {e}")
            specifications.append({})

    print("Specifications:", specifications)

for i in range(1, 20):
    get_data(i)

# Close the driver after scraping
driver.quit()

# Create a DataFrame with all the collected data
products = []

# Ensure that all lists have the same length by appending None where necessary
max_len = max(len(brands), len(descriptions), len(product_urls), len(images), len(specifications))
brands += [None] * (max_len - len(brands))
descriptions += [None] * (max_len - len(descriptions))
product_urls += [None] * (max_len - len(product_urls))
images += [None] * (max_len - len(images))
specifications += [{}] * (max_len - len(specifications))

# Create a dictionary for each product and store it in the products list
for i in range(max_len):
    products.append({
        'brand': brands[i],
        'description': descriptions[i],
        'image': images[i],
        'url': product_urls[i],
        'specifications': specifications[i]
    })

# Save the data to a JSON file
with open('myntra_products.json', 'w') as f:
    json.dump(products, f, indent=4)

print("Data successfully saved to 'myntra_products.json'")
