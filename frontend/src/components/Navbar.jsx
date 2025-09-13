import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const [profileDropdown, setProfileDropdown] = React.useState(false)
  const { user, setUser, setShowUserLogin, navigate } = useAppContext();

  const logout = () => {
    setUser(null);
    navigate('/');
    setProfileDropdown(false);
  }

  const linkCls =
    "text-xl no-underline visited:no-underline hover:no-underline focus:no-underline active:no-underline " +
    "text-[var(--color-link)] visited:text-[var(--color-link)] hover:text-[var(--color-link-hover)]";

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-[var(--color-bg)] relative z-50 transition-all">
      <NavLink
        to="/"
        className="flex items-center space-x-2"
        onClick={() => setOpen(false)}
        style={{ textDecoration: 'none' }}
      >
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <span className="logo-text">EcoGrocery</span>
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
          Home
        </NavLink>

        <NavLink to="/products" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
          All Products
        </NavLink>

        <NavLink to="/contact" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
          Contacts
        </NavLink>

        {/* Desktop search box */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-48 bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            aria-label="Search products"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.836 10.615 15 14.695" stroke="#4b5563" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#4b5563" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition text-white rounded-full text-lg"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <img
              src="src/assets/profile_icon.png"
              className="w-10 cursor-pointer"
              alt="profile"
              onClick={() => setProfileDropdown(!profileDropdown)}
            />
            {profileDropdown && (
              <ul className="absolute top-12 right-0 bg-white shadow-md border border-gray-200 rounded-md text-sm text-gray-700 whitespace-nowrap z-50">
                <li
                  onClick={() => { navigate("my-orders"); setProfileDropdown(false); }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile menu button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="21" height="1.5" rx=".75" className="fill-[var(--color-primary)]" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" className="fill-[var(--color-primary)]" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" className="fill-[var(--color-primary)]" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50">
          <NavLink to="/" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
            All Products
          </NavLink>
          {user && (
            <NavLink to="/products" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)} className={linkCls} style={{ textDecoration: 'none' }}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition text-white rounded-full text-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition text-white rounded-full text-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
