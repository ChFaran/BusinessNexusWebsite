import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'

const mockRequests = [
  {
    id: '1',
    investorId: '101',
    investorName: 'John Investor',
    investorAvatar: 'https://ui-avatars.com/api/?name=John+Investor&background=random',
    message: 'Interested in your AI solution for small businesses',
    status: 'pending',
    date: '2023-06-15'
  },
  {
    id: '2',
    investorId: '102',
    investorName: 'Alice Capital',
    investorAvatar: 'https://ui-avatars.com/api/?name=Alice+Capital&background=random',
    message: 'Would like to discuss potential investment in your sustainable packaging',
    status: 'accepted',
    date: '2023-06-10'
  },
  {
    id: '3',
    investorId: '103',
    investorName: 'David Ventures',
    investorAvatar: 'https://ui-avatars.com/api/?name=David+Ventures&background=random',
    message: 'Looking for health tech startups to add to our portfolio',
    status: 'declined',
    date: '2023-06-05'
  }
]

const statusColors = {
  pending: 'yellow',
  accepted: 'green',
  declined: 'red'
}

const EntrepreneurDashboard = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests)
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
        <p className="mt-1 text-sm text-gray-600">Manage your collaboration requests from investors</p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  className="h-12 w-12 rounded-full"
                  src={request.investorAvatar}
                  alt={request.investorName}
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{request.investorName}</h3>
                  <Badge color={statusColors[request.status]} className="mt-1 capitalize">
                    {request.status}
                  </Badge>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(request.date).toLocaleDateString()}
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">{request.message}</p>
            <div className="mt-6 flex space-x-3">
              <Link
                to={`/profile/investor/${request.investorId}`}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Link
                to={`/chat/${request.investorId}`}
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

export default EntrepreneurDashboard