import React, { useState } from "react";
import { Plus, UploadCloud, X } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    category: "Men",
    heading: "BUY 1 GET 1 FREE",
    content: "Latest trends in men's fashion.",
    image: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2021/2/22/4b658e9e-c00a-4e73-be64-07a04998e1571613986993338-BBF_SIS_02.jpg",
  },
  {
    id: 2,
    category: "Men",
    heading: "50% TO 90%",
    content: "Comfort and style combined.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rlwj6k8Jce8AhCx2uJtvVOvVmKgw5h0xACtLwORJ-Vvk6Z-4H0gfdNdoxwJOVzcrzJo&usqp=CAU",
  },
];

const Advertisement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    category: "",
    heading: "",
    content: "",
    image: null,
    imagePreview: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setNewProduct((prev) => ({
        ...prev,
        image: file,
        imagePreview: preview,
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddOrUpdate = () => {
    const { category, heading, content, imagePreview } = newProduct;
    if (!category || !heading || !content || !imagePreview) {
      return alert("Please fill all fields and upload an image.");
    }

    const productData = {
      ...newProduct,
      id: editingProduct ? editingProduct.id : products.length + 1,
      image: imagePreview,
    };

    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? productData : p)));
    } else {
      setProducts((prev) => [...prev, productData]);
    }

    setNewProduct({ category: "", heading: "", content: "", image: null, imagePreview: "" });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      category: product.category,
      heading: product.heading,
      content: product.content,
      image: null,
      imagePreview: product.image,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-[#f7fafc] to-[#e2f0ff] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-green-900 tracking-tight">🧢 Ads Management</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingProduct(null);
              setNewProduct({ category: "", heading: "", content: "", image: null, imagePreview: "" });
            }}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Plus size={20} /> New Ad
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.heading}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{product.heading}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.content}</p>
                <span className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                  #{product.id} • {product.category}
                </span>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-fade-in border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-700">
                {editingProduct ? "Edit Advertisement" : "Create Advertisement"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-red-600 hover:text-red-800">
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="heading"
                value={newProduct.heading}
                onChange={handleInputChange}
                placeholder="Heading"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="content"
                value={newProduct.content}
                onChange={handleInputChange}
                placeholder="Short description"
                rows={4}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full"
              />
              {newProduct.imagePreview && (
                <img
                  src={newProduct.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border mt-2"
                />
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl flex items-center gap-2"
              >
                <UploadCloud size={20} /> {editingProduct ? "Update" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;
