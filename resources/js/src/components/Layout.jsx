import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  Home, Receipt, Package, ArrowLeftRight,
  Wallet, BarChart3, Settings, LogOut, Building2
} from 'lucide-react'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/sales', label: 'Sale', icon: Receipt },
    { to: '/inventory', label: 'Stock', icon: Package },
    { to: '/stock-adjustment', label: 'Restock', icon: ArrowLeftRight },
    { to: '/expenses', label: 'Expense', icon: Wallet },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    ...(isAdmin ? [{ to: '/admin/products', label: 'Admin', icon: Settings }] : []),
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="bg-black border-b border-gray-900 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-indigo-700 rounded-lg flex items-center justify-center">
            <Building2 size={14} className="text-white" />
          </div>
          <span className="font-medium text-sm tracking-tight">3A TrackPro</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">{user?.name}</span>
            <span className={`text-xs font-medium ${isAdmin ? 'text-indigo-400' : 'text-gray-500'}`}>
              {isAdmin ? 'Administrator' : 'Staff'}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <LogOut size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 flex">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 py-3 flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive ? 'text-indigo-400' : 'text-gray-600'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-[10px]">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}