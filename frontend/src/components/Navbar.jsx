// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 
      'bg-blue-700 text-white' : 
      'text-gray-700 hover:bg-gray-100'
  }

  return (
    <nav className=" bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MyApp
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/')}`}
            >
              Users
            </Link>
            <Link
              to="/upload"
              className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/upload')}`}
            >
              Upload Files
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
