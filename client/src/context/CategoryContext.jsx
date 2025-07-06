import React, { createContext, useState } from "react";
import { categoryService } from "../services/api";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data.categories || data); // handle both array and {categories: []}
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories((prev) => [newCategory, ...prev]);
      return newCategory;
    } catch (err) {
      setError(err.message || "Failed to create category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, loading, error, fetchCategories, createCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}; 