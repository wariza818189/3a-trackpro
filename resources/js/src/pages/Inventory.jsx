import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal, Package } from 'lucide-react'
import api from '../services/api.js'

export default function Inventory() {
  const [categories, setCategories] = useState([])
  const [variants, setVariants] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/variants')
    ]).then(([catRes, varRes]) => {
      setCategories(catRes.data)
      setVariants(varRes.data)
      setFiltered(varRes.data)
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
        v.size?.toLowerCase().includes(search.toLowerCase()) ||
        v.type_series?.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFiltered(result)
  }, [activeCategory, search, variants])

  const stockBadge = (v) => {
    if (v.stock_quantity <= 0) return { label: 'Out of stock', cls: 'bg-red-950/50 text-red-400 border border-red-900/50' }
    if (v.is_low_stock) return { label: 'Low stock', cls: 'bg-amber-950/50 text-amber-400 border border-amber-900/50' }
    return { label: 'In stock', cls: 'bg-green-950/50 text-green-400 border border-green-900/50' }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">Loading...</div>
  )

  return (
    <div className="p-4">
      {/* Search */}
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
        <input
          type="text"
          placeholder="Search product, size, type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800/60 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
        />
      </div>

      {/* Category filter */}
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

      {/* Count */}
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-3">
        {filtered.length} variant{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-700">
          <Package size={32} className="mb-3 opacity-30" />
          <span className="text-xs">No products found</span>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
          {filtered.map((v, i) => {
            const badge = stockBadge(v)
            return (
              <div
                key={v.id}
                className={`flex justify-between items-center px-4 py-3 ${
                  i !== filtered.length - 1 ? 'border-b border-gray-800/40' : ''
                }`}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="text-xs font-medium text-gray-200 truncate">
                    {v.product?.name}
                  </div>
                  <div className="text-[10px] text-gray-600 mt-0.5">
                    {[v.size, v.type_series, v.thickness].filter(Boolean).join(' · ')}
                    {v.unit && <span className="ml-1 text-gray-700">· {v.unit}</span>}
                  </div>
                  <div className="text-[10px] text-indigo-400 mt-0.5">
                    {v.price
                      ? `₱${Number(v.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
                      : 'No price set'
                    }
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-medium text-gray-300 mb-1">
                    {v.stock_quantity} {v.unit || 'pcs'}
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}