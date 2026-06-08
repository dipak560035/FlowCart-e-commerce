import { NextResponse } from "next/server";
import { Category } from "@/types";

const categories: Category[] = [
  {
    id: 1,
    name: "Audio",
    slug: "audio",
    icon: "🎧",
    description: "Premium audio devices for music lovers",
  },
  {
    id: 2,
    name: "Workspace",
    slug: "workspace",
    icon: "💻",
    description: "Upgrade your work-from-home setup",
  },
  {
    id: 3,
    name: "Travel",
    slug: "travel",
    icon: "✈️",
    description: "Essential travel accessories",
  },
  {
    id: 4,
    name: "Wearables",
    slug: "wearables",
    icon: "⌚",
    description: "Smart wearables for your lifestyle",
  },
  {
    id: 5,
    name: "Home",
    slug: "home",
    icon: "🏠",
    description: "Smart home devices and accessories",
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    icon: "⌨️",
    description: "Essential tech accessories",
  },
];

export async function GET() {
  return NextResponse.json(categories);
}
