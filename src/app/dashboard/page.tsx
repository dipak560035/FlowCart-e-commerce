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
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Eye,
  ThumbsUp,
  Clock
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const categoryData = [
  { name: "Electronics", value: 45, color: "#3b82f6" },
  { name: "Audio", value: 25, color: "#a855f7" },
  { name: "Accessories", value: 20, color: "#10b981" },
  { name: "Wearables", value: 10, color: "#f59e0b" }
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
    change: "+2.1%",
    isPositive: true,
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Stats cards animation
    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(0.8)"
      }
    );

    // Charts animation
    gsap.fromTo(
      chartsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      }
    );

    // Pie chart animation
    gsap.fromTo(pieChartRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3
      }
    );

    // Table animation
    gsap.fromTo(tableRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4
      }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Analytics Dashboard</span>
              </div>
              <h1 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold"
              >
                Analytics{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-gray-400 mt-2">Track your store's performance and growth</p>
            </div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <span>Back to Store</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-500`}>
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
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div ref={(el) => { chartsRef.current[0] = el; }} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
                  <p className="text-gray-400 text-sm mt-1">Monthly revenue performance</p>
                </div>
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">+18.5% vs last month</span>
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
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff"
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

            {/* Products Chart */}
            <div ref={(el) => { chartsRef.current[1] = el; }} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Top Products</h3>
                  <p className="text-gray-400 text-sm mt-1">Best selling products by units</p>
                </div>
                <div className="flex items-center gap-2 text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm font-medium">FlowCharge Pro leading</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                    <XAxis type="number" stroke="#666" />
                    <YAxis dataKey="name" type="category" stroke="#666" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff"
                      }}
                    />
                    <Bar dataKey="sales" fill="#a855f7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Third Row - Pie Chart */}
          <div ref={pieChartRef} className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Sales by Category</h3>
                  <p className="text-gray-400 text-sm mt-1">Product category distribution</p>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Electronics top</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        color: "#fff"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Quick Stats</h3>
                  <p className="text-gray-400 text-sm mt-1">Performance metrics</p>
                </div>
                <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Last 30 days</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="text-white font-semibold">3.24%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "3.24%" }} />
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Average Order Value</span>
                    <span className="text-white font-semibold">$287</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Customer Satisfaction</span>
                    <span className="text-white font-semibold">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div ref={tableRef} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <p className="text-gray-400 text-sm mt-1">Latest customer orders</p>
              </div>
              <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm font-medium">+12 new orders</span>
              </div>
            </div>
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
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300">
                      <td className="py-4 font-medium text-white">{order.id}</td>
                      <td className="py-4 text-gray-300">{order.customer}</td>
                      <td className="py-4 text-gray-300">{order.product}</td>
                      <td className="py-4 text-gray-500">{order.date}</td>
                      <td className="py-4 font-semibold text-white">{order.amount}</td>
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