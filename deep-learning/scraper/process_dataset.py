import ast

import pandas as pd

# Load the dataset
df = pd.read_csv('myntra_products.csv')
df.drop_duplicates(subset=None, inplace=True)

# Parse the 'specifications' column
def parse_specifications(spec):
    try:
        # Convert string representation of dictionary to actual dictionary
        return ast.literal_eval(spec)
    except (ValueError, SyntaxError):
        return {}

# Apply parsing
df['specifications'] = df['specifications'].apply(parse_specifications)

# Get all unique keys across all specifications
unique_keys = set()
df['specifications'].apply(lambda spec: unique_keys.update(spec.keys()))

print(unique_keys)
# Create columns for each unique key with default None values
for key in unique_keys:
    df[key] = df['specifications'].apply(lambda spec: spec.get(key, None))

# Drop the original 'specifications' column
df = df.drop(columns=['specifications'])

# Encode categorical columns (e.g., using one-hot encoding)
df = pd.get_dummies(df, columns=list(unique_keys), dummy_na=True)

# Encode the 'gender' column as numerical values
df['gender'] = df['gender'].map({'men': 0, 'women': 1})

# Save the processed DataFrame
df.to_csv('processed_style_swipe_dataset.csv', index=False)
df.to_csv('processed_style_swipe_dataset.csv', index=False)
