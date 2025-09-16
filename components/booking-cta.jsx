"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { motionVariants } from "@/lib/motion-variants"
import Link from "next/link"

export function BookingCTA() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.div variants={motionVariants.fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="section-heading text-secondary-foreground mb-4">Ready to Transform Your Look?</h2>
          <p className="body-large text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Book your personalized makeup session today and discover the confidence that comes with looking your
            absolute best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
            >
              <Link href="/booking">Book Your Session</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary text-lg px-8 py-4 bg-transparent"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
          <Link href="/booking">Book Now</Link>
        </Button>
      </div>
    </section>
  )
}
