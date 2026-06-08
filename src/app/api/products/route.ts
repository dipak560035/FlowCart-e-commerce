import { NextResponse } from "next/server";
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "FlowPod Pro",
    description: "Wireless earbuds with premium sound quality and active noise cancellation",
    price: 299,
    originalPrice: 399,
    category: "Audio",
    categorySlug: "audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
      "https://images.unsplash.com/photo-1545127398-14451a68331b?w=800",
    ],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.8,
    features: ["Active Noise Cancellation", "24h Battery Life", "Wireless Charging", "IPX4 Water Resistant"],
    onSale: true,
  },
  {
    id: 2,
    name: "FlowWatch X",
    description: "Smartwatch with advanced health tracking and premium design",
    price: 499,
    category: "Wearables",
    categorySlug: "wearables",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b?w=800",
    ],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.9,
    features: ["Heart Rate Monitor", "GPS", "Swim Proof", "Sleep Tracking"],
  },
  {
    id: 3,
    name: "FlowBook Air",
    description: "Ultra-thin laptop with powerful performance and all-day battery life",
    price: 1299,
    category: "Workspace",
    categorySlug: "workspace",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    ],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    rating: 4.7,
    features: ["13\" Retina Display", "18h Battery Life", "SSD Storage", "Backlit Keyboard"],
  },
  {
    id: 4,
    name: "FlowSpeaker Mini",
    description: "Portable speaker with 360° sound and deep bass",
    price: 199,
    originalPrice: 249,
    category: "Audio",
    categorySlug: "audio",
    images: [
      "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    ],
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400",
    rating: 4.6,
    features: ["360° Sound", "12h Battery", "Bluetooth 5.0", "Water Resistant"],
    onSale: true,
  },
  {
    id: 5,
    name: "FlowCharge Pro",
    description: "Fast wireless charger with stand and multi-device support",
    price: 79,
    category: "Accessories",
    categorySlug: "accessories",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
      "https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=800",
    ],
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    rating: 4.5,
    features: ["15W Fast Charge", "Stand Design", "Multi-Device", "Case Friendly"],
  },
  {
    id: 6,
    name: "FlowKeyboard",
    description: "Mechanical keyboard with RGB backlighting and ergonomic design",
    price: 149,
    category: "Workspace",
    categorySlug: "workspace",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
    ],
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    rating: 4.8,
    features: ["Mechanical Switches", "RGB Backlit", "Ergonomic", "Hot Swappable"],
  },
  {
    id: 7,
    name: "FlowPack Pro",
    description: "Premium travel backpack with smart organization and laptop compartment",
    price: 189,
    category: "Travel",
    categorySlug: "travel",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    ],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    rating: 4.7,
    features: ["Laptop Compartment", "Water Resistant", "Smart Organization", "Padded Straps"],
  },
  {
    id: 8,
    name: "FlowLamp Smart",
    description: "Smart lamp with adjustable brightness and color temperature",
    price: 129,
    category: "Home",
    categorySlug: "home",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
    ],
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    rating: 4.4,
    features: ["Smart Control", "Adjustable Color", "Timer", "Eye Protection"],
  },
  {
    id: 9,
    name: "FlowMouse Precision",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 89,
    originalPrice: 119,
    category: "Workspace",
    categorySlug: "workspace",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    ],
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    rating: 4.6,
    features: ["Ergonomic Design", "Wireless", "Precision Tracking", "Long Battery"],
    onSale: true,
  },
  {
    id: 10,
    name: "FlowGlass Polarized",
    description: "Premium polarized sunglasses with UV protection",
    price: 159,
    category: "Accessories",
    categorySlug: "accessories",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    ],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    rating: 4.5,
    features: ["Polarized Lenses", "UV400 Protection", "Lightweight", "Durable Frame"],
  },
  {
    id: 11,
    name: "FlowBottle Insulated",
    description: "Stainless steel insulated water bottle",
    price: 49,
    category: "Travel",
    categorySlug: "travel",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
      "https://images.unsplash.com/photo-1608042314453-ae33d56c3105?w=800",
    ],
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    rating: 4.7,
    features: ["24h Cold", "12h Hot", "Stainless Steel", "BPA Free"],
  },
  {
    id: 12,
    name: "FlowScale Smart",
    description: "Smart body scale with comprehensive health metrics",
    price: 99,
    category: "Home",
    categorySlug: "home",
    images: [
      "https://images.unsplash.com/photo-1576659519943-8d277e1a8d17?w=800",
      "https://images.unsplash.com/photo-1587315952527-1e972e06e376?w=800",
    ],
    image: "https://images.unsplash.com/photo-1576659519943-8d277e1a8d17?w=400",
    rating: 4.3,
    features: ["Body Composition", "App Sync", "Multiple Users", "LED Display"],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sale = searchParams.get("sale");
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");

  let filteredProducts = [...products];

  if (sale === "true") {
    filteredProducts = filteredProducts.filter((p) => p.onSale);
  }

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.categorySlug === category);
  }

  if (sort === "new") {
    filteredProducts = filteredProducts.reverse();
  } else if (sort === "popular") {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json(filteredProducts);
}
