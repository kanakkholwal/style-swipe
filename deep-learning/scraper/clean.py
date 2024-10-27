import pandas as pd

OUTPUT_FILE = "myntra_products.csv"
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
