"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Truck, Lock, Check } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/motion-variants"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",

    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Options
    shippingMethod: "standard",
    paymentMethod: "card",
    saveInfo: false,
    newsletter: false,
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Mock order data
  const orderSummary = {
    items: [
      { name: "Radiant Glow Foundation", price: 45, quantity: 1 },
      { name: "Velvet Matte Lipstick Set", price: 32, quantity: 2 },
    ],
    subtotal: 109,
    discount: 10.9,
    shipping: 0,
    tax: 7.85,
    total: 105.95,
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    }

    if (step === 2) {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <motion.div variants={itemVariants}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="page-heading text-foreground mb-2">Order Confirmed!</h1>
              <p className="body-text text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been successfully placed and you'll receive a confirmation
                email shortly.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <p className="font-semibold">Order Number</p>
                    <p className="text-2xl font-mono text-primary">ORD-2024-001</p>
                    <p className="text-sm text-muted-foreground">Estimated delivery: 3-5 business days</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="/">Continue Shopping</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/account/orders">View Order</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="page-heading text-foreground mb-2">Checkout</h1>
            <p className="body-text text-muted-foreground">Complete your purchase securely and safely.</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <span className="hidden sm:inline">Shipping</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <span className="hidden sm:inline">Payment</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-destructive" : ""}
                        />
                        {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-destructive" : ""}
                        />
                        {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className={errors.city ? "border-destructive" : ""}
                        />
                        {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          className={errors.zipCode ? "border-destructive" : ""}
                        />
                        {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode}</p>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Shipping Method</Label>
                      <RadioGroup
                        value={formData.shippingMethod}
                        onValueChange={(value) => handleInputChange("shippingMethod", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Standard Shipping (5-7 days)</span>
                              <span>Free</span>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Express Shipping (2-3 days)</span>
                              <span>$12.99</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        className={errors.cardNumber ? "border-destructive" : ""}
                      />
                      {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          className={errors.expiryDate ? "border-destructive" : ""}
                        />
                        {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className={errors.cvv ? "border-destructive" : ""}
                        />
                        {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        className={errors.cardName ? "border-destructive" : ""}
                      />
                      {errors.cardName && <p className="text-sm text-destructive">{errors.cardName}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) => handleInputChange("saveInfo", checked)}
                      />
                      <Label htmlFor="saveInfo" className="text-sm">
                        Save payment information for future purchases
                      </Label>
                    </div>

                    <div className="bg-muted p-4 rounded-lg flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Your payment information is encrypted and secure.</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)}>
                    Back
                  </Button>
                )}
                {currentStep < 2 ? (
                  <Button
                    onClick={handleNext}
                    className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Payment
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isProcessing ? "Processing..." : `Complete Order - $${orderSummary.total.toFixed(2)}`}
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants}>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {orderSummary.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${orderSummary.discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderSummary.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
