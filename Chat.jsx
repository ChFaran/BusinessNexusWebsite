import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import InputField from '../../components/common/InputField'

// Mock user data
const mockUsers = {
  '1': {
    id: '1',
    name: 'Sarah Tech',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Tech&background=random',
    role: 'entrepreneur'
  },
  '101': {
    id: '101',
    name: 'John Investor',
    avatar: 'https://ui-avatars.com/api/?name=John+Investor&background=random',
    role: 'investor'
  },
  '2': {
    id: '2',
    name: 'Mike Green',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Green&background=random',
    role: 'entrepreneur'
  },
  '102': {
    id: '102',
    name: 'Alice Capital',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Capital&background=random',
    role: 'investor'
  }
}

// Mock chat history
const mockChats = {
  '1_101': [
    {
      id: '1',
      senderId: '1',
      message: 'Hi John, thanks for your interest in our startup!',
      timestamp: '2023-06-15T10:30:00'
    },
    {
      id: '2',
      senderId: '101',
      message: 'Hello Sarah, your AI solution looks promising. Can we schedule a call?',
      timestamp: '2023-06-15T10:32:00'
    },
    {
      id: '3',
      senderId: '1',
      message: 'Absolutely! How about tomorrow at 2 PM?',
      timestamp: '2023-06-15T10:33:00'
    }
  ],
  '1_102': [
    {
      id: '1',
      senderId: '102',
      message: 'Hi Sarah, we came across your profile and would love to learn more about your startup.',
      timestamp: '2023-06-10T14:15:00'
    },
    {
      id: '2',
      senderId: '1',
      message: 'Hello Alice, thanks for reaching out! What would you like to know?',
      timestamp: '2023-06-10T14:20:00'
    }
  ]
}

const Chat = () => {
  const { userId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  const otherUser = mockUsers[userId]
  const chatKey = user.id < userId ? `${user.id}_${userId}` : `${userId}_${user.id}`

  useEffect(() => {
    if (!otherUser) {
      navigate('/')
      return
    }

    // Simulate API call to fetch chat history
    setTimeout(() => {
      setMessages(mockChats[chatKey] || [])
      setLoading(false)
    }, 800)
  }, [userId, chatKey, navigate, otherUser])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      message: message.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // In a real app, you would send the message to your backend here
  }

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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={`/profile/${otherUser.role}/${otherUser.id}`} className="flex items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full"
                src={otherUser.avatar}
                alt={otherUser.name}
              />
              <h1 className="text-xl font-bold text-gray-900">{otherUser.name}</h1>
            </Link>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Online
            </span>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No messages yet</p>
              <p className="mt-1 text-sm">Start the conversation with {otherUser.name}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.senderId === user.id ? 'bg-primary-100 text-primary-900' : 'bg-gray-100 text-gray-900'}`}
                >
                  <p>{msg.message}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <InputField
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">
            Send
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Chat