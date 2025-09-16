"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motionVariants } from "@/lib/motion-variants"
import Link from "next/link"
import { Heart, Camera, Sparkles, GraduationCap } from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "Bridal Makeup",
    description: "Your perfect wedding day look with a complimentary trial session.",
    price: "From $350",
    image: "/beautiful-bridal-makeup-elegant-bride.jpg",
  },
  {
    icon: Camera,
    title: "Photoshoot Glam",
    description: "Professional makeup for photography, modeling, and creative shoots.",
    price: "From $200",
    image: "/glamorous-photoshoot-makeup-dramatic-lighting.jpg",
  },
  {
    icon: Sparkles,
    title: "Special Events",
    description: "Look stunning for galas, parties, proms, and special occasions.",
    price: "From $150",
    image: "/elegant-evening-makeup-special-event.jpg",
  },
  {
    icon: GraduationCap,
    title: "Makeup Lessons",
    description: "Learn professional techniques in personalized one-on-one sessions.",
    price: "From $120",
    image: "/makeup-lesson-tutorial-professional-artist-teachin.jpg",
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={motionVariants.fadeInUp}>
          <h2 className="section-heading text-foreground mb-4">Signature Services</h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect makeup service for your needs, from intimate bridal sessions to glamorous photoshoots.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={motionVariants.staggerContainer}
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={motionVariants.fadeInUp}>
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-2 rounded-full">
                    <service.icon className="h-5 w-5" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="body-text text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{service.price}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services">Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mt-12" variants={motionVariants.fadeInUp}>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
