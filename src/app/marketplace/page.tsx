'use client'
import React, { useState } from 'react'
import { ProductCard } from '@/components/marketplace/ProductCard'
import './marketplace.css'

const CATEGORIES = [
  { id: 1, slug: 'education-lms', name: 'Education & LMS', icon: '📚' },
  { id: 2, slug: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 3, slug: 'ecommerce', name: 'E-commerce', icon: '🛍️' },
  { id: 4, slug: 'real-estate', name: 'Real Estate', icon: '🏠' },
  { id: 5, slug: 'pos-system', name: 'POS System', icon: '🛒' },
]

const PRODUCTS = [
  { id: '1', name: 'Udemy Clone', price: 4999, originalPrice: 9999, rating: 4.5, reviews: 150, category: 'Education & LMS', icon: '📚' },
  { id: '2', name: 'Telemedicine App', price: 5999, originalPrice: 11999, rating: 4.7, reviews: 200, category: 'Healthcare', icon: '🏥' },
  { id: '3', name: 'Shopify Clone', price: 6999, originalPrice: 13999, rating: 4.6, reviews: 180, category: 'E-commerce', icon: '🛍️' },
  { id: '4', name: 'Real Estate Portal', price: 4499, originalPrice: 8999, rating: 4.4, reviews: 120, category: 'Real Estate', icon: '🏠' },
  { id: '5', name: 'POS Software', price: 3999, originalPrice: 7999, rating: 4.3, reviews: 100, category: 'POS System', icon: '🛒' },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="marketplace">
      {/* Header */}
      <div className="marketplace-header">
        <h1>🎯 SoftwareWala Marketplace</h1>
        <p>2000+ Lifetime Software Products</p>
      </div>

      {/* Search */}
      <div className="marketplace-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Categories */}
      <div className="marketplace-categories">
        <button
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="marketplace-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            productName={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
            reviews={product.reviews}
            category={product.category}
            categoryIcon={product.icon}
          />
        ))}
      </div>
    </div>
  )
}
