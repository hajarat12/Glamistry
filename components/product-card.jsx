"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    brand: string
    rating: number
    reviews: number
    description: string
    inStock: boolean
    featured: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
            {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-3 right-3 flex flex-col gap-2"
          >
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-black/80 hover:bg-black/90 text-white border-0"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-black/80 hover:bg-black/90 text-white border-0"
              asChild
            >
              <Link href={`/shop/product/${product.id}`}>
                <Eye className="h-4 w-4 text-white" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={!product.inStock}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
