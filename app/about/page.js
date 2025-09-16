"use client"

import { motion } from "framer-motion"
import { ProfileHeader } from "@/components/profile-header"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { BookingCTA } from "@/components/booking-cta"
import { motionVariants } from "@/lib/motion-variants"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main>
        <motion.div initial="hidden" animate="visible" variants={motionVariants.staggerContainer}>
          <ProfileHeader />
          <PortfolioGrid />
        </motion.div>
      </main>
      <BookingCTA />
    </div>
  )
}
