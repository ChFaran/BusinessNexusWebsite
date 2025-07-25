import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

const mockInvestor = {
  id: '101',
  name: 'John Investor',
  email: 'john@investor.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Investor&background=random',
  bio: 'Seasoned investor with 10+ years of experience in tech startups. Focused on AI, SaaS, and fintech.',
  investmentFocus: 'AI, SaaS, Fintech',
  portfolioCompanies: [
    'Tech Innovators Inc.',
    'Cloud Solutions Ltd.',
    'PayFast Financial'
  ]
}

const InvestorProfile = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [investor, setInvestor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInvestor(mockInvestor)
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
        <h1 className="text-2xl font-bold text-gray-900">Investor Profile</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center space-x-6">
              <img
                className="h-20 w-20 rounded-full"
                src={investor.avatar}
                alt={investor.name}
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{investor.name}</h2>
                <p className="text-sm text-gray-500">{investor.email}</p>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  Investment Focus: <span className="font-normal">{investor.investmentFocus}</span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Bio</h3>
              <p className="mt-2 text-sm text-gray-600">{investor.bio}</p>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Portfolio Companies</h3>
            <ul className="mt-4 space-y-3">
              {investor.portfolioCompanies.map((company, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {company}
                </li>
              ))}
            </ul>

            {user.role === 'entrepreneur' && (
              <div className="mt-6">
                <Link to={`/chat/${investor.id}`}>
                  <Button className="w-full">
                    Send Message
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InvestorProfile