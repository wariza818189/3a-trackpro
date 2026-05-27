import { useEffect, useState } from 'react'
import { Plus, Trash2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import api from '../services/api.js'

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    description: '',
    category: 'restock',
    amount: '',
    expense_date: new Date().toISOString().split('T')[0]
  })

  const fetchData = () => {
    Promise.all([
      api.get('/expenses'),
      api.get('/expenses/summary')
    ]).then(([expRes, sumRes]) => {
      setExpenses(expRes.data)
      setSummary(sumRes.data)
    }).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async () => {
    if (!form.description || !form.amount) {
      setError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await api.post('/expenses', form)
      setForm({
        description: '',
        category: 'restock',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0]
      })
      setShowForm(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log expense.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense?')) return
    await api.delete(`/expenses/${id}`)
    fetchData()
  }

  const categoryStyle = (cat) => {
    if (cat === 'restock') return 'bg-blue-950/40 text-blue-400 border border-blue-900/50'
    if (cat === 'overhead') return 'bg-purple-950/40 text-purple-400 border border-purple-900/50'
    return 'bg-gray-800/60 text-gray-500 border border-gray-700/50'
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">Loading...</div>
  )

  return (
    <div className="p-4">
      {success && (
        <div className="bg-green-950/40 border border-green-900/50 rounded-xl px-4 py-3 mb-4 text-green-400 text-xs text-center">
          Expense logged successfully
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">Income</span>
            <TrendingUp size={13} className="text-gray-700" />
          </div>
          <div className="text-base font-medium text-green-400 tracking-tight">
            ₱{Number(summary?.total_income || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">Expenses</span>
            <TrendingDown size={13} className="text-gray-700" />
          </div>
          <div className="text-base font-medium text-red-400 tracking-tight">
            ₱{Number(summary?.total_expenses || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Net profit */}
      <div className={`rounded-xl px-4 py-3 mb-4 flex justify-between items-center ${
        (summary?.net_profit || 0) >= 0
          ? 'bg-green-950/30 border border-green-900/40'
          : 'bg-red-950/30 border border-red-900/40'
      }`}>
        <div className="flex items-center gap-2">
          <DollarSign size={14} className={
            (summary?.net_profit || 0) >= 0 ? 'text-green-500' : 'text-red-500'
          } />
          <span className="text-xs text-gray-400">Net profit this month</span>
        </div>
        <span className={`text-sm font-medium tracking-tight ${
          (summary?.net_profit || 0) >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          ₱{Number(summary?.net_profit || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl text-sm mb-4 transition-colors"
        >
          <Plus size={16} />
          Log new expense
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl p-4 mb-4">
          <div className="text-xs font-medium text-gray-300 mb-4">New expense</div>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Description</label>
              <input
                type="text"
                placeholder="e.g. Restock G.I. Pipes"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-700 transition-colors"
              >
                <option value="restock">Restock</option>
                <option value="overhead">Overhead</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Amount (₱)</label>
              <input
                type="number"
                placeholder="0.00"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Date</label>
              <input
                type="date"
                value={form.expense_date}
                onChange={e => setForm({ ...form, expense_date: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-700 transition-colors"
              />
            </div>
          </div>
          {error && <div className="mt-3 text-red-400 text-[10px] text-center">{error}</div>}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => { setShowForm(false); setError('') }}
              className="flex-1 bg-gray-800 text-gray-500 py-2.5 rounded-xl text-xs hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-medium disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Saving...' : 'Save expense'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2.5">Recent expenses</div>

      {expenses.length === 0 ? (
        <div className="text-center py-12 text-gray-700 text-xs">No expenses logged yet.</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
          {expenses.map((exp, i) => (
            <div
              key={exp.id}
              className={`flex justify-between items-center px-4 py-3 ${
                i !== expenses.length - 1 ? 'border-b border-gray-800/40' : ''
              }`}
            >
              <div className="flex-1 min-w-0 mr-3">
                <div className="text-xs font-medium text-gray-200 truncate">{exp.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${categoryStyle(exp.category)}`}>
                    {exp.category}
                  </span>
                  <span className="text-[10px] text-gray-700">{exp.expense_date}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0 flex items-center gap-2">
                <div>
                  <div className="text-xs font-medium text-red-400">
                    −₱{Number(exp.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-700 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}