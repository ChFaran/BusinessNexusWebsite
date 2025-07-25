import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import InputField from '../../components/common/InputField'
import Button from '../../components/common/Button'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'investor',
    ...(formData.role === 'investor' ? { investmentFocus: '' } : { startupName: '' })
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (formData.role === 'investor' && !formData.investmentFocus) {
      newErrors.investmentFocus = 'Investment focus is required'
    }
    if (formData.role === 'entrepreneur' && !formData.startupName) {
      newErrors.startupName = 'Startup name is required'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    try {
      // In a real app, you would call your API here
      // For demo purposes, we'll mock a successful registration
      const mockUser = {
        id: '123',
        name: formData.name,
        email: formData.email,
        role: formData.role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
        ...(formData.role === 'investor' ? { investmentFocus: formData.investmentFocus } : { startupName: formData.startupName })
      }
      login(mockUser)
    } catch (error) {
      setErrors({ form: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create a new account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <button 
            onClick={() => navigate('/login')}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            sign in to your existing account
          </button>
        </p>
      </div>

      {errors.form && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errors.form}</p>
            </div>
          </div>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="investor"
                  checked={formData.role === 'investor'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Investor</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="entrepreneur"
                  checked={formData.role === 'entrepreneur'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Entrepreneur</span>
              </label>
            </div>
          </div>

          <InputField
            label="Full Name"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <InputField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          {formData.role === 'investor' && (
            <InputField
              label="Investment Focus"
              id="investmentFocus"
              name="investmentFocus"
              type="text"
              value={formData.investmentFocus}
              onChange={handleChange}
              error={errors.investmentFocus}
              required
            />
          )}

          {formData.role === 'entrepreneur' && (
            <InputField
              label="Startup Name"
              id="startupName"
              name="startupName"
              type="text"
              value={formData.startupName}
              onChange={handleChange}
              error={errors.startupName}
              required
            />
          )}

          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Register