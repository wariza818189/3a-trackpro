import { useEffect, useState } from 'react'
import { Search, Plus, Pencil, Trash2, X } from 'lucide-react'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminProducts() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [variants, setVariants] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  const [showProductModal, setShowProductModal] = useState(false)
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingVariant, setEditingVariant] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [productForm, setProductForm] = useState({ name: '', category_id: '' })
  const [variantForm, setVariantForm] = useState({
    size: '', type_series: '', thickness: '', unit: 'per piece',
    price: '', stock_quantity: 0, low_stock_threshold: 5
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const fetchAll = () => {
    Promise.all([
      api.get('/categories'),
      api.get('/products'),
      api.get('/variants')
    ]).then(([catRes, proRes, varRes]) => {
      setCategories(catRes.data)
      setProducts(proRes.data)
      setVariants(varRes.data)
    }).finally(() => setLoading(false))
  }

  useEffect(() => { fetchAll() }, [])

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

  const openAddProduct = () => {
    setEditingProduct(null)
    setProductForm({ name: '', category_id: categories[0]?.id || '' })
    setError('')
    setShowProductModal(true)
  }

  const openEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({ name: product.name, category_id: product.category_id })
    setError('')
    setShowProductModal(true)
  }

  const saveProduct = async () => {
    if (!productForm.name || !productForm.category_id) {
      setError('Please fill in all fields.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      let savedProduct
      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct.id}`, productForm)
        savedProduct = res.data
      } else {
        const res = await api.post('/products', productForm)
        savedProduct = res.data
      }
      setShowProductModal(false)
      setSuccess(editingProduct ? 'Product updated!' : 'Product added! Now add a variant.')
      setTimeout(() => setSuccess(''), 4000)
      fetchAll()
      if (!editingProduct) {
        setTimeout(() => {
          setSelectedProduct(savedProduct)
          setEditingVariant(null)
          setVariantForm({
            size: '', type_series: '', thickness: '',
            unit: 'per piece', price: '',
            stock_quantity: 0, low_stock_threshold: 5
          })
          setError('')
          setShowVariantModal(true)
        }, 500)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product.')
    } finally {
      setSubmitting(false)
    }
  }

  const deleteProduct = async (product) => {
    if (!confirm(`Delete "${product.name}"? This will also delete all its variants.`)) return
    await api.delete(`/products/${product.id}`)
    setSuccess('Product deleted!')
    setTimeout(() => setSuccess(''), 3000)
    fetchAll()
  }

  const openAddVariant = (product) => {
    setSelectedProduct(product)
    setEditingVariant(null)
    setVariantForm({
      size: '', type_series: '', thickness: '',
      unit: 'per piece', price: '',
      stock_quantity: 0, low_stock_threshold: 5
    })
    setError('')
    setShowVariantModal(true)
  }

  const openEditVariant = (variant) => {
    setSelectedProduct(variant.product)
    setEditingVariant(variant)
    setVariantForm({
      size: variant.size || '',
      type_series: variant.type_series || '',
      thickness: variant.thickness || '',
      unit: variant.unit || 'per piece',
      price: variant.price || '',
      stock_quantity: variant.stock_quantity || 0,
      low_stock_threshold: variant.low_stock_threshold || 5
    })
    setError('')
    setShowVariantModal(true)
  }

  const saveVariant = async () => {
    if (!variantForm.unit || !variantForm.price) {
      setError('Unit and Price are required.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      if (editingVariant) {
        await api.put(`/variants/${editingVariant.id}`, variantForm)
      } else {
        await api.post('/variants', { ...variantForm, product_id: selectedProduct.id })
      }
      setShowVariantModal(false)
      setSuccess(editingVariant ? 'Variant updated!' : 'Variant added!')
      setTimeout(() => setSuccess(''), 3000)
      fetchAll()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save variant.')
    } finally {
      setSubmitting(false)
    }
  }

  const deleteVariant = async (variant) => {
    if (!confirm('Delete this variant?')) return
    await api.delete(`/variants/${variant.id}`)
    setSuccess('Variant deleted!')
    setTimeout(() => setSuccess(''), 3000)
    fetchAll()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">Loading...</div>
  )

  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs font-medium text-gray-300 tracking-tight">Manage products</div>
        {isAdmin && (
          <button
            onClick={openAddProduct}
            className="flex items-center gap-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg transition-colors"
          >
            <Plus size={13} />
            Add product
          </button>
        )}
      </div>

      {/* Success */}
      {success && (
        <div className="bg-green-950/40 border border-green-900/50 rounded-xl px-4 py-3 mb-4 text-green-400 text-xs text-center">
          {success}
        </div>
      )}

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
            className={`whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full border transition-colors ${activeCategory === cat
                ? 'bg-indigo-700 border-indigo-700 text-white'
                : 'bg-gray-900 border-gray-800/60 text-gray-600'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Variant list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-700 text-xs">No products found.</div>
      ) : (
        <div className="bg-gray-900 border border-gray-800/60 rounded-xl overflow-hidden">
          {filtered.map((v, i) => (
            <div
              key={v.id}
              className={`px-4 py-3 ${i !== filtered.length - 1 ? 'border-b border-gray-800/40' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="text-xs font-medium text-gray-200 truncate">{v.product?.name}</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">
                    {[v.size, v.type_series, v.thickness].filter(Boolean).join(' · ')}
                    {' '}· {v.unit}
                  </div>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-[10px] text-indigo-400">
                      ₱{Number(v.price || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-gray-600">
                      Stock: {v.stock_quantity}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openEditVariant(v)}
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => deleteVariant(v)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>

              {isAdmin && (i === filtered.length - 1 || filtered[i + 1]?.product?.id !== v.product?.id) && (
                <button
                  onClick={() => openAddVariant(v.product)}
                  className="mt-2 flex items-center gap-1 text-[10px] text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  <Plus size={11} />
                  Add variant to {v.product?.name}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-t-2xl w-full max-w-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-white">
                {editingProduct ? 'Edit product' : 'Add new product'}
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={15} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">
                  Product name
                </label>
                <input
                  type="text"
                  placeholder="e.g. G.I. Pipe S40"
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">
                  Category
                </label>
                <select
                  value={productForm.category_id}
                  onChange={e => setProductForm({ ...productForm, category_id: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className="mt-3 text-red-400 text-[10px] text-center">{error}</div>}

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowProductModal(false)}
                className="flex-1 bg-gray-800 text-gray-500 py-3 rounded-xl text-xs hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                disabled={submitting}
                className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-xl text-xs font-medium disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Variant Modal */}
      {showVariantModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-t-2xl w-full max-w-lg p-5 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm font-medium text-white">
                {editingVariant ? 'Edit variant' : 'Add variant'}
              </div>
              <button
                onClick={() => setShowVariantModal(false)}
                className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={15} className="text-gray-600" />
              </button>
            </div>
            <div className="text-[10px] text-gray-600 mb-4">{selectedProduct?.name}</div>

            <div className="space-y-3">
              {[
                { label: 'Size', key: 'size', placeholder: 'e.g. 1/2, 16mm, 4x8' },
                { label: 'Type / Series', key: 'type_series', placeholder: 'e.g. S40, S20, Series 1000' },
                { label: 'Thickness', key: 'thickness', placeholder: 'e.g. 1.2mm, 2mm' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={variantForm[key]}
                    onChange={e => setVariantForm({ ...variantForm, [key]: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Unit</label>
                <select
                  value={variantForm.unit}
                  onChange={e => setVariantForm({ ...variantForm, unit: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 transition-colors"
                >
                  {['per piece', 'per kilo', 'per meter', 'per roll', 'per sheet', 'per box'].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Price (₱)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={variantForm.price}
                  onChange={e => setVariantForm({ ...variantForm, price: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-700 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Initial stock</label>
                <input
                  type="number"
                  min="0"
                  value={variantForm.stock_quantity}
                  onChange={e => setVariantForm({ ...variantForm, stock_quantity: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1.5 block">Low stock threshold</label>
                <input
                  type="number"
                  min="0"
                  value={variantForm.low_stock_threshold}
                  onChange={e => setVariantForm({ ...variantForm, low_stock_threshold: Number(e.target.value) })}
                  className="w-full bg-gray-800 border border-gray-700/60 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-700 transition-colors"
                />
              </div>
            </div>

            {error && <div className="mt-3 text-red-400 text-[10px] text-center">{error}</div>}

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowVariantModal(false)}
                className="flex-1 bg-gray-800 text-gray-500 py-3 rounded-xl text-xs hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveVariant}
                disabled={submitting}
                className="flex-1 bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-xl text-xs font-medium disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}