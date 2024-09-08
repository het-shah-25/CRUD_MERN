import React, { useState } from "react";
import { message, Modal } from "antd";
import Button from "../../components/core/button/Button";
import Table from "../../components/core/table/Table";
import CreateModal from "../../components/core/modal/CreateModal";
import EditModal from "../../components/core/editmodal/EditModal";
import useProducts from "../../app/hook/useProducts";

const columns = (handleEdit, handleDelete) => [
  {
    title: "Image",
    key: "img",
    render: (text, record) => (
      <img src={record.img} alt="Product" className="w-16 h-16 object-cover" />
    ),
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "Price",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Quantity",
    key: "qty",
    dataIndex: "qty",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => (
      <div className="flex space-x-2">
        <Button
          onClick={() => handleEdit(record)}
          backgroundColor="#4caf50"
          fontColor="white"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(record._id)} // Make sure you pass the correct ID
          backgroundColor="#E3291D"
          fontColor="white"
        >
          Delete
        </Button>
      </div>
    ),
  },
];

const ProductPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    img: "",
    qty: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (
      formData.name &&
      formData.price &&
      formData.category &&
      formData.img &&
      formData.qty
    ) {
      if (editingProductId) {
        console.log("Updating product with ID:", editingProductId);
        console.log("Form data:", formData);
        updateProduct(editingProductId, formData)
          .then(() => {
            // message.success("Product updated successfully");
            setIsEditModalOpen(false);
            resetForm();
          })
          .catch((error) => {
            message.error("Failed to update product");
            console.error(error);
          });
      } else {
        addProduct(formData)
          .then(() => {
            // message.success("Product added successfully");
            setIsCreateModalOpen(false);
            resetForm();
          })
          .catch((error) => {
            message.error("Failed to add product");
            console.error(error);
          });
      }
    } else {
      message.error("Please fill in all fields.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      img: product.img,
      qty: product.qty,
    });
    setEditingProductId(product._id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!id) {
      message.error("No product ID provided.");
      return;
    }
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: () => {
        deleteProduct(id)
          .then(() => {
            // message.success("Product deleted successfully");
          })
          .catch((error) => {
            message.error("Failed to delete product");
            console.error(error);
          });
      },
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      img: "",
      qty: "",
    });
    setEditingProductId(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            setIsCreateModalOpen(true);
            resetForm(); // Ensure we're adding, not editing
          }}
          backgroundColor="#007bff"
          fontColor="#fff"
        >
          Add Product
        </Button>
      </div>
      <Table
        dataSource={Array.isArray(products) ? products : []}
        columns={columns(handleEdit, handleDelete)}
      />
      {isCreateModalOpen && (
        <CreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
          <form>
            {/* Form Fields */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </form>
        </CreateModal>
      )}
      {isEditModalOpen && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
          <form>
            {/* Form Fields */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </form>
        </EditModal>
      )}
    </div>
  );
};

export default ProductPage;
