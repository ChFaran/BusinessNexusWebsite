import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

const mockEntrepreneur = {
  id: '1',
  name: 'Sarah Tech',
  email: 'sarah@techinnovators.com',
  avatar: 'https://ui-avatars.com/api/?name=Sarah+Tech&background=random',
  bio: 'Tech entrepreneur with a passion for building AI solutions that empower small businesses.',
  startupName: 'Tech Innovators',
  startupDescription: 'We build AI-powered tools that help small businesses automate their operations and improve customer engagement.',
  fundingNeed: '$500,000',
  pitchDeck: 'tech_innovators_pitch.pdf'
}

const EntrepreneurProfile = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [entrepreneur, setEntrepreneur] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEntrepreneur(mockEntrepreneur)
      setLoading(false)
    }, 800)
  }, [id])

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
        <h1 className="text-2xl font-bold text-gray-900">Entrepreneur Profile</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center space-x-6">
              <img
                className="h-20 w-20 rounded-full"
                src={entrepreneur.avatar}
                alt={entrepreneur.name}
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{entrepreneur.name}</h2>
                <p className="text-sm text-gray-500">{entrepreneur.email}</p>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Startup: <span className="font-normal">{entrepreneur.startupName}</span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Bio</h3>
              <p className="mt-2 text-sm text-gray-600">{entrepreneur.bio}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Startup Description</h3>
              <p className="mt-2 text-sm text-gray-600">{entrepreneur.startupDescription}</p>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Funding Information</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Funding Need</p>
                <p className="mt-1 text-sm text-gray-600">{entrepreneur.fundingNeed}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pitch Deck</p>
                <p className="mt-1 text-sm text-gray-600">{entrepreneur.pitchDeck}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Download
                </Button>
              </div>
            </div>

            {user.role === 'investor' && (
              <div className="mt-6 space-y-3">
                <Link to={`/chat/${entrepreneur.id}`}>
                  <Button className="w-full">
                    Send Message
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Send Collaboration Request
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EntrepreneurProfile