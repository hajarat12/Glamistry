"use client"

import React from "react"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, Star, Plus, Search, Grid, List, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInAnimation, staggerChildrenTransition } from "@/lib/animations"
import foundationImage from "@/assets/product-foundation.jpg"
import brushesImage from "@/assets/product-brushes.jpg"
import eyeshadowImage from "@/assets/product-eyeshadow.jpg"
import productsImage from "@/assets/products-hero.jpg"

const products = [
  {
    id: 1,
    name: "Radiant Glow Foundation",
    price: 45,
    originalPrice: null,
    rating: 4.9,
    reviews: 234,
    image: foundationImage,
    category: "Foundation",
    badge: "Bestseller",
    badgeColor: "bg-mustard",
    description: "Full coverage foundation with a natural radiant finish",
    inStock: true,
  },
  {
    id: 2,
    name: "Perfect Match Concealer",
    price: 28,
    originalPrice: 35,
    rating: 4.8,
    reviews: 156,
    image: foundationImage,
    category: "Concealer",
    badge: "Sale",
    badgeColor: "bg-red-500",
    description: "High coverage concealer that blends seamlessly",
    inStock: true,
  },
  {
    id: 3,
    name: "Professional Brush Set",
    price: 85,
    originalPrice: null,
    rating: 5.0,
    reviews: 89,
    image: brushesImage,
    category: "Tools",
    badge: "New",
    badgeColor: "bg-forest-green",
    description: "12-piece professional makeup brush collection",
    inStock: true,
  },
  {
    id: 4,
    name: "Eyeshadow Palette Pro",
    price: 52,
    originalPrice: null,
    rating: 4.9,
    reviews: 178,
    image: eyeshadowImage,
    category: "Eyes",
    badge: null,
    badgeColor: "",
    description: "24 highly pigmented eyeshadow shades",
    inStock: true,
  },
  {
    id: 5,
    name: "Velvet Matte Lipstick Set",
    price: 65,
    originalPrice: 75,
    rating: 4.7,
    reviews: 203,
    image: productsImage,
    category: "Lips",
    badge: "Popular",
    badgeColor: "bg-mint",
    description: "6 long-lasting matte lipstick shades",
    inStock: true,
  },
  {
    id: 6,
    name: "Highlighting Palette",
    price: 38,
    originalPrice: null,
    rating: 4.8,
    reviews: 142,
    image: productsImage,
    category: "Face",
    badge: null,
    badgeColor: "",
    description: "4 luminous highlighting shades",
    inStock: false,
  },
  {
    id: 7,
    name: "Waterproof Mascara",
    price: 24,
    originalPrice: null,
    rating: 4.6,
    reviews: 267,
    image: productsImage,
    category: "Eyes",
    badge: null,
    badgeColor: "",
    description: "Long-lasting waterproof mascara",
    inStock: true,
  },
  {
    id: 8,
    name: "Contouring Kit",
    price: 55,
    originalPrice: null,
    rating: 4.9,
    reviews: 198,
    image: productsImage,
    category: "Face",
    badge: "Trending",
    badgeColor: "bg-dark-teal",
    description: "Complete contouring and highlighting kit",
    inStock: true,
  },
]

const categories = ["All", "Foundation", "Concealer", "Eyes", "Lips", "Face", "Tools"]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

const Shop = () => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [sortBy, setSortBy] = React.useState("featured")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = React.useState<number[]>([])
  const [cart, setCart] = React.useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId])
  }

  const filteredProducts = React.useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <Layout>
      <div className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-dark-teal to-forest-green">
          <div className="container mx-auto px-4">
            <motion.div className="text-center text-white" {...fadeInAnimation}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Collection</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Discover premium makeup products chosen for their quality, performance, and ability to enhance your
                natural beauty.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
              {...fadeInAnimation}
            >
              {/* Left side - Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap ${
                        selectedCategory === category
                          ? "bg-mustard hover:bg-mustard/90"
                          : "hover:bg-mustard hover:text-white"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Right side - Sort & View */}
              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-none border-none ${
                      viewMode === "grid" ? "bg-mustard hover:bg-mustard/90" : ""
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-none border-none ${
                      viewMode === "list" ? "bg-mustard hover:bg-mustard/90" : ""
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Results count */}
            <motion.div className="mt-6 text-sm text-muted-foreground" {...fadeInAnimation}>
              Showing {filteredProducts.length} products
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <motion.div className="text-center py-16" {...fadeInAnimation}>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                  className="bg-mustard hover:bg-mustard/90"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
                {...staggerChildrenTransition}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    {...fadeInAnimation}
                    className={`group ${viewMode === "list" ? "flex gap-6 p-6 bg-card rounded-2xl shadow-soft" : ""}`}
                  >
                    {viewMode === "grid" ? (
                      // Grid View
                      <div className="product-card group">
                        {/* Product Image */}
                        <div className="relative overflow-hidden rounded-t-2xl">
                          {product.badge && (
                            <div className="absolute top-3 left-3 z-10">
                              <Badge className={`${product.badgeColor} text-white`}>{product.badge}</Badge>
                            </div>
                          )}

                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${
                                favorites.includes(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-500 hover:text-red-500"
                              }`}
                            />
                          </button>

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Out of Stock</span>
                            </div>
                          )}

                          {/* Quick Add Button */}
                          {product.inStock && (
                            <motion.button
                              onClick={() => addToCart(product.id)}
                              className="absolute bottom-3 right-3 p-2 bg-mustard text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-mustard text-mustard" />
                              <span className="text-sm font-medium">{product.rating}</span>
                              <span className="text-sm text-muted-foreground">({product.reviews})</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{product.category}</span>
                          </div>

                          <h3 className="font-semibold text-foreground group-hover:text-mustard transition-colors">
                            {product.name}
                          </h3>

                          <p className="text-sm text-muted-foreground">{product.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-mustard">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          <Button className="w-full" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <>
                        <div className="relative w-48 h-32 flex-shrink-0">
                          {product.badge && (
                            <div className="absolute top-2 left-2 z-10">
                              <Badge className={`${product.badgeColor} text-white text-xs`}>{product.badge}</Badge>
                            </div>
                          )}

                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-xl"
                          />

                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                              <span className="text-white text-sm font-semibold">Out of Stock</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                              <p className="text-muted-foreground">{product.description}</p>
                            </div>
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Heart
                                className={`w-5 h-5 transition-colors ${
                                  favorites.includes(product.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-400 hover:text-red-500"
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-mustard text-mustard" />
                              <span className="font-medium">{product.rating}</span>
                              <span className="text-muted-foreground">({product.reviews} reviews)</span>
                            </div>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-mustard">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>

                            <Button onClick={() => addToCart(product.id)} disabled={!product.inStock} className="px-6">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Shop
