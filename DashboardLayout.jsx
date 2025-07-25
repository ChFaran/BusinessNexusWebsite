import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} logout={logout} />
      
      <div className="flex">
        <Sidebar role={user.role} />
        
        <main className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout