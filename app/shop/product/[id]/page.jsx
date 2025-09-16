"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/motion-variants"

const getProduct = (id: string) => {
  const products = {
    "1": {
      id: 1,
      name: "Radiant Glow Foundation",
      price: 45,
      originalPrice: 55,
      images: [
        "/luxury-foundation-bottle-with-golden-accents.jpg",
        "/foundation-swatches-on-different-skin-tones.jpg",
        "/foundation-application-with-brush.jpg",
      ],
      category: "foundation",
      brand: "Glamistry Beauty",
      rating: 4.8,
      reviews: 124,
      description:
        "Experience flawless coverage with our Radiant Glow Foundation. This lightweight, buildable formula provides natural-looking coverage while nourishing your skin with hydrating ingredients.",
      features: [
        "Full coverage with natural finish",
        "24-hour wear",
        "SPF 30 protection",
        "Suitable for all skin types",
        "Cruelty-free and vegan",
      ],
      ingredients:
        "Water, Cyclopentasiloxane, Titanium Dioxide, Dimethicone, Glycerin, Iron Oxides, Hyaluronic Acid, Vitamin E",
      inStock: true,
      stockCount: 15,
      shades: ["Fair", "Light", "Medium", "Tan", "Deep"],
    },
    "2": {
      id: 2,
      name: "Velvet Matte Lipstick Set",
      price: 32,
      images: [
        "/elegant-lipstick-collection-in-warm-tones.jpg",
        "/lipstick-swatches-on-lips.jpg",
        "/lipstick-application-close-up.jpg",
      ],
      category: "lips",
      brand: "Rouge Studio",
      rating: 4.9,
      reviews: 89,
      description:
        "Long-lasting matte lipsticks in 6 stunning shades. These highly pigmented formulas provide intense color payoff with a comfortable, non-drying finish.",
      features: [
        "6 versatile shades included",
        "12-hour wear time",
        "Non-drying formula",
        "Highly pigmented",
        "Vegan and cruelty-free",
      ],
      ingredients:
        "Dimethicone, Bis-Diglyceryl Polyacyladipate-2, Diisostearyl Malate, Phenylpropyldimethylsiloxysilicate",
      inStock: true,
      stockCount: 23,
      shades: ["Ruby Red", "Rose Pink", "Coral Sunset", "Berry Wine", "Nude Beige", "Classic Red"],
    },
    "3": {
      id: 3,
      name: "Professional Brush Set",
      price: 78,
      originalPrice: 95,
      images: [
        "/professional-makeup-brushes-with-rose-gold.jpg",
        "/brush-set-in-elegant-case.jpg",
        "/individual-brush-details.jpg",
      ],
      category: "tools",
      brand: "Pro Artist",
      rating: 4.7,
      reviews: 156,
      description:
        "Complete 12-piece professional makeup brush collection with synthetic bristles and rose gold ferrules. Includes storage case.",
      features: [
        "12 essential brushes included",
        "Synthetic, cruelty-free bristles",
        "Rose gold ferrules",
        "Includes storage case",
        "Professional quality",
      ],
      ingredients: "Synthetic bristles, Aluminum ferrules, Wooden handles, Vegan materials",
      inStock: true,
      stockCount: 8,
    },
    "4": {
      id: 4,
      name: "Luminous Highlighter Palette",
      price: 28,
      images: [
        "/shimmering-highlighter-palette-with-mirror.jpg",
        "/highlighter-swatches-on-skin.jpg",
        "/highlighter-application-cheekbone.jpg",
      ],
      category: "face",
      brand: "Glow Beauty",
      rating: 4.6,
      reviews: 73,
      description:
        "4-shade highlighter palette for the perfect glow. From subtle everyday radiance to bold strobing effects.",
      features: [
        "4 complementary shades",
        "Buildable intensity",
        "Finely milled powder",
        "Includes mirror",
        "Long-lasting glow",
      ],
      ingredients: "Mica, Talc, Magnesium Stearate, Dimethicone, Phenoxyethanol, Iron Oxides",
      inStock: true,
      stockCount: 12,
      shades: ["Champagne", "Rose Gold", "Golden Bronze", "Pearl White"],
    },
    "5": {
      id: 5,
      name: "Smoky Eye Shadow Palette",
      price: 42,
      images: [
        "/elegant-eyeshadow-palette-with-neutral-tones.jpg",
        "/eyeshadow-swatches-arm.jpg",
        "/smoky-eye-makeup-look.jpg",
      ],
      category: "eyes",
      brand: "Shadow Co",
      rating: 4.8,
      reviews: 201,
      description:
        "18 highly pigmented shades for dramatic eye looks. Mix of matte and shimmer finishes in neutral and smoky tones.",
      features: [
        "18 versatile shades",
        "Mix of matte and shimmer",
        "Highly pigmented",
        "Blendable formula",
        "Professional quality",
      ],
      ingredients: "Talc, Mica, Magnesium Stearate, Dimethicone, Mineral Oil, Phenoxyethanol",
      inStock: false,
      stockCount: 0,
    },
    "6": {
      id: 6,
      name: "Precision Eyeliner Duo",
      price: 24,
      images: [
        "/sleek-eyeliner-pens-black-and-brown.jpg",
        "/eyeliner-application-close-up.jpg",
        "/eyeliner-precision-tip.jpg",
      ],
      category: "eyes",
      brand: "Line Perfect",
      rating: 4.5,
      reviews: 67,
      description:
        "Waterproof liquid eyeliner in black and brown. Ultra-fine tip for precise application and long-lasting wear.",
      features: [
        "2 essential colors",
        "Waterproof formula",
        "Ultra-fine precision tip",
        "16-hour wear",
        "Easy removal",
      ],
      ingredients: "Water, Acrylates Copolymer, Propylene Glycol, Phenoxyethanol, Iron Oxides",
      inStock: true,
      stockCount: 18,
      shades: ["Jet Black", "Rich Brown"],
    },
  }
  return products[id] || null
}

