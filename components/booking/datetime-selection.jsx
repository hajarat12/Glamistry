"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

interface DateTimeSelectionProps {
  selectedDate: Date | null
  selectedTime: string | null
  onDateSelect: (date: Date) => void
  onTimeSelect: (time: string) => void
  onNext: () => void
  onPrev: () => void
}

export function DateTimeSelection({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onNext,
  onPrev,
}: DateTimeSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const isTimeSlotAvailable = (time: string) => {
    // Mock availability logic - in real app, this would check against backend
    const unavailableSlots = ["11:00 AM", "2:00 PM", "4:00 PM"]
    return !unavailableSlots.includes(time)
  }

  const canProceed = selectedDate && selectedTime

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="section-heading text-foreground mb-2">Select Date & Time</h2>
        <p className="body-text text-muted-foreground">
          Choose your preferred date and time slot for your makeup session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Available Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time)
                  const isSelected = selectedTime === time

                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "default" : "outline"}
                      disabled={!isAvailable}
                      onClick={() => onTimeSelect(time)}
                      className={`${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : isAvailable
                            ? "hover:bg-primary/10"
                            : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {time}
                      {!isAvailable && <span className="ml-1 text-xs">(Booked)</span>}
                    </Button>
                  )
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Please select a date first to see available time slots.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Continue to Details
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
