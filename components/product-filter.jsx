"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"

interface ProductFilterProps {
  onFilterChange: (filters: any) => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalProducts: number
}

export function ProductFilter({ onFilterChange, sortBy, onSortChange, totalProducts }: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 100],
    inStock: false,
    brands: [],
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "foundation", label: "Foundation" },
    { value: "lips", label: "Lips" },
    { value: "eyes", label: "Eyes" },
    { value: "face", label: "Face" },
    { value: "tools", label: "Tools" },
  ]

  const brands = ["Bella Beauty", "Rouge Studio", "Pro Artist", "Glow Beauty", "Shadow Co", "Line Perfect"]

  const handleFilterUpdate = (newFilters: any) => {
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category }
    handleFilterUpdate(newFilters)
  }

  const handlePriceChange = (priceRange: number[]) => {
    const newFilters = { ...filters, priceRange }
    handleFilterUpdate(newFilters)
  }

  const handleStockChange = (inStock: boolean) => {
    const newFilters = { ...filters, inStock }
    handleFilterUpdate(newFilters)
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)
    const newFilters = { ...filters, brands: newBrands }
    handleFilterUpdate(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      category: "all",
      priceRange: [0, 100],
      inStock: false,
      brands: [],
    }
    handleFilterUpdate(newFilters)
  }

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <p className="text-sm text-muted-foreground">Showing {totalProducts} products</p>
        </div>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filters */}
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${isOpen ? "block" : "hidden lg:grid"}`}>
        {/* Category Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={filters.category === category.value}
                  onCheckedChange={() => handleCategoryChange(category.value)}
                />
                <Label htmlFor={category.value} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Price Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </CardContent>
        </Card>

        {/* Brand Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Brand</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                />
                <Label htmlFor={brand} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Availability Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="inStock" checked={filters.inStock} onCheckedChange={handleStockChange} />
              <Label htmlFor="inStock" className="text-sm">
                In Stock Only
              </Label>
            </div>
            <Button variant="outline" size="sm" onClick={clearFilters} className="w-full mt-4 bg-transparent">
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
