import { useState, useEffect } from "react";
import axiosClient from "../../util/axiosClient";
import { message } from "antd";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/products");
      const { status, message: msg, data } = response.data;
      if (status === 200) {
        setProducts(Array.isArray(data) ? data : []);
        // message.success(msg);
      } else {
        message.error(msg);
      }
    } catch (err) {
      setError(err);
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    setLoading(true);
    try {
      await axiosClient.post("/products", product);
      fetchProducts();
      message.success("Product added successfully");
    } catch (err) {
      setError(err);
      message.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, product) => {
    setLoading(true);
    try {
      await axiosClient.put(`/products/${id}`, product);
      fetchProducts();
      message.success("Product updated successfully");
    } catch (err) {
      setError(err);
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await axiosClient.delete(`/products/${id}`);
      fetchProducts();
      message.success("Product deleted successfully");
    } catch (err) {
      setError(err);
      message.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export default useProducts;
