import React, { useState } from 'react';
import { Eye, Printer } from 'lucide-react';

export default function Orders() {
  const mockOrders = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    date: '23/06/2025',
    name: ['Ramesh', 'Ajith', 'Suresh', 'Kumar', 'Deepak', 'Anita', 'Priya', 'Mohan', 'Lokesh', 'Naveen'][i % 10],
    location: ['Coimbatore', 'Chennai', 'Madurai', 'Salem', 'Tirunelveli'][i % 5],
    contact: `99999 88${(100 + i).toString().padStart(3, '0')}`,
    status: ['Pending', 'Dispatched', 'Cancelled'][i % 3],
    category: ['Men', 'Women'],
    subCategory: ['Shirt', 'Saree'],
    products: [`Product ${i + 1}`],
    quantity: [Math.floor(Math.random() * 5) + 1],
    price: [Math.floor(Math.random() * 200) + 100],
  }));

  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  const filteredOrders = mockOrders.filter(order =>
    order.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => window.print();

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen p-6 font-inter text-sm">
      <h2 className="text-2xl font-bold text-green-800 mb-6">📦 Orders Dashboard</h2>

      {/* Search + Filter */}
      <div className="bg-white shadow p-4 rounded-lg mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by customer name..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-auto border bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-left text-sm text-gray-800">
          <thead className="bg-green-100 text-green-800 font-medium">
            <tr>
              {['#', 'Date', 'Name', 'Location', 'Contact', 'Category', 'Subcategory', 'Product', 'Qty', 'Price', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`even:bg-gray-50 hover:bg-green-50 cursor-pointer ${
                  selectedOrder?.id === order.id ? "bg-green-100" : ""
                }`}
                onClick={() => {
                  setSelectedOrder(order);
                  setShowInvoice(false);
                }}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.name}</td>
                <td className="px-4 py-2">{order.location}</td>
                <td className="px-4 py-2">{order.contact}</td>
                <td className="px-4 py-2">{order.category.join(', ')}</td>
                <td className="px-4 py-2">{order.subCategory.join(', ')}</td>
                <td className="px-4 py-2">{order.products.join(', ')}</td>
                <td className="px-4 py-2">{order.quantity.reduce((a, b) => a + b)}</td>
                <td className="px-4 py-2">₹{order.price.reduce((a, b) => a + b)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'Dispatched' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-600"
              onClick={() => {
                setSelectedOrder(null);
                setShowInvoice(false);
              }}
            >
              &times;
            </button>

            {showInvoice ? (
              <>
                {/* Invoice View */}
                <div className="flex justify-between border-b pb-2 mb-4 text-sm">
                  <div>
                    <h2 className="text-lg font-bold">🧾 Invoice #62786457345</h2>
                    <p>Company: <strong>Shree Clothings</strong></p>
                    <p>Date: {selectedOrder.date}</p>
                    <p>Email: sutharaniseets@gmail.com</p>
                  </div>
                  <div className="text-right">
                    <p>Customer: <strong>{selectedOrder.name}</strong></p>
                    <p>Contact: {selectedOrder.contact}</p>
                    <p>Email: {selectedOrder.name.toLowerCase()}@gmail.com</p>
                    <p>Address: XYZ Street, {selectedOrder.location}, TN</p>
                  </div>
                </div>

                <table className="w-full text-xs mb-4 border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Category</th>
                      <th className="p-2 border">Sub Category</th>
                      <th className="p-2 border">Product</th>
                      <th className="p-2 border">Qty</th>
                      <th className="p-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((prod, i) => (
                      <tr key={i}>
                        <td className="p-2 border">{i + 1}</td>
                        <td className="p-2 border">{selectedOrder.category[i % selectedOrder.category.length]}</td>
                        <td className="p-2 border">{selectedOrder.subCategory[i % selectedOrder.subCategory.length]}</td>
                        <td className="p-2 border">{prod}</td>
                        <td className="p-2 border">{selectedOrder.quantity[i]}</td>
                        <td className="p-2 border">₹{selectedOrder.price[i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right text-sm space-y-1">
                  <p>Subtotal: ₹{selectedOrder.price.reduce((a, b) => a + b)}</p>
                  <p>GST (10%): ₹{(selectedOrder.price.reduce((a, b) => a + b) * 0.1).toFixed(2)}</p>
                  <p className="font-bold text-lg">Total: ₹{(selectedOrder.price.reduce((a, b) => a + b) * 1.1).toFixed(2)}</p>
                </div>

                <div className="text-right mt-6">
                  <button
                    onClick={handlePrint}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                  >
                    <Printer size={16} className="inline-block mr-2" />
                    Print Invoice
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Order Details View */}
                <h3 className="text-xl font-semibold mb-4">👤 Customer & Order Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                  <p><strong>Name:</strong> {selectedOrder.name}</p>
                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Contact:</strong> {selectedOrder.contact}</p>
                  <p><strong>Email:</strong> {selectedOrder.name.toLowerCase()}@gmail.com</p>
                  <p className="sm:col-span-2"><strong>Address:</strong> XYZ Street, {selectedOrder.location}, TN</p>
                </div>

                <table className="w-full text-xs border mb-4">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border">Category</th>
                      <th className="p-2 border">Sub Category</th>
                      <th className="p-2 border">Product</th>
                      <th className="p-2 border">Qty</th>
                      <th className="p-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((prod, i) => (
                      <tr key={i}>
                        <td className="p-2 border">{i + 1}</td>
                        <td className="p-2 border">{selectedOrder.category[i % selectedOrder.category.length]}</td>
                        <td className="p-2 border">{selectedOrder.subCategory[i % selectedOrder.subCategory.length]}</td>
                        <td className="p-2 border">{prod}</td>
                        <td className="p-2 border">{selectedOrder.quantity[i]}</td>
                        <td className="p-2 border">₹{selectedOrder.price[i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right text-sm space-y-1">
                  <p>Subtotal: ₹{selectedOrder.price.reduce((a, b) => a + b)}</p>
                  <p>GST (10%): ₹{(selectedOrder.price.reduce((a, b) => a + b) * 0.1).toFixed(2)}</p>
                  <p className="font-bold">Total: ₹{(selectedOrder.price.reduce((a, b) => a + b) * 1.1).toFixed(2)}</p>
                </div>

                <div className="text-right mt-6">
                  <button
                    onClick={() => setShowInvoice(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    <Eye size={16} className="inline-block mr-2" />
                    Generate Invoice
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
