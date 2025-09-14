import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard.jsx' // ensure the .jsx if needed

const AllProducts = () => {
  const ctx = useAppContext?.()
  // Guard the context itself
  const products = Array.isArray(ctx?.products) ? ctx.products : []
  const searchQuery = typeof ctx?.searchQuery === 'string' ? ctx.searchQuery : ''

  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      setFilteredProducts(
        products.filter(p => (p?.name ?? '').toLowerCase().includes(q))
      )
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  const visible = useMemo(
    () => filteredProducts.filter(p => !!p?.inStock),
    [filteredProducts]
  )

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary/40 rounded-full"></div>
      </div>

      {/* Simple sanity info so you can see it’s not blank even if no products */}
      <div className="mt-2 text-sm text-gray-500">
        Showing {visible.length} of {filteredProducts.length} matches
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {visible.map((product, idx) => (
          <ProductCard key={product?._id ?? idx} product={product} />
        ))}
      </div>
    </div>
  )
}

export default AllProducts
