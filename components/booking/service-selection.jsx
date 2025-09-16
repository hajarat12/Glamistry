"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Check } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Bridal Makeup",
    duration: "3-4 hours",
    price: 350,
    description: "Complete bridal makeup experience including trial session",
    features: ["Complimentary trial", "Long-lasting formula", "Touch-up kit"],
  },
  {
    id: 2,
    title: "Special Event Makeup",
    duration: "1.5-2 hours",
    price: 150,
    description: "Elegant makeup for galas, parties, and special occasions",
    features: ["Custom color palette", "Long-wearing formula", "Touch-up tips"],
  },
  {
    id: 3,
    title: "Photoshoot Glam",
    duration: "2-3 hours",
    price: 200,
    description: "Professional makeup designed for photography",
    features: ["Camera-ready finish", "Multiple looks", "Touch-ups included"],
  },
  {
    id: 4,
    title: "Makeup Lessons",
    duration: "2 hours",
    price: 120,
    description: "Learn professional techniques in personalized sessions",
    features: ["Personalized instruction", "Product recommendations", "Take-home guide"],
  },
]

interface ServiceSelectionProps {
  selectedService: any
  onServiceSelect: (service: any) => void
  onNext: () => void
}

export function ServiceSelection({ selectedService, onServiceSelect, onNext }: ServiceSelectionProps) {
  const handleServiceSelect = (service: any) => {
    onServiceSelect(service)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="section-heading text-foreground mb-2">Choose Your Service</h2>
        <p className="body-text text-muted-foreground">
          Select the makeup service that best fits your needs and occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedService?.id === service.id ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
            }`}
            onClick={() => handleServiceSelect(service)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold">{service.title}</h3>
                {selectedService?.id === service.id && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Check className="h-3 w-3 mr-1" />
                    Selected
                  </Badge>
                )}
              </div>

              <p className="body-text text-muted-foreground mb-4">{service.description}</p>

              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>${service.price}</span>
                </div>
              </div>

              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedService}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Continue to Date & Time
        </Button>
      </div>
    </div>
  )
}
