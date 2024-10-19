import pandas as pd

filename = 'myntra_products_women.csv'
# Load the CSV file
df = pd.read_csv(filename)

# Remove the specified column
df = df.drop('Product URL', axis=1)

# Save the updated DataFrame back to a CSV file
df.to_csv(filename, index=False)
