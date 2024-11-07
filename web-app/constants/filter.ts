
const filters = new Map<string,string[]>()

filters.set("gender",
    [
        "men","women"
    ]
)

filters.set("item_type",
    [
        "t-shirt", "shirts", "jeans", "trousers", "shorts", "jackets", "sweatshirts",
        "suits", "blazers", "innerwear", "track pants", "hoodies", "ethnic wear",
        "socks", "sweaters", "coats", "cargos", "swimwear", "nightwear"
    ]
)

filters.set("occasion",
    [
        "casual", "formal", "party", "sports", "travel", "work", "wedding"
    ]
)


export default filters


