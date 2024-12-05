import ast

import pandas as pd

# Load the dataset
file_path = './myntra_products.csv'
data = pd.read_csv(file_path)


# Preprocessing function
def preprocess_data(df):
    # 1. Normalize textual data
    df['description'] = df['description'].str.lower().str.strip()
    df['gender'] = df['gender'].str.lower().str.strip()
    df['item_type'] = df['item_type'].str.lower().str.strip()

    # 2. Parse 'specifications' column from string to dictionary
    df['specifications'] = df['specifications'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

    # 3. Expand 'specifications' into separate columns
    specs_df = df['specifications'].apply(pd.Series)
    df = pd.concat([df.drop(columns=['specifications']), specs_df], axis=1)

    # 4. Remove duplicates
    df = df.drop_duplicates()

    # 5. Remove rows with incomplete essential data
    df = df.dropna(subset=['description', 'image_url', 'gender', 'item_type'])

    return df

# Apply preprocessing
preprocessed_data = preprocess_data(data)

def handle_missing_data(df):
    # Fill missing values in categorical columns with "Unknown"
    categorical_columns = ['fabric', 'fit', 'length', 'main trend', 'neck', 'occasion']
    for col in categorical_columns:
        if col in df.columns:
            df[col] = df[col].fillna("Unknown")

    # Fill missing values in numerical columns with a default (e.g., -1)
    numerical_columns = []  # Add numerical columns if any exist
    for col in numerical_columns:
        if col in df.columns:
            df[col] = df[col].fillna(-1)

    return df


preprocessed_data = handle_missing_data(preprocessed_data)

# Display the first few rows of the preprocessed dataset

print(preprocessed_data.head())
