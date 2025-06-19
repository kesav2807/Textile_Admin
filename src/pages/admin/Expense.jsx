import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Search, PlusCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Validation schema
const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub Category is required"),
  description: yup.string().required("Description is required"),
  amount: yup.number().positive().required("Amount is required"),
});

const Expense = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Paid");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2025-05-24",
      category: "Transport",
      subCategory: "Fuel",
      description: "Diesel for delivery van",
      amount: 1500,
      status: "Paid",
    },
    {
      id: 2,
      date: "2025-05-25",
      category: "Utility",
      subCategory: "Electricity",
      description: "Factory bill",
      amount: 3000,
      status: "Unpaid",
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.category.toLowerCase().includes(search.toLowerCase()) ||
      expense.description.toLowerCase().includes(search.toLowerCase())
  );

  const paidAmount = expenses
    .filter((e) => e.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const unpaidAmount = expenses
    .filter((e) => e.status === "Unpaid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalAmount = paidAmount + unpaidAmount;

  const onSubmit = (data) => {
    const newExpense = {
      id: expenses.length + 1,
      ...data,
      amount: Number(data.amount),
      status,
    };
    setExpenses([...expenses, newExpense]);
    setShowModal(false);
    reset();
    setStatus("Paid");
  };

  const handlePrint = () => window.print();

  const handleSave = () => {
    const json = JSON.stringify(expenses, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "expenses.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700"> Expenses Manager</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 shadow-md"
        >
          <PlusCircle size={20} />
          Add Expense
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="date"
          className="border border-green-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
        />
        <span className="text-green-600 font-semibold">to</span>
        <input
          type="date"
          className="border border-green-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
        />
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-green-500" size={20} />
          <input
            type="text"
            placeholder="Search expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 px-6 py-4 rounded-md text-green-700 shadow-sm font-medium">
           Paid: ₹{paidAmount}
        </div>
        <div className="bg-red-100 px-6 py-4 rounded-md text-red-700 shadow-sm font-medium">
           Unpaid: ₹{unpaidAmount}
        </div>
        <div className="bg-gray-100 px-6 py-4 rounded-md text-gray-800 shadow-sm font-medium">
           Total: ₹{totalAmount}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Sub Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e, i) => (
              <tr key={e.id} className="border-b hover:bg-green-50 transition">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">{e.date}</td>
                <td className="py-2 px-4">{e.category}</td>
                <td className="py-2 px-4">{e.subCategory}</td>
                <td className="py-2 px-4">{e.description}</td>
                <td className="py-2 px-4">₹{e.amount}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      e.status === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition shadow-md"
        >
          Print
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition shadow-md"
        >
          Save
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-green-700">Add Expense</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">
                <input
                  type="date"
                  {...register("date")}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <p className="text-red-500">{errors.date?.message}</p>

                <input
                  type="text"
                  placeholder="Category"
                  {...register("category")}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <p className="text-red-500">{errors.category?.message}</p>

                <input
                  type="text"
                  placeholder="Sub Category"
                  {...register("subCategory")}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <p className="text-red-500">{errors.subCategory?.message}</p>

                <textarea
                  placeholder="Description"
                  {...register("description")}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <p className="text-red-500">{errors.description?.message}</p>

                <input
                  type="number"
                  placeholder="Amount"
                  {...register("amount")}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <p className="text-red-500">{errors.amount?.message}</p>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={status === "Paid"}
                    onChange={() => setStatus(status === "Paid" ? "Unpaid" : "Paid")}
                    className="accent-green-600"
                  />
                  <span className={`font-medium ${status === "Paid" ? "text-green-600" : "text-red-600"}`}>
                    {status}
                  </span>
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Expense;
