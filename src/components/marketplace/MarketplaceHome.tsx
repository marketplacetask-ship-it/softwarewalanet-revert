'use client'
import React, { useState } from 'react'
import { MARKETPLACE_CATEGORIES } from '@/data/marketplace/categories'
import { generateProducts } from '@/data/marketplace/products'

export default function MarketplaceHome() {
  const [selected, setSelected] = useState(MARKETPLACE_CATEGORIES[0])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const prods = generateProducts(selected.slug, selected.name, selected.id)
      setProducts(prods)
      setLoading(false)
    }, 300)
  }, [selected])

  return (
    <div style={{ padding: '40px', backgroundColor: '#F5F7FA', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0052CC 0%, #1E90FF 100%)',
        color: 'white',
        padding: '60px',
        borderRadius: '20px',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '12px' }}>
          2000+ Premium Software Solutions
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
          Lifetime License • Lifetime Updates • No Expiry
        </p>
        <button style={{
          background: 'white',
          color: '#0052CC',
          padding: '14px 40px',
          border: 'none',
          borderRadius: '50px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          ⭐ EXPLORE NOW
        </button>
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#1A1A2E' }}>
          Browse by Category
        </h2>
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '12px 0',
          scrollBehavior: 'smooth'
        }}>
          {MARKETPLACE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelected(cat)}
              style={{
                background: selected.id === cat.id
                  ? `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}dd 100%)`
                  : 'white',
                color: selected.id === cat.id ? 'white' : '#1A1A2E',
                padding: '16px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                minWidth: '130px',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'all 0.3s ease',
                boxShadow: selected.id === cat.id
                  ? '0 8px 24px rgba(0, 82, 204, 0.3)'
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{cat.icon}</div>
              <div>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1A1A2E' }}>
          {selected.name} - {products.length} Products
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {products.map((product) => (
              <div
                key={product.slug}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 82, 204, 0.12)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)'
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 82, 204, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 82, 204, 0.12)'
                }}
              >
                {/* Image */}
                <div style={{
                  background: `linear-gradient(135deg, ${selected.color} 0%, ${selected.color}dd 100%)`,
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  position: 'relative'
                }}>
                  📦
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, #DC143C 0%, #FF4444 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {product.discount}% OFF
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#0052CC', margin: '0 0 8px 0' }}>
                    {product.categoryName}
                  </p>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0', color: '#1A1A2E' }}>
                    {product.productName}
                  </h3>

                  {/* Rating */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', fontSize: '12px' }}>
                    <span style={{ color: '#FFC107' }}>★★★★★</span>
                    <span style={{ color: '#666' }}>({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #0052CC 0%, #DC143C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '14px', color: '#999', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: 'linear-gradient(135deg, #0052CC 0%, #1E90FF 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      ▶ DEMO
                    </button>
                    <button style={{
                      flex: 1,
                      padding: '10px',
                      background: 'linear-gradient(135deg, #DC143C 0%, #FF4444 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      🛒 BUY
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
