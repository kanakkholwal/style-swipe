
type RelatedProductsProps = {
    product: string
}

export default async function RelatedProducts(props: RelatedProductsProps) {
    const products = [props]

    if (!products.length) {
        return null
    }

    return (
        <div className="product-page-constraint">
            <div className="flex flex-col items-center text-center mb-16">
                <span className="text-base-regular text-gray-600 mb-6">
                    Related products
                </span>
                <p className="text-2xl-regular text-ui-fg-base max-w-lg">
                    You might also want to check out these products.
                </p>
            </div>

            <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
                {/* {products.map((product) => (
          <li key={product.id}>
            <Productproduct={product} />
          </li>
        ))} */}
            </ul>
        </div>
    )
}