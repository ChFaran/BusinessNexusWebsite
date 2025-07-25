import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../layouts/DashboardLayout'
import AuthLayout from '../layouts/AuthLayout'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Login = lazy(() => import('../pages/auth/login'))
const Register = lazy(() => import('../pages/auth/Register'))
const InvestorDashboard = lazy(() => import('../pages/dashboard/InvestorDashboard'))
const EntrepreneurDashboard = lazy(() => import('../pages/dashboard/EntrepreneurDashboard'))
const Chat = lazy(() => import('../pages/chat/Chat'))

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/investor" element={
            <PrivateRoute allowedRoles={['investor']}>
              <InvestorDashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard/entrepreneur" element={
            <PrivateRoute allowedRoles={['entrepreneur']}>
              <EntrepreneurDashboard />
            </PrivateRoute>
          } />
          <Route path="/chat/:userId" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
        </Route>

        {/* Default Route */}
        <Route path="/" element={
          <PrivateRoute>
            {({ user }) => user.role === 'investor' ? (
              <Navigate to="/dashboard/investor" replace />
            ) : (
              <Navigate to="/dashboard/entrepreneur" replace />
            )}
          </PrivateRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}