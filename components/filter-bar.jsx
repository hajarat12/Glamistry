"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Service {
  id: number
  title: string
  duration: string
  price: number
  category: string
  occasion: string
  description: string
  features: string[]
  image: string
}

interface FilterBarProps {
  services: Service[]
  onFilter: (filteredServices: Service[]) => void
}

export function FilterBar({ services, onFilter }: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [occasion, setOccasion] = useState("all")

  const categories = ["all", ...new Set(services.map((s) => s.category))]
  const occasions = ["all", ...new Set(services.map((s) => s.occasion))]

  const applyFilters = (category: string, price: string, occ: string) => {
    let filtered = services

    if (category !== "all") {
      filtered = filtered.filter((s) => s.category === category)
    }

    if (price !== "all") {
      if (price === "low") {
        filtered = filtered.filter((s) => s.price <= 150)
      } else if (price === "medium") {
        filtered = filtered.filter((s) => s.price > 150 && s.price <= 250)
      } else if (price === "high") {
        filtered = filtered.filter((s) => s.price > 250)
      }
    }

    if (occ !== "all") {
      filtered = filtered.filter((s) => s.occasion === occ)
    }

    onFilter(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    applyFilters(category, priceRange, occasion)
  }

  const handlePriceChange = (price: string) => {
    setPriceRange(price)
    applyFilters(activeCategory, price, occasion)
  }

  const handleOccasionChange = (occ: string) => {
    setOccasion(occ)
    applyFilters(activeCategory, priceRange, occ)
  }

  return (
    <div className="bg-muted/30 p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Filter Services</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="capitalize"
              >
                {category === "all" ? "All Services" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <Select value={priceRange} onValueChange={handlePriceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under $150</SelectItem>
              <SelectItem value="medium">$150 - $250</SelectItem>
              <SelectItem value="high">Over $250</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Occasion Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Occasion</label>
          <Select value={occasion} onValueChange={handleOccasionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Occasions</SelectItem>
              {occasions
                .filter((occ) => occ !== "all")
                .map((occ) => (
                  <SelectItem key={occ} value={occ} className="capitalize">
                    {occ}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
