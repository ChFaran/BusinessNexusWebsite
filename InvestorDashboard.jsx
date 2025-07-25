import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

const mockEntrepreneurs = [
  {
    id: '1',
    name: 'Sarah Tech',
    startupName: 'Tech Innovators',
    pitchSummary: 'Building the next generation of AI tools for small businesses',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Tech&background=random'
  },
  {
    id: '2',
    name: 'Mike Green',
    startupName: 'Eco Solutions',
    pitchSummary: 'Sustainable packaging solutions to reduce plastic waste',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Green&background=random'
  },
  {
    id: '3',
    name: 'Lisa Health',
    startupName: 'MediTrack',
    pitchSummary: 'Revolutionizing patient monitoring with wearable technology',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Health&background=random'
  }
]

const InvestorDashboard = () => {
  const { user } = useAuth()
  const [entrepreneurs, setEntrepreneurs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEntrepreneurs(mockEntrepreneurs)
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
        <p className="mt-1 text-sm text-gray-600">Discover promising entrepreneurs to invest in</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {entrepreneurs.map((entrepreneur) => (
          <Card key={entrepreneur.id} className="p-6">
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-full"
                src={entrepreneur.avatar}
                alt={entrepreneur.name}
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{entrepreneur.name}</h3>
                <p className="text-sm text-gray-500">{entrepreneur.startupName}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">{entrepreneur.pitchSummary}</p>
            <div className="mt-6 flex space-x-3">
              <Link
                to={`/profile/entrepreneur/${entrepreneur.id}`}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Link
                to={`/chat/${entrepreneur.id}`}
                className="flex-1"
              >
                <Button className="w-full">
                  Message
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default InvestorDashboard