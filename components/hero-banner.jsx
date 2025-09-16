"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motionVariants } from "@/lib/motion-variants"

export function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/80">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/professional-makeup-artist-studio.jpg"
          alt="Professional makeup artist studio"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-secondary-foreground">
        <motion.div variants={motionVariants.fadeInUp} className="max-w-4xl mx-auto space-y-8">
          <h1 className="display-heading">
            Transform Your Beauty
            <br />
            <span className="text-primary">With Professional Artistry</span>
          </h1>

          <p className="body-large max-w-2xl mx-auto">
            Experience the art of makeup with our professional services. From bridal beauty to special events, we create
            stunning looks that enhance your natural radiance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/booking">Book Your Appointment</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary bg-transparent"
              asChild
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-secondary-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary-foreground rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
