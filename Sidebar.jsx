import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ role }) => {
  const investorLinks = [
    { name: 'Dashboard', to: '/dashboard/investor' },
    { name: 'Entrepreneurs', to: '/dashboard/investor' },
    { name: 'Messages', to: '/chat' }
  ]

  const entrepreneurLinks = [
    { name: 'Dashboard', to: '/dashboard/entrepreneur' },
    { name: 'Investors', to: '/dashboard/entrepreneur' },
    { name: 'Messages', to: '/chat' }
  ]

  const links = role === 'investor' ? investorLinks : entrepreneurLinks

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-primary-600">
            {role === 'investor' ? 'Investor' : 'Entrepreneur'} Portal
          </h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) => 
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar