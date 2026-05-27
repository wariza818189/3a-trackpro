import { useEffect, useState } from 'react'
import { Search, Plus, Minus, ShoppingCart, ChevronRight, X } from 'lucide-react'
import api from '../services/api.js'

export default function Sales() {
  const [categories, setCategories] = useState([])
  const [variants, setVariants] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [view, setView] = useState('products')

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/variants')
    ]).then(([catRes, varRes]) => {
      setCategories(catRes.data)
      const available = varRes.data.filter(v => v.stock_quantity > 0)
      setVariants(available)
      setFiltered(available)
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

  const addToCart = (variant) => {
    setCart(prev => {
      const existing = prev.find(i => i.variant_id === variant.id)
      if (existing) {
        if (existing.qty >= variant.stock_quantity) return prev
        return prev.map(i => i.variant_id === variant.id
          ? { ...i, qty: i.qty + 1, subtotal: (i.qty + 1) * variant.price }
          : i
        )
      }
      return [...prev, {
        variant_id: variant.id,
        variant,
        qty: 1,
        subtotal: Number(variant.price)
      }]
    })
  }

  const updateQty = (variant_id, delta) => {
    setCart(prev => prev
      .map(i => i.variant_id === variant_id
        ? { ...i, qty: i.qty + delta, subtotal: (i.qty + delta) * i.variant.price }
        : i
      )
      .filter(i => i.qty > 0)
    )
  }

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0)

  const confirmSale = async () => {
    if (cart.length === 0) return
    setConfirming(true)
    setError('')
    try {
      await api.post('/sales', {
        items: cart.map(i => ({ variant_id: i.variant_id, qty_sold: i.qty }))
      })
      setCart([])
      setSuccess(true)
      setView('products')
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Sale failed. Try again.')
    } finally {
      setConfirming(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">Loading...</div>
  )

  return (
    <div className="p-4">
      {success && (
        <div className="bg-green-950/40 border border-green-900/50 rounded-xl px-4 py-3 mb-4 text-green-400 text-xs text-center">
          Sale recorded successfully
        </div>
      )}

      {/* Toggle */}
      <div className="flex gap-2 mb-4 bg-gray-900 border border-gray-800/60 rounded-xl p-1">
        <button
          onClick={() => setView('products')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
            view === 'products' ? 'bg-indigo-700 text-white' : 'text-gray-500'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setView('cart')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2 ${
            view === 'cart' ? 'bg-indigo-700 text-white' : 'text-gray-500'
          }`}
        >
          <ShoppingCart size={13} />
          Cart
          {cart.length > 0 && (
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
              view === 'cart' ? 'bg-white/20 text-white' : 'bg-indigo-700 text-white'
            }`}>
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Products view */}
      {view === 'products' && (
        <>
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search product..."
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
            <div className="text-center py-12 text-gray-700 text-xs">No products available.</div>
          ) : (
            <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
              {filtered.map((v, i) => (
                <div
                  key={v.id}
                  className={`flex justify-between items-center px-4 py-3 ${
                    i !== filtered.length - 1 ? 'border-b border-gray-800/40' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="text-xs font-medium text-gray-200 truncate">{v.product?.name}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      {[v.size, v.type_series, v.thickness].filter(Boolean).join(' · ')}
                    </div>
                    <div className="text-[10px] text-indigo-400 mt-0.5">
                      ₱{Number(v.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      <span className="text-gray-700 ml-1">· {v.stock_quantity} left</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(v)}
                    className="flex items-center gap-1 bg-gray-800 hover:bg-indigo-700 border border-gray-700 hover:border-indigo-600 text-gray-400 hover:text-white text-[10px] px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus size={11} />
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Cart view */}
      {view === 'cart' && (
        <>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-700">
              <ShoppingCart size={32} className="mb-3 opacity-30" />
              <span className="text-xs">Cart is empty</span>
              <button
                onClick={() => setView('products')}
                className="mt-3 text-indigo-400 text-xs flex items-center gap-1"
              >
                Browse products <ChevronRight size={12} />
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden mb-3">
                {cart.map((item, i) => (
                  <div
                    key={item.variant_id}
                    className={`px-4 py-3 ${i !== cart.length - 1 ? 'border-b border-gray-800/40' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0 mr-3">
                        <div className="text-xs font-medium text-gray-200 truncate">
                          {item.variant.product?.name}
                        </div>
                        <div className="text-[10px] text-gray-600 mt-0.5">
                          {[item.variant.size, item.variant.type_series].filter(Boolean).join(' · ')}
                        </div>
                      </div>
                      <button
                        onClick={() => updateQty(item.variant_id, -item.qty)}
                        className="text-gray-700 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-600">
                        ₱{Number(item.variant.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })} each
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.variant_id, -1)}
                          className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-medium text-white min-w-[20px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.variant_id, 1)}
                          className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                        <span className="text-xs font-medium text-gray-300 ml-1 min-w-[60px] text-right">
                          ₱{item.subtotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 border border-gray-800/60 rounded-xl px-4 py-3 flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500">Total amount</span>
                <span className="text-lg font-medium text-indigo-400 tracking-tight">
                  ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {error && (
                <div className="bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3 mb-3 text-red-400 text-xs text-center">
                  {error}
                </div>
              )}

              <button
                onClick={confirmSale}
                disabled={confirming}
                className="w-full bg-indigo-700 hover:bg-indigo-600 text-white font-medium py-3 rounded-xl text-sm transition-colors disabled:opacity-50"
              >
                {confirming ? 'Processing...' : `Confirm sale — ₱${total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`}
              </button>

              <button
                onClick={() => setCart([])}
                className="w-full mt-2 bg-transparent border border-gray-800 text-gray-600 font-medium py-2.5 rounded-xl text-xs hover:text-gray-400 transition-colors"
              >
                Clear cart
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}