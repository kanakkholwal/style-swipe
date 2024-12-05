import pandas as pd

OUTPUT_FILE = "myntra_products.csv"
df = pd.read_csv(OUTPUT_FILE)

# Remove rows with any null values
df_cleaned = df.dropna()

# Display statistics of the cleaned DataFrame
print("Statistical Summary of the Cleaned DataFrame:")
print(df_cleaned.describe(include='all'))

# Additional statistics
print("\nAdditional Information after Cleaning:")
print(f"Number of unique values in each column:\n{df_cleaned.nunique()}")
print(f"\nMissing values in each column:\n{df_cleaned.isnull().sum()}")
print(f"\nData types of each column:\n{df_cleaned.dtypes}")

# Save the cleaned DataFrame to a new CSV file
df_cleaned.to_csv(OUTPUT_FILE, index=False)
