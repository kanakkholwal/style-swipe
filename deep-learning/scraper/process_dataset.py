import ast

import pandas as pd

# Load the dataset
df = pd.read_csv('myntra_products_men.csv')

# Parse the 'Specifications' column
def parse_specifications(spec):
    try:
        # Convert string representation of dictionary to actual dictionary
        return ast.literal_eval(spec)
    except (ValueError, SyntaxError):
        return {}

# Apply parsing
df['Specifications'] = df['Specifications'].apply(parse_specifications)

# Get all unique keys across all specifications
unique_keys = set()
df['Specifications'].apply(lambda spec: unique_keys.update(spec.keys()))

print(unique_keys)
# Create columns for each unique key with default None values
for key in unique_keys:
    df[key] = df['Specifications'].apply(lambda spec: spec.get(key, None))

# Drop the original 'Specifications' column
df = df.drop(columns=['Specifications'])

# Encode categorical columns (e.g., using one-hot encoding)
df = pd.get_dummies(df, columns=list(unique_keys), dummy_na=True)

# Encode the 'Gender' column as numerical values
df['Gender'] = df['Gender'].map({'men': 0, 'women': 1})

# Save the processed DataFrame
df.to_csv('processed_style_swipe_dataset.csv', index=False)
df.to_csv('processed_style_swipe_dataset.csv', index=False)
