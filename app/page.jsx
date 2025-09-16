"use client"

import { HeroBanner } from "@/components/hero-banner"
import { ServicesPreview } from "@/components/services-preview"
import { FeaturedProducts } from "@/components/featured-products"
import { Testimonials } from "@/components/testimonials"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <div>
          <HeroBanner />
          <ServicesPreview />
          <FeaturedProducts />
          <Testimonials />
        </div>
      </main>
    </div>
  )
}
