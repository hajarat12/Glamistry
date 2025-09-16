"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { ProductFilter } from "@/components/product-filter"
import { motionVariants } from "@/lib/motion-variants"

const products = [
  {
    id: 1,
    name: "Luxury Foundation Set",
    price: 89.99,
    category: "foundation",
    brand: "Glamistry Pro",
    image: "/luxury-foundation-makeup-set.jpg",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Professional Brush Collection",
    price: 149.99,
    category: "tools",
    brand: "Glamistry Pro",
    image: "/professional-makeup-brushes-set.jpg",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Eyeshadow Palette - Sunset",
    price: 65.99,
    category: "eyeshadow",
    brand: "Glamistry Pro",
    image: "/sunset-eyeshadow-palette.jpg",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Lipstick Collection",
    price: 45.99,
    category: "lipstick",
    brand: "Glamistry Pro",
    image: "/luxury-lipstick-collection.jpg",
    rating: 4.6,
    reviews: 203,
  },
]

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleFilterChange = (filters) => {
    let filtered = products

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    if (filters.priceRange) {
      filtered = filtered.filter((product) => {
        const price = product.price
        switch (filters.priceRange) {
          case "under-50":
            return price < 50
          case "50-100":
            return price >= 50 && price <= 100
          case "over-100":
            return price > 100
          default:
            return true
        }
      })
    }

    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "name":
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <motion.div initial="hidden" animate="visible" variants={motionVariants.staggerContainer} className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="display-heading">Beauty Shop</h1>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of professional makeup products and tools.
            </p>
          </div>

          <ProductFilter onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="body-large text-muted-foreground">No products found matching your filters.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
