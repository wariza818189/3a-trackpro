import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp, Receipt, TrendingDown,
  DollarSign, AlertTriangle, ChevronRight,
  Package, Wallet, BarChart3
} from 'lucide-react'
import api from '../services/api.js'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const quickActions = [
    { label: 'New Sale', Icon: Receipt, to: '/sales' },
    { label: 'Inventory', Icon: Package, to: '/inventory' },
    { label: 'Expenses', Icon: Wallet, to: '/expenses' },
    { label: 'Reports', Icon: BarChart3, to: '/reports' },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">
      Loading...
    </div>
  )

  const stats = [
    {
      label: "Today's Sales",
      value: `₱${Number(data?.today_sales || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      Icon: TrendingUp,
      color: 'text-white'
    },
    {
      label: 'Transactions',
      value: data?.today_transactions || 0,
      Icon: Receipt,
      color: 'text-white'
    },
    {
      label: 'Expenses',
      value: `₱${Number(data?.today_expenses || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      Icon: TrendingDown,
      color: 'text-red-400'
    },
    {
      label: 'Net Income',
      value: `₱${Number(data?.net_income || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
      Icon: DollarSign,
      color: (data?.net_income || 0) >= 0 ? 'text-green-400' : 'text-red-400'
    },
  ]

  return (
    <div className="p-4">
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-4">
        {new Date().toLocaleDateString('en-PH', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {stats.map(({ label, value, Icon, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800/60 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">{label}</span>
              <Icon size={13} className="text-gray-700" />
            </div>
            <div className={`text-lg font-medium tracking-tight ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {data?.low_stock_count > 0 && (
        <button
          onClick={() => navigate('/inventory')}
          className="w-full bg-amber-950/40 border border-amber-900/50 rounded-xl p-3 mb-4 flex items-center gap-3 text-left"
        >
          <AlertTriangle size={15} className="text-amber-500 flex-shrink-0" />
          <span className="text-amber-400/80 text-xs flex-1">
            {data.low_stock_count} item{data.low_stock_count > 1 ? 's' : ''} low on stock
          </span>
          <ChevronRight size={14} className="text-amber-700" />
        </button>
      )}

      {/* Quick actions */}
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2.5">Quick actions</div>
      <div className="grid grid-cols-2 gap-2.5">
        {quickActions.map(({ label, Icon, to }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="bg-gray-900 border border-gray-800/60 rounded-xl p-4 flex flex-col items-center gap-2.5 hover:border-indigo-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-950/50 border border-indigo-900/30 flex items-center justify-center">
              <Icon size={20} className="text-indigo-400" />
            </div>
            <span className="text-[11px] text-gray-500">{label}</span>
          </button>
        ))}
      </div>

      {/* Top products */}
      {data?.top_products?.length > 0 && (
        <div className="mt-5">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2.5">Top selling</div>
          <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
            {data.top_products.map((item, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-4 py-3 ${i !== data.top_products.length - 1 ? 'border-b border-gray-800/60' : ''
                  }`}
              >
                <div>
                  <div className="text-xs text-gray-300">
                    {item.variant?.product?.name || 'Unknown'}
                  </div>
                  <div className="text-[10px] text-gray-600 mt-0.5">
                    {[item.variant?.size, item.variant?.type_series].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <div className="text-xs font-medium text-indigo-400">{item.total_sold} sold</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!data?.today_transactions && (
        <div className="text-center py-10 text-gray-700 text-xs mt-4">
          No sales recorded today yet.
        </div>
      )}
    </div>
  )
}