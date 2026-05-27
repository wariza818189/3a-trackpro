import { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function Reports() {
  const [todayData, setTodayData] = useState(null)
  const [monthlyData, setMonthlyData] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('today')
  const [expandedTx, setExpandedTx] = useState(null)

  useEffect(() => {
    Promise.all([
      api.get('/sales/today'),
      api.get('/sales/monthly'),
      api.get('/sales'),
    ]).then(([todayRes, monthlyRes, txRes]) => {
      setTodayData(todayRes.data)
      setMonthlyData(monthlyRes.data)
      setTransactions(txRes.data)
    }).finally(() => setLoading(false))
  }, [])

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading...</div>
  )

  return (
    <div className="p-4">
      <div className="text-sm font-semibold text-white mb-4">Reports</div>

      {/* Tab Toggle */}
      <div className="flex gap-2 mb-4">
        {['today', 'monthly', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-900 text-gray-400 border border-gray-800'
            }`}
          >
            {tab === 'today' ? "Today" : tab === 'monthly' ? 'This Month' : 'History'}
          </button>
        ))}
      </div>

      {/* TODAY */}
      {activeTab === 'today' && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Total Sales</div>
              <div className="text-xl font-semibold text-white">
                ₱{Number(todayData?.total || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Transactions</div>
              <div className="text-xl font-semibold text-white">{todayData?.count || 0}</div>
            </div>
          </div>

          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Today's Transactions</div>

          {todayData?.transactions?.length === 0 ? (
            <div className="text-center py-12 text-gray-600 text-sm">No sales today yet.</div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              {todayData?.transactions?.map((tx, i) => (
                <div
                  key={tx.id}
                  className={`${i !== todayData.transactions.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                    onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                  >
                    <div>
                      <div className="text-sm font-medium text-white">Transaction #{tx.id}</div>
                      <div className="text-xs text-gray-500">{formatDate(tx.created_at)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-indigo-400">
                        ₱{Number(tx.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-600">{expandedTx === tx.id ? '▲' : '▼'}</div>
                    </div>
                  </div>
                  {expandedTx === tx.id && tx.items && (
                    <div className="px-4 pb-3 bg-gray-950">
                      {tx.items.map((item, j) => (
                        <div key={j} className="flex justify-between py-1.5 border-b border-gray-800 last:border-0">
                          <div>
                            <div className="text-xs text-gray-300">{item.variant?.product?.name}</div>
                            <div className="text-xs text-gray-600">
                              {[item.variant?.size, item.variant?.type_series].filter(Boolean).join(' · ')}
                              {' '}× {item.qty_sold}
                            </div>
                          </div>
                          <div className="text-xs text-gray-300">
                            ₱{Number(item.subtotal).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* MONTHLY */}
      {activeTab === 'monthly' && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Monthly Sales</div>
              <div className="text-xl font-semibold text-white">
                ₱{Number(monthlyData?.total || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Transactions</div>
              <div className="text-xl font-semibold text-white">{monthlyData?.count || 0}</div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-xs text-gray-500 mb-1">
              {new Date().toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
            </div>
            <div className="text-2xl font-bold text-indigo-400">
              ₱{Number(monthlyData?.total || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-gray-500 mt-1">Total Sales This Month</div>
          </div>
        </>
      )}

      {/* HISTORY */}
      {activeTab === 'history' && (
        <>
          <div className="text-xs text-gray-500 mb-3">All Transactions ({transactions.length})</div>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-600 text-sm">No transactions yet.</div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              {transactions.map((tx, i) => (
                <div
                  key={tx.id}
                  className={`${i !== transactions.length - 1 ? 'border-b border-gray-800' : ''}`}
                >
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                    onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                  >
                    <div>
                      <div className="text-sm font-medium text-white">Transaction #{tx.id}</div>
                      <div className="text-xs text-gray-500">{formatDate(tx.created_at)}</div>
                      {tx.notes && <div className="text-xs text-gray-600 italic">{tx.notes}</div>}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-indigo-400">
                        ₱{Number(tx.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-600">{expandedTx === tx.id ? '▲' : '▼'}</div>
                    </div>
                  </div>
                  {expandedTx === tx.id && tx.items && (
                    <div className="px-4 pb-3 bg-gray-950">
                      {tx.items.map((item, j) => (
                        <div key={j} className="flex justify-between py-1.5 border-b border-gray-800 last:border-0">
                          <div>
                            <div className="text-xs text-gray-300">{item.variant?.product?.name}</div>
                            <div className="text-xs text-gray-600">
                              {[item.variant?.size, item.variant?.type_series].filter(Boolean).join(' · ')}
                              {' '}× {item.qty_sold}
                            </div>
                          </div>
                          <div className="text-xs text-gray-300">
                            ₱{Number(item.subtotal).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}