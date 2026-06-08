"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240, customers: 120 },
  { month: "Feb", revenue: 3000, orders: 139, customers: 98 },
  { month: "Mar", revenue: 5000, orders: 980, customers: 450 },
  { month: "Apr", revenue: 4780, orders: 390, customers: 200 },
  { month: "May", revenue: 5890, orders: 480, customers: 230 },
  { month: "Jun", revenue: 6390, orders: 380, customers: 190 }
];

const productData = [
  { name: "FlowPod Pro", sales: 450, revenue: 134550 },
  { name: "FlowWatch X", sales: 320, revenue: 159680 },
  { name: "FlowBook Air", sales: 180, revenue: 233820 },
  { name: "FlowSpeaker Mini", sales: 520, revenue: 103480 },
  { name: "FlowCharge Pro", sales: 680, revenue: 53720 }
];

const recentOrders = [
  { id: "#1001", customer: "John Doe", product: "FlowPod Pro", amount: "$299", status: "Delivered", date: "2024-01-15" },
  { id: "#1002", customer: "Jane Smith", product: "FlowWatch X", amount: "$499", status: "Shipped", date: "2024-01-14" },
  { id: "#1003", customer: "Mike Johnson", product: "FlowBook Air", amount: "$1299", status: "Processing", date: "2024-01-13" },
  { id: "#1004", customer: "Sarah Williams", product: "FlowSpeaker Mini", amount: "$199", status: "Delivered", date: "2024-01-12" },
  { id: "#1005", customer: "David Brown", product: "FlowKeyboard", amount: "$149", status: "Pending", date: "2024-01-11" }
];

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    isPositive: true,
    icon: ShoppingCart,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  },
  {
    title: "Total Customers",
    value: "856",
    change: "-2.1%",
    isPositive: false,
    icon: Users,
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  },
  {
    title: "Products Sold",
    value: "1,542",
    change: "+5.4%",
    isPositive: true,
    icon: Package,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20"
  }
];

export default function DashboardPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );

    gsap.fromTo(
      chartsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      tableRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400";
      case "Shipped":
        return "bg-blue-500/20 text-blue-400";
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">Dashboard</h1>
            <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2 transition">
              Back to Store
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center text-sm ${stat.isPositive ? "text-green-400" : "text-red-400"}`}>
                    {stat.isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div ref={(el) => { chartsRef.current[0] = el; }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Revenue Overview</h3>
                <div className="flex items-center gap-2 text-green-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+18.5% vs last month</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #333",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div ref={(el) => { chartsRef.current[1] = el; }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Top Products</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                    <XAxis type="number" stroke="#666" />
                    <YAxis dataKey="name" type="category" stroke="#666" width={120} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #333",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="sales" fill="#a855f7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div ref={tableRef} className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-4 font-medium">Order ID</th>
                    <th className="pb-4 font-medium">Customer</th>
                    <th className="pb-4 font-medium">Product</th>
                    <th className="pb-4 font-medium">Date</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-4 font-medium">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4">{order.product}</td>
                      <td className="py-4 text-gray-400">{order.date}</td>
                      <td className="py-4 font-semibold">{order.amount}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
