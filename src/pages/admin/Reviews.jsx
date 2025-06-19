import React, { useState } from "react";
import { Star, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialReviews = [
  {
    id: 1,
    name: "John Doe",
    date: "1 day ago",
    rating: 4,
    total: 5,
    review: "Great product! Quality is excellent and delivery was on time.",
    status: "pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2 days ago",
    rating: 5,
    total: 5,
    review: "Absolutely love it. Will order again soon!",
    status: "pending",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    date: "3 days ago",
    rating: 3,
    total: 5,
    review: "Average experience. Packaging could be better.",
    status: "pending",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);

  const handleStatus = (id, status) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status } : review
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          🌟 Customer Feedback
        </h2>

        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 p-6 mb-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <User className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {review.name}
                    </h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mt-1 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    {[...Array(review.total - review.rating)].map((_, i) => (
                      <Star key={i + review.rating} size={16} stroke="currentColor" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {review.rating} / {review.total}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-2">
                    “{review.review}”
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 flex-wrap gap-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatus(review.id, "approved")}
                    disabled={review.status === "approved"}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg shadow-md transition ${
                      review.status === "approved"
                        ? "bg-green-200 text-green-800 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-500"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatus(review.id, "rejected")}
                    disabled={review.status === "rejected"}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg shadow-md transition ${
                      review.status === "rejected"
                        ? "bg-red-200 text-red-800 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-500"
                    }`}
                  >
                    Reject
                  </button>
                </div>

                {review.status !== "pending" && (
                  <div
                    className={`px-4 py-1 text-sm rounded-full font-semibold ${
                      review.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {review.status.charAt(0).toUpperCase() +
                      review.status.slice(1)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
