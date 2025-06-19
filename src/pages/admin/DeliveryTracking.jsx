import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DeliveryTracking = () => {
  const [search, setSearch] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showTrackingMap, setShowTrackingMap] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const deliveries = [
    {
      id: 1,
      date: "2025-06-19",
      invoiceNumber: "INV001",
      name: "Arjun Kumar",
      email: "arjun@example.com",
      address: "123 Park Street, Chennai",
      location: "Chennai",
      contact: "9876543210",
      products: "Cotton Shirt x2",
      price: 3000,
      trackingId: "TRK001",
      courier: "APS Ranbir",
      lat: 13.0827,
      lng: 80.2707,
    },
    {
      id: 2,
      date: "2025-06-19",
      invoiceNumber: "INV002",
      name: "Meena Rao",
      email: "meena@example.com",
      address: "56 Gandhi Rd, Coimbatore",
      location: "Coimbatore",
      contact: "9123456780",
      products: "Silk Saree x1",
      price: 4500,
      trackingId: "TRK002",
      courier: "APS Ranbir",
      lat: 11.0168,
      lng: 76.9558,
    },
  ];

  const filteredDeliveries = deliveries.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.trackingId.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen p-6 font-[Inter] text-sm">
      <h2 className="text-2xl font-bold text-green-800 mb-6">🚚 Delivery Tracking</h2>

      {/* Search */}
      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute top-2.5 left-3 text-green-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, invoice, or tracking ID"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto border bg-white shadow rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-100 text-green-900">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Tracking</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedDeliveries.map((d, index) => (
              <tr key={d.id} className="hover:bg-green-50">
                <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-3">{d.date}</td>
                <td className="px-4 py-3">{d.invoiceNumber}</td>
                <td className="px-4 py-3">{d.name}</td>
                <td className="px-4 py-3">{d.location}</td>
                <td className="px-4 py-3">{d.contact}</td>
                <td className="px-4 py-3">{d.products}</td>
                <td className="px-4 py-3">₹{d.price}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-green-600 underline hover:text-green-800"
                    onClick={() => {
                      setSelectedDelivery(d);
                      setShowTrackingMap(true);
                    }}
                  >
                    {d.trackingId}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedDelivery(d);
                      setShowDetailsModal(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-full ${
              currentPage === i + 1
                ? "bg-green-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedDelivery && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedDelivery(null);
                }}
                className="absolute top-3 right-4 text-red-600 text-xl"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4 text-green-700">Delivery Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <p><strong>Name:</strong> {selectedDelivery.name}</p>
                <p><strong>Email:</strong> {selectedDelivery.email}</p>
                <p><strong>Address:</strong> {selectedDelivery.address}</p>
                <p><strong>Location:</strong> {selectedDelivery.location}</p>
                <p><strong>Contact:</strong> {selectedDelivery.contact}</p>
                <p><strong>Courier:</strong> {selectedDelivery.courier}</p>
                <p><strong>Tracking ID:</strong> {selectedDelivery.trackingId}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Modal */}
      <AnimatePresence>
        {showTrackingMap && selectedDelivery && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => {
                  setShowTrackingMap(false);
                  setSelectedDelivery(null);
                }}
                className="absolute top-3 right-4 text-red-600 text-xl"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                Live Tracking - {selectedDelivery.trackingId}
              </h3>
              <iframe
                title="Tracking Map"
                width="100%"
                height="400"
                loading="lazy"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen
                src={`https://maps.google.com/maps?q=${selectedDelivery.lat},${selectedDelivery.lng}&z=15&output=embed`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliveryTracking;
