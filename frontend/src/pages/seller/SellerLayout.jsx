// src/pages/seller/SellerLayout.jsx
import React from 'react'
import { useAppContext } from '../../context/AppContext.jsx'
import { assets } from '../../assets/assets.js'
import { Link, NavLink, Outlet } from 'react-router-dom'
import toast from 'react-hot-toast'

function SellerLayout() {
  const { setIsSeller, navigate, axios } = useAppContext()

  const sidebarLinks = [
    { name: 'Add Product', path: '/seller', icon: assets.add_icon },
    { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
    { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
  ]

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/seller/logout')
      if (data.success) {
        toast.success(data.message)
        setIsSeller(false)
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/" className="flex items-center gap-3">
          <img className="cursor-pointer w-8 h-8 md:w-10 md:h-10" src={assets.logo} alt="Logo" />
          <span className="text-lg md:text-xl font-semibold text-green-700">Eco-Grocery</span>
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 cursor-pointer hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map(item => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === '/seller'}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-colors
                ${
                  isActive
                    ? 'border-r-4 md:border-r-[6px] bg-green-600/10 border-green-600 text-green-700'
                    : 'hover:bg-gray-100/90 border-white'
                }`
              }
            >
              {/* Smaller icon size controlled here */}
              <img src={item.icon} alt="icon" className="w-5 h-5 md:w-6 md:h-6" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SellerLayout
