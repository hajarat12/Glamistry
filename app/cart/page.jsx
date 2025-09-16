"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/motion-variants"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Radiant Glow Foundation",
    price: 45,
    originalPrice: 55,
    image: "/luxury-foundation-bottle-with-golden-accents.jpg",
    brand: "Bella Beauty",
    shade: "Medium",
    quantity: 1,
    inStock: true,
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick Set",
    price: 32,
    image: "/elegant-lipstick-collection-in-warm-tones.jpg",
    brand: "Rouge Studio",
    quantity: 2,
    inStock: true,
  },
  {
    id: 3,
    name: "Professional Brush Set",
    price: 78,
    originalPrice: 95,
    image: "/professional-makeup-brushes-with-rose-gold.jpg",
    brand: "Pro Artist",
    quantity: 1,
    inStock: false,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 50 ? 0 : 8.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center space-y-6">
            <motion.div variants={itemVariants}>
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h1 className="page-heading text-foreground mb-2">Your Cart is Empty</h1>
              <p className="body-text text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/shop">Continue Shopping</Link>
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
            <h1 className="page-heading text-foreground mb-2">Shopping Cart</h1>
            <p className="body-text text-muted-foreground">Review your items and proceed to checkout when ready.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            {item.shade && (
                              <Badge variant="secondary" className="mt-1">
                                {item.shade}
                              </Badge>
                            )}
                            {!item.inStock && (
                              <Badge variant="destructive" className="mt-1">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">${item.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (SAVE10)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 50 && (
                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={promoApplied || !promoCode}>
                      Apply
                    </Button>
                  </div>
                  {promoApplied && <p className="text-sm text-green-600">Promo code applied successfully!</p>}
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={cartItems.some((item) => !item.inStock)}
              >
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
