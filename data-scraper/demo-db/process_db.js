

const path = "./myntra_test_data.json";
const file = Bun.file(path);

const ITEMS = {
    "men": [
        "t-shirt", "shirts", "jeans", "trousers", "shorts", "jackets", "sweatshirts",
        "suits", "blazers", "innerwear", "track pants", "hoodies", "ethnic wear",
        "kurta", "vests", "socks", "sweaters", "coats", "cargos", "swimwear", "nightwear"
    ],
    "women": [
        "t-shirt", "tops",
        "dresses", "jeans", "trousers", "shorts",
        "skirts", "jackets",
        "sweatshirts", "suits", "blazers", "innerwear", "leggings", "kurti", "ethnic wear", "saree", "sweaters", "swimwear", "nightwear", "shrugs", "jumpsuits", "track pants",
        "cardigans", "tunics", "gowns", "palazzos"
    ]
}
const ACCEPTABLE_KEYS = [...new Set(['Main Trend', 'Pattern Coverage',
    'Fabric', 'Length',
    'Print or Pattern Type',
    'Pattern',
    'Neck',
    'Sleeve Length',
    'Type',
    'Occasion',
    'Fit'])].map((key) => key.toLowerCase())

// # Define a mapping for item_type to wear_type
const WEAR_TYPE_MAPPING = {
    // # Upper Body
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

    // # Lower Body
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

    // # Full Body
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

    // # Feet
    'shoes': 'feet',
    'sandals': 'feet',
    'heels': 'feet',
    'flip flops': 'feet',
    'boots': 'feet',
    'sneakers': 'feet',
    'socks': 'feet',
    'loafers': 'feet',
    'slippers': 'feet',

    // # Accessories
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

    // # Nightwear & Swimwear
    'swimwear': 'special',
    'nightwear': 'special',
    'robes': 'special',
    'pajamas': 'special',

    // # Sportswear
    'sports bras': 'upper_body',
    'activewear': 'full_body',
    'jerseys': 'upper_body',

    // # Innerwear
    'bras': 'innerwear',
    'panties': 'innerwear',
    'briefs': 'innerwear',
    'boxers': 'innerwear',


    // # Miscellaneous
    'glasses': 'eyes',
    'sunglasses': 'eyes',
    'masks': 'face',
    'aprons': 'upper_body',
    'overalls': 'full_body',

    // # Other (Catch-All)
    'innerwear': 'other',
    'anything not listed': 'other',
}
const contents = await file.json();


const sanitizeItem = (item) =>{
    const sanitized_item = {}

    if(!item.product_url || !(Array.isArray(item.image_urls) && item.image_urls.length > 0))
        return null

    sanitized_item.product_url = item.product_url
    sanitized_item.gender = item.gender || "unisex";
    sanitized_item.item_type = item.item_type || "unknown"
    
    sanitized_item.wear_type = WEAR_TYPE_MAPPING[sanitized_item.item_type.toLowerCase()] || "other";
    
    sanitized_item.image_urls = item.image_urls.filter((url) => typeof url === "string" && url.startsWith("http"))
    
    sanitized_item.title = item.title || "unknown"
    sanitized_item.description = item.description || "unknown"

    sanitized_item.price = Number(item.price?.replace(/\u20b9|MRP|\s/g,"").trim() || "0")
    sanitized_item.mrp = Number(item.mrp?.replace(/\u20b9|MRP|\s/g,"").trim() || "0")
    
    
    sanitized_item.specifications = {}
    if(item.specifications && typeof item.specifications === "object"){
        for (const [key,value] of Object.entries(item.specifications)){
            const lowerKey = key.toLowerCase()
            if(ACCEPTABLE_KEYS.includes(lowerKey)){
                sanitized_item.specifications[lowerKey] = value.toLowerCase().trim()
            }
        }
    }
    return sanitized_item
}

const sanitized_items = Array.from(new Set(contents.map(item => sanitizeItem(item))
                        .filter(item => item !== null)))

console.log(sanitized_items.length)

await Bun.write("./processed_db.json",JSON.stringify(sanitized_items,null,2))