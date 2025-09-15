import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard.jsx'

function ProductCategory() {
  const { products = [] } = useAppContext() || {}
  const { category = '' } = useParams()

  const searchCategory = Array.isArray(categories)
    ? categories.find((item) => (item?.path || '').toLowerCase() === category)
    : null

  const filteredProducts = Array.isArray(products)
    ? products.filter((p) => (p?.category || '').toLowerCase() === category)
    : []

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">{searchCategory.text.toUpperCase()}</p>
          <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
          {filteredProducts.map((product, i) => (
            <div key={product?._id ?? i} className="force-compact">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-green-600/60">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
