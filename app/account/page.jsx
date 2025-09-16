"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Heart, Calendar, ShoppingBag, Star } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/motion-variants"

// Mock user data
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  memberSince: "January 2023",
  totalOrders: 12,
  totalSpent: 847.5,
  loyaltyPoints: 1250,
}

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 105.95,
    items: [
      { name: "Radiant Glow Foundation", quantity: 1, price: 45 },
      { name: "Velvet Matte Lipstick Set", quantity: 2, price: 32 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-08",
    status: "shipped",
    total: 78.0,
    items: [{ name: "Professional Brush Set", quantity: 1, price: 78 }],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-02",
    status: "processing",
    total: 156.5,
    items: [
      { name: "Smoky Eye Shadow Palette", quantity: 1, price: 42 },
      { name: "Luminous Highlighter Palette", quantity: 2, price: 28 },
    ],
  },
]

const upcomingAppointments = [
  {
    id: 1,
    service: "Bridal Makeup Trial",
    date: "2024-02-15",
    time: "2:00 PM",
    status: "confirmed",
    price: 150,
  },
  {
    id: 2,
    service: "Special Event Makeup",
    date: "2024-02-22",
    time: "4:30 PM",
    status: "pending",
    price: 120,
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "Luxury Foundation Set",
    price: 89,
    originalPrice: 110,
    image: "/luxury-foundation-bottle-with-golden-accents.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Brush Collection",
    price: 145,
    image: "/professional-makeup-brushes-with-rose-gold.jpg",
    inStock: false,
  },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="text-lg">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
              <p className="text-sm text-muted-foreground">Member since {userData.memberSince}</p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{userData.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">${userData.totalSpent}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{userData.loyaltyPoints}</p>
                <p className="text-sm text-muted-foreground">Loyalty Points</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            <p className="font-semibold mt-1">${order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-semibold">{appointment.service}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            <p className="font-semibold mt-1">${appointment.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-semibold text-lg">{order.id}</p>
                              <p className="text-muted-foreground">
                                Ordered on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                              <p className="font-semibold text-lg mt-1">${order.total}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            {order.status === "delivered" && (
                              <Button variant="outline" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-semibold text-lg">{appointment.service}</p>
                              <p className="text-muted-foreground">
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                              <p className="font-semibold text-lg mt-1">${appointment.price}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <h3 className="font-semibold mb-2">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-bold">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                              disabled={!item.inStock}
                            >
                              {item.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
