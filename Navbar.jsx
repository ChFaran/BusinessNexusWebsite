import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import DropdownMenu from './DropdownMenu'

const Navbar = ({ user, logout }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                Business Nexus
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu user={user} logout={logout} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar