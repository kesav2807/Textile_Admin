import React, { useState, useEffect } from "react";
import { Plus, X, Pencil, Eye } from "lucide-react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

export default function UploadProducts() {
   const [products, setProducts] = useState([
    {
      code: "M001",
      category: "Men",
      subCategory: "T-Shirt",
      productName: "Basic Tee",
      productType: "Cotton",
      price: "499.00",
      gst: "5%",
      postedOn: "2025-06-10",
      status: "Active",
      variants: [{ color: "#000000", size: "M", quantity: "20", images: [] }]
    },
    {
      code: "M002",
      category: "Men",
      subCategory: "Shirt",
      productName: "Checked Shirt",
      productType: "Casual",
      price: "899.00",
      gst: "12%",
      postedOn: "2025-06-11",
      status: "Inactive",
      variants: [{ color: "#123456", size: "L", quantity: "10", images: [] }]
    },
    {
      code: "W001",
      category: "Women",
      subCategory: "Top",
      productName: "Floral Top",
      productType: "Georgette",
      price: "799.00",
      gst: "5%",
      postedOn: "2025-06-12",
      status: "Out of Stock",
      variants: [{ color: "#ff69b4", size: "S", quantity: "0", images: [] }]
    },
    {
      code: "K001",
      category: "Kids",
      subCategory: "Shirt",
      productName: "Mini Shirt",
      productType: "Cotton",
      price: "399.00",
      gst: "5%",
      postedOn: "2025-06-13",
      status: "Active",
      variants: [{ color: "#ffa500", size: "XS", quantity: "15", images: [] }]
    },
    {
      code: "M003",
      category: "Men",
      subCategory: "Jeans",
      productName: "Slim Fit Jeans",
      productType: "Denim",
      price: "1499.00",
      gst: "18%",
      postedOn: "2025-06-13",
      status: "Active",
      variants: [{ color: "#2f4f4f", size: "32", quantity: "12", images: [] }]
    },
    {
      code: "W002",
      category: "Women",
      subCategory: "Kurti",
      productName: "Ethnic Kurti",
      productType: "Rayon",
      price: "999.00",
      gst: "5%",
      postedOn: "2025-06-14",
      status: "Inactive",
      variants: [{ color: "#8a2be2", size: "M", quantity: "5", images: [] }]
    },
    {
      code: "K002",
      category: "Kids",
      subCategory: "T-Shirt",
      productName: "Cartoon Tee",
      productType: "Polyester",
      price: "299.00",
      gst: "5%",
      postedOn: "2025-06-14",
      status: "Active",
      variants: [{ color: "#00ffff", size: "S", quantity: "20", images: [] }]
    },
    {
      code: "M004",
      category: "Men",
      subCategory: "Jacket",
      productName: "Winter Jacket",
      productType: "Wool",
      price: "1999.00",
      gst: "12%",
      postedOn: "2025-06-15",
      status: "Out of Stock",
      variants: [{ color: "#708090", size: "XL", quantity: "0", images: [] }]
    },
    {
      code: "W003",
      category: "Women",
      subCategory: "Leggings",
      productName: "Stretch Leggings",
      productType: "Spandex",
      price: "499.00",
      gst: "5%",
      postedOn: "2025-06-15",
      status: "Active",
      variants: [{ color: "#000000", size: "L", quantity: "25", images: [] }]
    },
    {
      code: "K003",
      category: "Kids",
      subCategory: "Frock",
      productName: "Fancy Frock",
      productType: "Cotton",
      price: "699.00",
      gst: "5%",
      postedOn: "2025-06-16",
      status: "Active",
      variants: [{ color: "#ffc0cb", size: "M", quantity: "18", images: [] }]
    },
    {
      code: "M005",
      category: "Men",
      subCategory: "Shorts",
      productName: "Sports Shorts",
      productType: "Dry-Fit",
      price: "599.00",
      gst: "5%",
      postedOn: "2025-06-16",
      status: "Inactive",
      variants: [{ color: "#228b22", size: "M", quantity: "10", images: [] }]
    },
    {
      code: "W004",
      category: "Women",
      subCategory: "Dress",
      productName: "Maxi Dress",
      productType: "Chiffon",
      price: "1299.00",
      gst: "12%",
      postedOn: "2025-06-17",
      status: "Active",
      variants: [{ color: "#ff6347", size: "S", quantity: "8", images: [] }]
    },
    {
      code: "K004",
      category: "Kids",
      subCategory: "Jeans",
      productName: "Toddler Jeans",
      productType: "Denim",
      price: "499.00",
      gst: "5%",
      postedOn: "2025-06-17",
      status: "Inactive",
      variants: [{ color: "#4682b4", size: "S", quantity: "6", images: [] }]
    },
    {
      code: "W005",
      category: "Women",
      subCategory: "Blazer",
      productName: "Formal Blazer",
      productType: "Wool Blend",
      price: "1599.00",
      gst: "18%",
      postedOn: "2025-06-18",
      status: "Active",
      variants: [{ color: "#6a5acd", size: "M", quantity: "7", images: [] }]
    },
    {
      code: "M006",
      category: "Men",
      subCategory: "Trousers",
      productName: "Formal Trousers",
      productType: "Polyester",
      price: "899.00",
      gst: "12%",
      postedOn: "2025-06-18",
      status: "Out of Stock",
      variants: [{ color: "#696969", size: "34", quantity: "0", images: [] }]
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("Active");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("view");
  const itemsPerPage = 5;

  const [productForm, setProductForm] = useState({
    code: "",
    category: "",
    subCategory: "",
    productName: "",
    productType: "",
    price: "",
    gst: "",
    variants: [{ color: "#800000", size: "S", quantity: "10", images: [] }]
  });

  const isFormValid = () => {
    if (!productForm.code || !productForm.category || !productForm.subCategory || !productForm.productName || !productForm.productType || isNaN(parseFloat(productForm.price)) || isNaN(parseFloat(productForm.gst))) {
      toast.error("Please fill out all fields correctly.");
      return false;
    }
    return true;
  };

  const handleAddVariant = () => {
    setProductForm(prev => ({
      ...prev,
      variants: [...prev.variants, { color: "#000000", size: "", quantity: "", images: [] }]
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...productForm.variants];
    updated[index][field] = value;
    setProductForm({ ...productForm, variants: updated });
  };

  const handleRemoveVariant = index => {
    const updated = productForm.variants.filter((_, i) => i !== index);
    setProductForm({ ...productForm, variants: updated });
  };

  useEffect(() => {
    if (selectedProduct && viewMode === "edit") {
      setProductForm({ ...selectedProduct });
    } else if (!selectedProduct) {
      setProductForm({
        code: "",
        category: "",
        subCategory: "",
        productName: "",
        productType: "",
        price: "",
        gst: "",
        variants: [{ color: "#800000", size: "S", quantity: "10", images: [] }]
      });
    }
  }, [selectedProduct, viewMode]);

  const filteredProducts = [...products]
    .filter(product => {
      const matchesStatus = product.status === filterStatus;
      const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        product.productName.toLowerCase().includes(search) ||
        product.code.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.subCategory.toLowerCase().includes(search) ||
        product.variants.some(v => v.size.toLowerCase().includes(search));
      return matchesStatus && matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));

  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-2xl shadow-md text-sm">
      <Toaster />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <button
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full shadow-sm"
          onClick={() => {
            setViewMode("add");
            setSelectedProduct(null);
            setShowForm(true);
          }}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-4">
        {["Active", "Inactive", "Out of Stock"].map(status => (
          <button
            key={status}
            onClick={() => {
              setFilterStatus(status);
              setCurrentPage(1);
            }}
            className={`pb-2 border-b-2 transition text-sm font-medium ${
              filterStatus === status ? "border-green-600 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Search product name, code, category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 w-80 text-sm"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="All">Category: All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Code</th>
              <th className="p-3">Category</th>
              <th className="p-3">Subcategory</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">GST</th>
              <th className="p-3">Posted</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="p-3">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td className="p-3">{p.code}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.subCategory}</td>
                <td className="p-3">{p.productName}</td>
                <td className="p-3">₹{p.price}</td>
                <td className="p-3">{p.gst}</td>
                <td className="p-3">{p.postedOn}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.status === "Active" ? "bg-green-100 text-green-800" :
                    p.status === "Inactive" ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"}`}>{p.status}</span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => { setSelectedProduct(p); setViewMode("edit"); setShowForm(true); }}>
                    <Pencil size={16} className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button onClick={() => { setSelectedProduct(p); setViewMode("view"); setShowForm(true); }}>
                    <Eye size={16} className="text-gray-500 hover:text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <ResponsivePagination
          current={currentPage}
          total={Math.ceil(filteredProducts.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal + Form code not shown for brevity */}

      
      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-700">
                  {viewMode === "view"
                    ? "View Product"
                    : selectedProduct
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>
                <button onClick={() => { setShowForm(false); setSelectedProduct(null); }} className="text-red-600">
                  <X size={24} />
                </button>
              </div>

              {/* View Mode */}
              {viewMode === "view" ? (
                <div className="space-y-2 text-sm max-h-[70vh] overflow-y-auto pr-2">
                  <div><strong>Code:</strong> {selectedProduct?.code}</div>
                  <div><strong>Category:</strong> {selectedProduct?.category}</div>
                  <div><strong>Subcategory:</strong> {selectedProduct?.subCategory}</div>
                  <div><strong>Product Name:</strong> {selectedProduct?.productName}</div>
                  <div><strong>Product Type:</strong> {selectedProduct?.productType}</div>
                  <div><strong>Price:</strong> ₹{selectedProduct?.price}</div>
                  <div><strong>GST:</strong> {selectedProduct?.gst}</div>
                  <div><strong>Status:</strong> {selectedProduct?.status}</div>
                  <div><strong>Posted On:</strong> {selectedProduct?.postedOn}</div>
                  <div><strong>Variants:</strong></div>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedProduct?.variants?.map((v, i) => (
                      <li key={i}>
                        <span className="inline-block w-3 h-3 rounded-full border mr-2" style={{ backgroundColor: v.color }}></span>
                        Size: {v.size}, Quantity: {v.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isFormValid()) return;

                    const updated = [...products];
                    if (selectedProduct) {
                      const idx = updated.findIndex(p => p.code === selectedProduct.code);
                      updated[idx] = {
                        ...productForm,
                        price: parseFloat(productForm.price).toFixed(2),
                        gst: parseFloat(productForm.gst).toFixed(2) + "%",
                        postedOn: selectedProduct.postedOn,
                        status: selectedProduct.status
                      };
                      toast.success("Product updated!");
                    } else {
                      updated.push({
                        ...productForm,
                        price: parseFloat(productForm.price).toFixed(2),
                        gst: parseFloat(productForm.gst).toFixed(2) + "%",
                        postedOn: new Date().toISOString().split("T")[0],
                        status: "Active"
                      });
                      toast.success("New product added!");
                    }

                    setProducts(updated);
                    setShowForm(false);
                    setSelectedProduct(null);
                  }}
                  className="grid grid-cols-2 gap-4 text-sm"
                >
                  <input className="border p-2 rounded" placeholder="Product Code" value={productForm.code} onChange={(e) => setProductForm({ ...productForm, code: e.target.value })} />
                  <select className="border p-2 rounded" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                    <option value="">Select Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                  <input className="border p-2 rounded" placeholder="Sub Category" value={productForm.subCategory} onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })} />
                  <input className="border p-2 rounded" placeholder="Product Name" value={productForm.productName} onChange={(e) => setProductForm({ ...productForm, productName: e.target.value })} />
                  <input className="border p-2 rounded" placeholder="Product Type" value={productForm.productType} onChange={(e) => setProductForm({ ...productForm, productType: e.target.value })} />
                  <input type="number" className="border p-2 rounded" placeholder="Price" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
                  <input type="number" className="border p-2 rounded" placeholder="GST (%)" value={productForm.gst} onChange={(e) => setProductForm({ ...productForm, gst: e.target.value })} />

                  <div className="col-span-2">
                    <label className="block font-semibold mb-1">Variants</label>
                    {productForm.variants.map((v, index) => (
                      <div key={index} className="flex gap-2 mb-2 items-center">
                        <input type="color" value={v.color} onChange={(e) => handleVariantChange(index, "color", e.target.value)} />
                        <input placeholder="Size" className="border p-2 rounded w-20" value={v.size} onChange={(e) => handleVariantChange(index, "size", e.target.value)} />
                        <input placeholder="Qty" type="number" className="border p-2 rounded w-20" value={v.quantity} onChange={(e) => handleVariantChange(index, "quantity", e.target.value)} />
                        <div className="relative w-16 h-16 border rounded bg-gray-100">
                          {v.images?.[0] ? (
                            <img src={URL.createObjectURL(v.images[0])} alt="variant" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-400 flex items-center justify-center h-full">No Image</span>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const updated = [...productForm.variants];
                              updated[index].images = [e.target.files[0]];
                              setProductForm({ ...productForm, variants: updated });
                            }}
                          />
                        </div>
                        <button type="button" onClick={() => handleRemoveVariant(index)} className="text-red-500 text-sm">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddVariant} className="text-green-600 text-sm">+ Add Variant</button>
                  </div>

                  <div className="col-span-2 flex justify-between pt-4">
                    <button type="button" onClick={() => { setShowForm(false); setSelectedProduct(null); }} className="text-red-600">Discard</button>
                    <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
                      {selectedProduct ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
