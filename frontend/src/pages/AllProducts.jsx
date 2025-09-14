import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard.jsx'

const AllProducts = () => {
  const ctx = useAppContext?.()
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

      <div className="mt-2 text-sm text-gray-500">
        Showing {visible.length} of {filteredProducts.length} matches
      </div>

      <div className="grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6 ">
        {visible.map((product, idx) => (
          <div key={product?._id ?? idx} className="force-compact">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
