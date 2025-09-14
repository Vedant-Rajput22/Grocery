import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();

  if (!products || !Array.isArray(products)) {
    return <div className="mt-16">Loading best sellers...</div>;
  }

  const bestSellers = products.filter(p => p.inStock).slice(0, 5);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>

      {/* Same alignment as Categories */}
      <div className="bestseller-grid grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {bestSellers.map((product, i) => (
          <div key={product._id || i} className="force-compact">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