export default function ProductPage() {
  const params = useParams()
  const product = getProduct(params.id as string)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedShade, setSelectedShade] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">Product not found</p>
          <Button asChild>
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Product Images */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-secondary/20">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  {discount}% OFF
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedImage === index ? "border-primary shadow-md" : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <p className="text-muted-foreground text-sm lg:text-base">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{product.name}</h1>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 lg:h-5 lg:w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-sm lg:text-base">{product.rating}</span>
                <span className="text-muted-foreground text-sm lg:text-base">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl lg:text-3xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg lg:text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">{product.description}</p>

            {/* Shade Selection */}
            {product.shades && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {product.category === "tools" ? "Included Items" : "Shade"}
                </Label>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <Button
                      key={shade}
                      variant={selectedShade === shade ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedShade(shade)}
                      className="text-xs lg:text-sm"
                    >
                      {shade}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount || !product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-4">
                  {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!product.inStock || (product.shades && !selectedShade)}
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-4 bg-transparent"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                    <div>
                      <p className="font-medium text-xs lg:text-sm">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                    <div>
                      <p className="font-medium text-xs lg:text-sm">Authentic Products</p>
                      <p className="text-xs text-muted-foreground">100% genuine</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <RotateCcw className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                    <div>
                      <p className="font-medium text-xs lg:text-sm">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">30-day policy</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Product Information Tabs */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mt-12 lg:mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features" className="text-xs lg:text-sm">
                Features
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="text-xs lg:text-sm">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs lg:text-sm">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm lg:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">{product.ingredients}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-lg">{product.rating}</span>
                    </div>
                    <p className="text-muted-foreground">Based on {product.reviews} customer reviews</p>
                    <p className="text-sm text-muted-foreground">Detailed reviews coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
