import ast

import pandas as pd

# Load the dataset
file_path = './myntra_products.csv'
data = pd.read_csv(file_path)

ACCEPTABLE_KEYS = set(key.lower().replace(' ', '_') for key in {
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

# Define a mapping for item_type to wear_type
WEAR_TYPE_MAPPING = {
    # Upper Body
    't-shirt': 'upper_body',
    'shirts': 'upper_body',
    'jackets': 'upper_body',
    'sweatshirts': 'upper_body',
    'suits': 'upper_body',
    'blazers': 'upper_body',
    'hoodies': 'upper_body',
    'sweaters': 'upper_body',
    'coats': 'upper_body',
    'vests': 'upper_body',
    'shrugs': 'upper_body',
    'cardigans': 'upper_body',
    'tank tops': 'upper_body',
    'camisoles': 'upper_body',

    # Lower Body
    'jeans': 'lower_body',
    'trousers': 'lower_body',
    'shorts': 'lower_body',
    'track pants': 'lower_body',
    'cargos': 'lower_body',
    'leggings': 'lower_body',
    'palazzos': 'lower_body',
    'skirts': 'lower_body',
    'dhotis': 'lower_body',
    'lungis': 'lower_body',

    # Full Body
    'kurta': 'full_body',
    'kurti': 'full_body',
    'saree': 'full_body',
    'ethnic wear': 'full_body',
    'jumpsuits': 'full_body',
    'gowns': 'full_body',
    'tunics': 'full_body',
    'dresses': 'full_body',
    'lehenga': 'full_body',
    'salwar kameez': 'full_body',
    'kaftans': 'full_body',

    # Feet
    'shoes': 'feet',
    'sandals': 'feet',
    'heels': 'feet',
    'flip flops': 'feet',
    'boots': 'feet',
    'sneakers': 'feet',
    'socks': 'feet',
    'loafers': 'feet',
    'slippers': 'feet',

    # Accessories
    'belts': 'waist',
    'watches': 'wrist',
    'bracelets': 'wrist',
    'rings': 'fingers',
    'earrings': 'ear',
    'necklace': 'neck',
    'scarves': 'neck',
    'ties': 'neck',
    'hats': 'head',
    'caps': 'head',
    'gloves': 'hands',
    'bags': 'carry',
    'backpacks': 'carry',
    'clutches': 'carry',
    'wallets': 'carry',

    # Nightwear & Swimwear
    'swimwear': 'special',
    'nightwear': 'special',
    'robes': 'special',
    'pajamas': 'special',

    # Sportswear
    'sports bras': 'upper_body',
    'activewear': 'full_body',
    'jerseys': 'upper_body',

    # Innerwear
    'bras': 'innerwear',
    'panties': 'innerwear',
    'briefs': 'innerwear',
    'boxers': 'innerwear',


    # Miscellaneous
    'glasses': 'eyes',
    'sunglasses': 'eyes',
    'masks': 'face',
    'aprons': 'upper_body',
    'overalls': 'full_body',

    # Other (Catch-All)
    'innerwear': 'other',
    'anything not listed': 'other',
}

# Function to assign wear_type
def assign_wear_type(row):
    return WEAR_TYPE_MAPPING.get(row['item_type'], 'other')

# Preprocessing function
def preprocess_data(df):
    # Normalize textual data (all columns except image_url)
    for col in df.columns:
        if col != 'image_url':
            df[col] = df[col].astype(str).str.lower().str.strip()
    
    # Parse 'specifications' column and handle errors
    def parse_specifications(spec):
        try:
            return ast.literal_eval(spec) if isinstance(spec, str) else {}
        except (ValueError, SyntaxError):
            return {}
    
    df['specifications'] = df['specifications'].apply(parse_specifications)
    
    # Expand 'specifications' into separate columns with normalized keys
    specs_df = df['specifications'].apply(lambda x: {k.lower().replace(' ', '_'): v for k, v in x.items() if isinstance(x, dict)})
    specs_df = specs_df.apply(pd.Series)
    df = pd.concat([df.drop(columns=['specifications']), specs_df], axis=1)
    
    # Fill missing values for ACCEPTABLE_KEYS
    for col in ACCEPTABLE_KEYS:
        if col in df.columns:
            df[col] = df[col].fillna('unknown')
        else:
            df[col] = 'unknown'  # Add column if missing in the dataset
    
    # Assign wear_type
    df['wear_type'] = df.apply(assign_wear_type, axis=1)
    
    # Remove duplicates
    df = df.drop_duplicates()
    
    # Drop rows with incomplete essential data
    df = df.dropna(subset=['description', 'image_url', 'gender', 'item_type'])
    
    return df

# Apply preprocessing
preprocessed_data = preprocess_data(data)

# Save to CSV
preprocessed_data.to_csv('./preprocessed_dataset.csv', index=False)

# Display the first few rows
print(preprocessed_data.head())

