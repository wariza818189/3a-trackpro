import './src/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './src/context/AuthContext.jsx'
import Login from './src/pages/Login.jsx'
import Dashboard from './src/pages/Dashboard.jsx'
import Inventory from './src/pages/Inventory.jsx'
import Sales from './src/pages/Sales.jsx'
import Expenses from './src/pages/Expenses.jsx'
import StockAdjustment from './src/pages/StockAdjustment.jsx'
import AdminProducts from './src/pages/AdminProducts.jsx'
import Reports from './src/pages/Reports.jsx'
import Layout from './src/components/Layout.jsx'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen text-gray-400">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return !user ? children : <Navigate to="/" />
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'admin') return <Navigate to="/" />
  return children
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="stock-adjustment" element={<StockAdjustment />} />
          <Route path="reports" element={<Reports />} />
          <Route path="admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
)