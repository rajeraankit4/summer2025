import api from "./axiosConfig";

// Get weekly menu
export const getWeeklyMenu = async () => {
  try {
    const response = await api.get("/menu/weekly");
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly menu:", error);
    throw error;
  }
};

// Get menu for specific day
export const getDayMenu = async (day) => {
  try {
    const response = await api.get(`/menu/day/${day}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu for ${day}:`, error);
    throw error;
  }
};

// Create new menu (Admin only)
export const createMenu = async (menuData) => {
  try {
    const response = await api.post("/menu", menuData);
    return response.data;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
};

// Update existing menu (Admin only)
export const updateMenu = async (id, menuData) => {
  try {
    const response = await api.put(`/api/menu/${id}`, menuData);
    return response.data;
  } catch (error) {
    console.error("Error updating menu:", error);
    throw error;
  }
};

// Delete menu (Admin only)
export const deleteMenu = async (id) => {
  try {
    const response = await api.delete(`/api/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

// Get all menus with pagination (Admin only)
export const getAllMenus = async (params = {}) => {
  try {
    const response = await api.get("/api/menu/all", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching all menus:", error);
    throw error;
  }
};
