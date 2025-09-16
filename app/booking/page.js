"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ServiceSelection } from "@/components/booking/service-selection"
import { DateTimeSelection } from "@/components/booking/datetime-selection"
import { ClientDetails } from "@/components/booking/client-details"
import { BookingSummary } from "@/components/booking/booking-summary"
import { BookingSteps } from "@/components/booking-steps"
import { motionVariants } from "@/lib/motion-variants"

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: null,
    date: null,
    time: null,
    clientDetails: null,
  })

  const updateBookingData = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const renderStep = () => {
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={motionVariants.staggerContainer}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="display-heading">Book Your Appointment</h1>
            <p className="body-large text-muted-foreground">Let's create your perfect look together</p>
          </div>

          <BookingSteps currentStep={currentStep} />

          <div className="bg-card rounded-lg p-8 shadow-sm">{renderStep()}</div>
        </motion.div>
      </main>
    </div>
  )
}
