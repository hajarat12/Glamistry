"use client"

import { motion } from "framer-motion"
import { motionVariants } from "@/lib/motion-variants"
import { useState } from "react"

const portfolioItems = [
  {
    id: 1,
    category: "Bridal",
    image: "/beautiful-bridal-makeup-elegant-bride-wedding.jpg",
    title: "Classic Bridal Elegance",
  },
  {
    id: 2,
    category: "Editorial",
    image: "/editorial-makeup-fashion-photography-dramatic.jpg",
    title: "Fashion Editorial",
  },
  {
    id: 3,
    category: "Glamour",
    image: "/glamorous-evening-makeup-red-carpet-style.jpg",
    title: "Red Carpet Glam",
  },
  {
    id: 4,
    category: "Natural",
    image: "/placeholder.svg?height=400&width=400",
    title: "Natural Beauty",
  },
  {
    id: 5,
    category: "Bridal",
    image: "/placeholder.svg?height=400&width=400",
    title: "Romantic Bridal",
  },
  {
    id: 6,
    category: "Editorial",
    image: "/placeholder.svg?height=400&width=400",
    title: "Creative Editorial",
  },
  {
    id: 7,
    category: "Glamour",
    image: "/placeholder.svg?height=400&width=400",
    title: "Smoky Glamour",
  },
  {
    id: 8,
    category: "Natural",
    image: "/placeholder.svg?height=400&width=400",
    title: "Fresh & Glowing",
  },
]

const categories = ["All", "Bridal", "Editorial", "Glamour", "Natural"]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={motionVariants.fadeInUp}>
          <h2 className="section-heading text-foreground mb-4">Portfolio Highlights</h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore some of my favorite transformations and see the artistry behind each unique look.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={motionVariants.staggerContainer}
          key={activeCategory}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={motionVariants.fadeInUp}
              whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm">{item.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
