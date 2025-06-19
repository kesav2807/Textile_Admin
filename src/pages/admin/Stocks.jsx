import React, { useState } from "react";
import { Filter, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function App() {
  const initialStocks = Array.from({ length: 30 }, (_, i) => ({
    code: (i + 1).toString().padStart(3, "0"),
    category: ["Men", "Women"][i % 2],
    subCategory: ["T-shirt", "Shirt", "Saree", "Blouse", "Shorts"][i % 5],
    product: ["Formal Shirt", "Printed Polo", "Round Neck Blouse", "Shorts"][i % 4],
    updatedOn: "07/12/2023",
    quantity: 100 + i * 10,
  }));

  const [stocks, setStocks] = useState(initialStocks);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddMoreModal, setShowAddMoreModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [variants, setVariants] = useState([{ color: "", size: "", qty: "" }]);
  const [restockQty, setRestockQty] = useState("");

  const itemsPerPage = 10;

  const filteredStocks = stocks.filter((item) => {
    const nameMatch = item.product.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = categoryFilter === "All" || item.category === categoryFilter;
    return nameMatch && categoryMatch;
  });

  const currentStocks = filteredStocks.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const addVariant = () => setVariants([...variants, { color: "", size: "", qty: "" }]);

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen p-6 font-inter text-sm">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-green-900">📦 Inventory Management</h2>
        <p className="text-gray-500 mt-1">Track and manage your product stock effortlessly</p>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-center mb-6">
        <button className="flex items-center gap-2 text-sm text-green-700 border px-3 py-2 rounded hover:bg-green-50 transition">
          <Filter size={16} />
          Filters
        </button>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => setShowProductModal(true)}
          className="ml-auto bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-100 text-green-900">
            <tr>
              {["#", "Code", "Category", "Sub", "Product", "Updated", "Qty", "Action"].map((h, i) => (
                <th key={i} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentStocks.map((item, i) => (
              <tr key={i} className="hover:bg-green-50 transition">
                <td className="px-4 py-3">{(page - 1) * itemsPerPage + i + 1}</td>
                <td className="px-4 py-3">{item.code}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">{item.subCategory}</td>
                <td className="px-4 py-3">{item.product}</td>
                <td className="px-4 py-3">{item.updatedOn}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedStock(item);
                      setShowAddMoreModal(true);
                      setRestockQty("");
                    }}
                    className="text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-100"
                  >
                    Add More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}><ChevronLeft /></button>
        {Array.from({ length: Math.ceil(filteredStocks.length / itemsPerPage) }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded-full ${num === page ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
        <button onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(filteredStocks.length / itemsPerPage)))}><ChevronRight /></button>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white max-w-3xl w-full p-6 rounded-2xl relative shadow-xl animate-fadeIn border">
            <button
              className="absolute top-3 right-4 text-red-600 hover:scale-110"
              onClick={() => setShowProductModal(false)}
            >
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-green-800">🆕 Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Product Code" className="input-field" />
              <select className="input-field">
                <option>Mens</option>
                <option>Womens</option>
              </select>
              <input placeholder="Sub Category" className="input-field" />
              <input placeholder="Product Name" className="input-field" />
              <select className="input-field">
                <option>Western Wear</option>
              </select>
              <input placeholder="Price" className="input-field" />
              <input placeholder="GST" className="input-field" />
            </div>

            <div className="mt-5">
              <p className="font-semibold text-gray-700 mb-2">Variants</p>
              {variants.map((_, i) => (
                <div key={i} className="flex flex-wrap gap-2 mb-2 items-center">
                  <input type="color" className="w-10 h-10 border rounded-lg" />
                  <input placeholder="Size" className="input-field w-20" />
                  <input placeholder="Qty" type="number" className="input-field w-24" />
                  <input type="file" className="input-field" />
                </div>
              ))}
              <button onClick={addVariant} className="text-green-600 text-sm mt-1 hover:underline">+ Add Variant</button>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setShowProductModal(false)} className="text-red-500">Discard</button>
              <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* Add More Modal */}
      {showAddMoreModal && selectedStock && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white max-w-sm w-full p-6 rounded-xl shadow-xl relative animate-fadeIn">
            <button
              className="absolute top-3 right-4 text-red-600"
              onClick={() => setShowAddMoreModal(false)}
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-green-800">
              Restock: {selectedStock.product}
            </h3>
            <input
              type="number"
              placeholder="Enter Quantity"
              value={restockQty}
              onChange={(e) => setRestockQty(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowAddMoreModal(false)} className="text-red-500">Cancel</button>
              <button
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
                onClick={() => {
                  const updated = stocks.map((item) =>
                    item.code === selectedStock.code
                      ? { ...item, quantity: item.quantity + parseInt(restockQty || 0) }
                      : item
                  );
                  setStocks(updated);
                  setShowAddMoreModal(false);
                  setRestockQty("");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
