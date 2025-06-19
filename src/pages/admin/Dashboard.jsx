import React from "react";
import {
  Shirt,
  ShoppingBag,
  Baby,
  Package,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const handleViewAll = (section) => {
    alert(`Viewing all ${section}`);
  };

  const pieData = [
    { name: "Mens", value: 12000, color: "#0f766e" },
    { name: "Womens", value: 15000, color: "#16a34a" },
    { name: "Kids", value: 10000, color: "#0369a1" },
    { name: "Accessories", value: 9500, color: "#7c3aed" },
  ];

  const salesData = [
    { name: "Mon", sales: 200 },
    { name: "Tue", sales: 180 },
    { name: "Wed", sales: 300 },
    { name: "Thu", sales: 250 },
    { name: "Fri", sales: 270 },
    { name: "Sat", sales: 120 },
    { name: "Sun", sales: 260 },
  ];

  const stats = [
    { icon: <Shirt />, label: "Mens", count: 500 },
    { icon: <ShoppingBag />, label: "Womens", count: 660 },
    { icon: <Baby />, label: "Kids", count: 400 },
    { icon: <Package />, label: "Accessories", count: 250 },
  ];

  const orders = [
    { name: "Allu", location: "Coimbatore", mobile: "93452 67521", product: "Shirt" },
    { name: "Karthik", location: "Tirunelveli", mobile: "93822 72231", product: "Pants" },
    { name: "Keerthana", location: "Chennai", mobile: "76424 56782", product: "Tops" },
    { name: "KAvin", location: "Chennai", mobile: "43230 22331", product: "Saree" },
    { name: "Abrana", location: "Madurai", mobile: "93357 64231", product: "Kurti" },
  ];

  const lowStock = [
    { code: "26707", product: "Saree", quantity: 10 },
    { code: "26708", product: "T-shirt", quantity: 9 },
    { code: "26709", product: "Hand kerchief", quantity: 7 },
    { code: "26710", product: "Nighty", quantity: 11 },
  ];

  const expenses = [
    { date: "19/06/2025", category: "Plumbing", sub: "Taps, Pipes", amount: 3500, status: "Unpaid" },
    { date: "20/06/2025", category: "Painting", sub: "Brush", amount: 2540, status: "Unpaid" },
    { date: "21/06/2025", category: "Carpentry", sub: "Wood", amount: 1250, status: "Unpaid" },
    { date: "22/06/2025", category: "Transport", sub: "Diesel", amount: 1120, status: "Paid" },
    { date: "23/06/2025", category: "Electrical", sub: "Wires", amount: 1500, status: "Paid" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl p-4 flex items-center justify-between border border-gray-100"
          >
            <div className="text-green-600">{item.icon}</div>
            <div className="text-right">
              <div className="text-2xl font-semibold">{item.count}</div>
              <div className="text-gray-500 text-sm">{item.label}</div>
            </div>
          </div>
        ))}
      </div>


      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Sales Graph</h3>
            <select className="border text-sm rounded px-2 py-1 outline-none">
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

  
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <select className="border text-sm rounded px-2 py-1 outline-none">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={70}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {pieData.map((item, i) => (
              <span key={i} className="flex items-center text-sm gap-1">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>


      <div className="grid md:grid-cols-2 gap-4">
     
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Orders</h3>
            <button
              onClick={() => handleViewAll("Orders")}
              className="flex items-center gap-1 text-blue-600 hover:underline focus:outline-none"
            >
              View All <ArrowRight size={16} />
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Mobile</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="hover:bg-gray-50 border-b cursor-pointer">
                  <td>{i + 1}</td>
                  <td>{o.name}</td>
                  <td>{o.location}</td>
                  <td>{o.mobile}</td>
                  <td>{o.product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg mb-2">Low Stock</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th>Code</th>
                <th>Product</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 border-b">
                  <td>{item.code}</td>
                  <td>{item.product}</td>
                  <td className="text-red-600 font-semibold">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Expense</h3>
          <button
            onClick={() => handleViewAll("Expenses")}
            className="flex items-center gap-1 text-blue-600 hover:underline focus:outline-none"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th>#</th>
              <th>Date</th>
              <th>Category</th>
              <th>Sub</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td>{i + 1}</td>
                <td>{exp.date}</td>
                <td>{exp.category}</td>
                <td>{exp.sub}</td>
                <td>₹{exp.amount}</td>
                <td>
                  {exp.status === "Paid" ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle size={16} /> Paid
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <XCircle size={16} /> Unpaid
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
