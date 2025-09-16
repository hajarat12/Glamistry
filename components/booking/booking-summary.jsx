"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, Clock, User, CreditCard, Check } from "lucide-react"

interface BookingSummaryProps {
  bookingData: any
  onPrev: () => void
}

export function BookingSummary({ bookingData, onPrev }: BookingSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirmBooking = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
          <Check className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h2 className="section-heading text-foreground mb-2">Booking Confirmed!</h2>
          <p className="body-text text-muted-foreground">
            Your makeup session has been successfully booked. You'll receive a confirmation email shortly.
          </p>
        </div>
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <p className="font-semibold">Booking Reference</p>
              <p className="text-2xl font-mono text-primary">BM-2024-001</p>
              <p className="text-sm text-muted-foreground">Please save this reference number for your records</p>
            </div>
          </CardContent>
        </Card>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    )
  }

  const subtotal = bookingData.service?.price || 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="section-heading text-foreground mb-2">Review Your Booking</h2>
        <p className="body-text text-muted-foreground">
          Please review your booking details before confirming your appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{bookingData.service?.title}</h3>
                <p className="text-muted-foreground">{bookingData.service?.description}</p>
                <Badge className="mt-2">{bookingData.service?.duration}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">
                  {bookingData.date?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {bookingData.time}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">
                  {bookingData.clientDetails?.firstName} {bookingData.clientDetails?.lastName}
                </p>
                <p className="text-muted-foreground">{bookingData.clientDetails?.email}</p>
                <p className="text-muted-foreground">{bookingData.clientDetails?.phone}</p>
                {bookingData.clientDetails?.notes && (
                  <div className="mt-4">
                    <p className="font-medium">Special Requests:</p>
                    <p className="text-muted-foreground text-sm">{bookingData.clientDetails.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{bookingData.service?.title}</span>
                  <span>${subtotal}</span>
                </div>
                {bookingData.clientDetails?.promoCode && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Code Applied</span>
                    <span>-$25</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>• A 50% deposit is required to secure your booking</p>
                  <p>• Remaining balance due on the day of service</p>
                  <p>• Free cancellation up to 48 hours before appointment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onPrev}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Details
            </Button>
            <Button
              onClick={handleConfirmBooking}
              disabled={isProcessing}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isProcessing ? "Processing..." : `Confirm & Pay $${(total * 0.5).toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
