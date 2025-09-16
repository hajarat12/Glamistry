"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ServiceSelection } from "@/components/booking/service-selection"
import { DateTimeSelection } from "@/components/booking/datetime-selection"
import { ClientDetails } from "@/components/booking/client-details"
import { BookingSummary } from "@/components/booking/booking-summary"
import { Check } from "lucide-react"

const steps = [
  { id: 1, title: "Select Service", description: "Choose your makeup service" },
  { id: 2, title: "Date & Time", description: "Pick your preferred slot" },
  { id: 3, title: "Your Details", description: "Tell us about yourself" },
  { id: 4, title: "Confirm & Pay", description: "Review and complete booking" },
]

export function BookingSteps() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: null,
    date: null,
    time: null,
    clientDetails: null,
  })

  const updateBookingData = (key: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedService={bookingData.service}
            onServiceSelect={(service) => updateBookingData("service", service)}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <DateTimeSelection
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            onDateSelect={(date) => updateBookingData("date", date)}
            onTimeSelect={(time) => updateBookingData("time", time)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <ClientDetails
            clientDetails={bookingData.clientDetails}
            onDetailsUpdate={(details) => updateBookingData("clientDetails", details)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return <BookingSummary bookingData={bookingData} onPrev={prevStep} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep > step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
                </div>
                <div className="mt-2 text-center">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors ${currentStep > step.id ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
