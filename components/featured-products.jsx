"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motionVariants } from "@/lib/motion-variants"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Radiant Foundation",
    price: 45,
    rating: 4.9,
    image: "/luxury-foundation-makeup-product-elegant-packaging.jpg",
    description: "Full coverage foundation for a flawless finish",
  },
  {
    id: 2,
    name: "Velvet Lipstick Set",
    price: 65,
    rating: 4.8,
    image: "/luxury-lipstick-set-elegant-makeup-collection.jpg",
    description: "5 stunning shades in our signature formula",
  },
  {
    id: 3,
    name: "Glow Highlighter Palette",
    price: 38,
    rating: 4.9,
    image: "/highlighter-palette-makeup-glow-shimmer-luxury.jpg",
    description: "4 luminous shades for the perfect glow",
  },
  {
    id: 4,
    name: "Professional Brush Set",
    price: 120,
    rating: 5.0,
    image: "/professional-makeup-brushes-luxury-set-elegant-cas.jpg",
    description: "12 essential brushes for flawless application",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={motionVariants.fadeInUp}>
          <h2 className="section-heading text-foreground mb-4">Featured Products</h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Discover the premium makeup products I use and recommend for achieving professional results at home.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={motionVariants.staggerContainer}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={motionVariants.fadeInUp}>
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 text-secondary hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price}</span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mt-12" variants={motionVariants.fadeInUp}>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">Shop All Products</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
