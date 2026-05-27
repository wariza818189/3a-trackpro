import { useEffect, useState } from 'react'
import { Search, Plus, Minus, RefreshCw, X } from 'lucide-react'
import api from '../services/api.js'

export default function StockAdjustment() {
  const [variants, setVariants] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ type: 'restock', quantity: '', reason: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.get('/variants'), api.get('/categories')])
      .then(([varRes, catRes]) => {
        setVariants(varRes.data)
        setFiltered(varRes.data)
        setCategories(catRes.data)
      }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = variants
    if (activeCategory !== 'All') {
      result = result.filter(v => v.product?.category?.name === activeCategory)
    }
    if (search.trim()) {
      result = result.filter(v =>
        v.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
        v.size?.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFiltered(result)
  }, [activeCategory, search, variants])

  const handleSubmit = async () => {
    if (!form.quantity || form.quantity <= 0) {
      setError('Please enter a valid quantity.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await api.post('/adjustments', {
        variant_id: selected.id,
        type: form.type,
        quantity: Number(form.quantity),
        reason: form.reason
      })
      const res = await api.get('/variants')
      setVariants(res.data)
      setSelected(null)
      setForm({ type: 'restock', quantity: '', reason: '' })
      setSuccess(`Stock ${form.type} recorded successfully`)
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to adjust stock.')
    } finally {
      setSubmitting(false)
    }
  }

  const typeConfig = {
    restock: { label: 'Restock', icon: Plus, desc: 'Adds quantity to current stock', cls: 'border-green-800 text-green-400 bg-green-950/30' },
    damage: { label: 'Damage', icon: Minus, desc: 'Subtracts quantity from current stock', cls: 'border-red-800 text-red-400 bg-red-950/30' },
    correction: { label: 'Correction', icon: RefreshCw, desc: 'Sets stock to exact quantity entered', cls: 'border-blue-800 text-blue-400 bg-blue-950/30' },
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">Loading...</div>
  )

  return (
    <div className="p-4">
      <div className="text-xs font-medium text-gray-300 mb-4 tracking-tight">Stock adjustment</div>

      {success && (
        <div className="bg-green-950/40 border border-green-900/50 rounded-xl px-4 py-3 mb-4 text-green-400 text-xs text-center">
          {success}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-t-2xl w-full max-w-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm font-medium text-white">{selected.product?.name}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  {[selected.size, selected.type_series, selected.thickness].filter(Boolean).join(' · ')}
                  {' '}· Current stock:{' '}
                  <span className="text-gray-400 font-medium">{selected.stock_quantity}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={15} className="text-gray-600" />
              </button>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(typeConfig).map(([key, cfg]) => {
                const Icon = cfg.icon
                return (
                  <button
                    key={key}
                    onClick={() => setForm({ ...form, type: key })}
                    className={`py-2.5 rounded-xl text-[10px] font-medium border capitalize transition-colors flex flex-col items-center gap-1 ${
                      form.type === key ? cfg.cls : 'bg-gray-800/50 border-gray-700/60 text-gray-500'
                    }`}
                  >
                    <Icon size={14} />
                    {cfg.label}
                  </button>
                )
              })}
            </div>

            <div className={`text-[10px] rounded-lg px-3 py-2 mb-4 ${typeConfig[form.type].cls}`}>
              {typeConfig[form.type].desc}
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">
                  {form.type === 'correction' ? 'New stock quantity' : 'Quantity'}
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">
                  Reason (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. New delivery from supplier"
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
                />
              </div>
            </div>

            {error && <div className="text-red-400 text-[10px] text-center mb-3">{error}</div>}

            <div className="flex gap-2">
              <button
                onClick={() => { setSelected(null); setError('') }}
                className="flex-1 bg-gray-800 text-gray-500 py-3 rounded-xl text-xs hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-xl text-xs font-medium disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          placeholder="Search product, size..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800/60 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {['All', ...categories.map(c => c.name)].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat
                ? 'bg-indigo-700 border-indigo-700 text-white'
                : 'bg-gray-900 border-gray-800/60 text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-700 text-xs">No products found.</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
          {filtered.map((v, i) => (
            <div
              key={v.id}
              className={`flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-800/30 transition-colors ${
                i !== filtered.length - 1 ? 'border-b border-gray-800/40' : ''
              }`}
              onClick={() => {
                setSelected(v)
                setForm({ type: 'restock', quantity: '', reason: '' })
                setError('')
              }}
            >
              <div className="flex-1 min-w-0 mr-3">
                <div className="text-xs font-medium text-gray-200 truncate">{v.product?.name}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  {[v.size, v.type_series, v.thickness].filter(Boolean).join(' · ')}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium text-gray-300">{v.stock_quantity} {v.unit || 'pcs'}</div>
                <div className="text-[10px] text-indigo-500 mt-0.5">Tap to adjust</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}