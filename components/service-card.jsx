"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Check } from "lucide-react"
import Link from "next/link"

interface Service {
  id: number
  title: string
  duration: string
  price: number
  category: string
  occasion: string
  description: string
  features: string[]
  image: string
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
      <div className="relative overflow-hidden">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{service.category}</Badge>
      </div>

      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold mb-2">{service.title}</h3>
          <p className="body-text text-muted-foreground mb-4">{service.description}</p>

          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{service.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>From ${service.price}</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={`/booking?service=${service.id}`}>Book This Service</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
