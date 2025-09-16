"use client"

import { motion } from "framer-motion"
import { motionVariants } from "@/lib/motion-variants"
import { Award, Users, Calendar, Sparkles } from "lucide-react"

const stats = [
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Calendar, label: "Years Experience", value: "8+" },
  { icon: Award, label: "Awards Won", value: "12" },
  { icon: Sparkles, label: "Transformations", value: "1000+" },
]

export function ProfileHeader() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={motionVariants.slideInLeft}>
            <div className="relative">
              <img
                src="/professional-makeup-artist-portrait-elegant-studio.jpg"
                alt="Bella Rose - Professional Makeup Artist"
                className="w-full h-[600px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <p className="font-serif text-lg font-semibold">Certified Professional</p>
                <p className="text-sm">Makeup Artist</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={motionVariants.slideInRight} className="space-y-6">
            <div>
              <h1 className="section-heading text-foreground mb-4">Meet Bella Rose</h1>
              <p className="body-large text-muted-foreground mb-6">
                With over 8 years of experience in the beauty industry, I specialize in creating stunning, personalized
                looks that enhance your natural beauty and boost your confidence.
              </p>
            </div>

            <div className="space-y-4">
              <p className="body-text text-muted-foreground">
                My journey began at the prestigious Beauty Institute of New York, where I honed my skills in both
                traditional and contemporary makeup techniques. Since then, I've had the privilege of working with
                hundreds of clients, from intimate bridal sessions to high-fashion photoshoots.
              </p>
              <p className="body-text text-muted-foreground">
                I believe that makeup is an art form that should celebrate your unique features while making you feel
                absolutely radiant. Every session is tailored to your personal style, skin tone, and the occasion,
                ensuring you look and feel your absolute best.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-muted/30 rounded-lg">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-serif text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
