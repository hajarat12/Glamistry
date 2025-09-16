"use client"

import { motion } from "framer-motion"
import { ServiceCard } from "@/components/service-card"
import { BookingCTA } from "@/components/booking-cta"
import { motionVariants } from "@/lib/motion-variants"

const services = [
  {
    id: 1,
    title: "Bridal Makeup",
    description: "Complete bridal makeup package including trial session, wedding day application, and touch-up kit.",
    price: "$350",
    duration: "3-4 hours",
    image: "/bridal-makeup-elegant-bride.jpg",
  },
  {
    id: 2,
    title: "Special Event Makeup",
    description: "Professional makeup for special occasions, parties, photoshoots, and formal events.",
    price: "$150",
    duration: "1-2 hours",
    image: "/glamorous-evening-makeup.jpg",
  },
  {
    id: 3,
    title: "Makeup Lessons",
    description: "Personal makeup lessons to learn techniques and find your perfect look.",
    price: "$120",
    duration: "2 hours",
    image: "/makeup-tutorial-lesson.jpg",
  },
  {
    id: 4,
    title: "Group Sessions",
    description: "Fun makeup sessions for groups, perfect for bridal parties or special celebrations.",
    price: "$100/person",
    duration: "2-3 hours",
    image: "/group-makeup-session-friends.jpg",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motionVariants.staggerContainer}
          className="space-y-16"
        >
          <div className="text-center space-y-4">
            <h1 className="display-heading">Our Services</h1>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Professional makeup services tailored to make you look and feel your absolute best for any occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </motion.div>
      </main>
      <BookingCTA />
    </div>
  )
}
