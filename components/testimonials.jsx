"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { motionVariants } from "@/lib/motion-variants"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    image: "/happy-bride-testimonial-portrait.jpg",
    rating: 5,
    text: "Bella made me feel absolutely stunning on my wedding day. Her attention to detail and artistic vision exceeded all my expectations. I felt like the most beautiful version of myself!",
  },
  {
    name: "Emma Rodriguez",
    role: "Model",
    image: "/professional-model-testimonial-portrait.jpg",
    rating: 5,
    text: "Working with Bella for my photoshoot was incredible. She understood exactly what look would work best for the camera and created something truly magical. Highly recommend!",
  },
  {
    name: "Lisa Chen",
    role: "Event Attendee",
    image: "/elegant-woman-testimonial-portrait.jpg",
    rating: 5,
    text: "I booked Bella for a gala event and received so many compliments! Her makeup lasted all night and looked flawless in every photo. She's truly talented.",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={motionVariants.fadeInUp}>
          <h2 className="section-heading text-foreground mb-4">What Clients Say</h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the amazing clients who trusted us with their special moments.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={motionVariants.staggerContainer}>
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} variants={motionVariants.fadeInUp}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="body-text text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
