import { NextResponse } from "next/server";
import { Product } from "@/types";

const products: Product[] = [
  {
    id: 1,
    name: "FlowPod Pro",
    description: "Wireless earbuds with premium sound quality",
    price: 299,
    category: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.8,
  },
  {
    id: 2,
    name: "FlowWatch X",
    description: "Smartwatch with advanced health tracking",
    price: 499,
    category: "wearable",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.9,
  },
  {
    id: 3,
    name: "FlowBook Air",
    description: "Ultra-thin laptop with powerful performance",
    price: 1299,
    category: "computing",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    rating: 4.7,
  },
  {
    id: 4,
    name: "FlowSpeaker Mini",
    description: "Portable speaker with 360° sound",
    price: 199,
    category: "audio",
    image: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400",
    rating: 4.6,
  },
  {
    id: 5,
    name: "FlowCharge Pro",
    description: "Fast wireless charger with stand",
    price: 79,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    rating: 4.5,
  },
  {
    id: 6,
    name: "FlowKeyboard",
    description: "Mechanical keyboard with backlighting",
    price: 149,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
    rating: 4.8,
  },
];

export async function GET() {
  return NextResponse.json(products);
}
