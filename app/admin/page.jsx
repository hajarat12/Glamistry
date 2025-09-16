"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, DollarSign, Package, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/motion-variants"

// Mock data
const dashboardStats = {
  totalRevenue: 12450,
  totalBookings: 89,
  totalProducts: 156,
  totalCustomers: 234,
  monthlyGrowth: 12.5,
}

const revenueData = [
  { month: "Jan", revenue: 8400, bookings: 45 },
  { month: "Feb", revenue: 9200, bookings: 52 },
  { month: "Mar", revenue: 10100, bookings: 61 },
  { month: "Apr", revenue: 11300, bookings: 68 },
  { month: "May", revenue: 12450, bookings: 89 },
]

const serviceData = [
  { name: "Bridal Makeup", value: 35, color: "#D4A574" },
  { name: "Special Events", value: 28, color: "#2D5A5A" },
  { name: "Photoshoots", value: 22, color: "#4A7C59" },
  { name: "Consultations", value: 15, color: "#A8D5BA" },
]

const recentBookings = [
  {
    id: "BM-2024-001",
    client: "Sarah Johnson",
    service: "Bridal Makeup Trial",
    date: "2024-02-15",
    time: "2:00 PM",
    status: "confirmed",
    price: 150,
  },
  {
    id: "BM-2024-002",
    client: "Emily Davis",
    service: "Special Event Makeup",
    date: "2024-02-16",
    time: "4:30 PM",
    status: "pending",
    price: 120,
  },
  {
    id: "BM-2024-003",
    client: "Jessica Wilson",
    service: "Photoshoot Makeup",
    date: "2024-02-17",
    time: "10:00 AM",
    status: "confirmed",
    price: 200,
  },
]

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Sarah Johnson",
    items: 3,
    total: 105.95,
    status: "shipped",
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-002",
    customer: "Emily Davis",
    items: 1,
    total: 78.0,
    status: "processing",
    date: "2024-01-16",
  },
  {
    id: "ORD-2024-003",
    customer: "Jessica Wilson",
    items: 2,
    total: 156.5,
    status: "delivered",
    date: "2024-01-17",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "delivered":
        return "bg-green-100 text-green-800"
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your makeup artistry business</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{dashboardStats.monthlyGrowth}% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">{dashboardStats.totalBookings}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Products Sold</p>
                    <p className="text-2xl font-bold">{dashboardStats.totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">{dashboardStats.totalCustomers}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Active customers</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="revenue" stroke="#D4A574" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Service Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={serviceData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {serviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentBookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-semibold">{booking.client}</p>
                              <p className="text-sm text-muted-foreground">{booking.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              <p className="font-semibold mt-1">${booking.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items} items • {new Date(order.date).toLocaleDateString()}
                              </p>
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
                </div>
              </TabsContent>

              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Booking Management</CardTitle>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      New Booking
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-semibold text-lg">{booking.client}</p>
                              <p className="text-muted-foreground">{booking.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              <p className="font-semibold text-lg mt-1">${booking.price}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {booking.status === "pending" && (
                              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                Confirm
                              </Button>
                            )}
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
                    <CardTitle>Order Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-semibold text-lg">{order.id}</p>
                              <p className="text-muted-foreground">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items} items • Ordered on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                              <p className="font-semibold text-lg mt-1">${order.total}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                            <Button variant="outline" size="sm">
                              Print Label
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="bookings" fill="#2D5A5A" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                          <div>
                            <p className="font-semibold">Booking Completion Rate</p>
                            <p className="text-sm text-muted-foreground">Confirmed bookings</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold">94%</p>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-semibold">Average Response Time</p>
                            <p className="text-sm text-muted-foreground">To booking requests</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold">2.3h</p>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-8 w-8 text-yellow-600" />
                          <div>
                            <p className="font-semibold">Customer Satisfaction</p>
                            <p className="text-sm text-muted-foreground">Average rating</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold">4.9</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
