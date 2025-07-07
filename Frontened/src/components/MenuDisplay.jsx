import React, { useState, useEffect } from "react";
import { getWeeklyMenu } from "../api/menuApi";

const MenuDisplay = () => {
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await getWeeklyMenu();
        if (response.success) {
          setWeeklyMenu(response.data);
        } else {
          setError("Failed to fetch menu data");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const getMenuForDay = (day) => {
    return weeklyMenu.find((menu) => menu.day === day);
  };

  const getMealColor = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return "border-blue-500";
      case "lunch":
        return "border-green-500";
      case "dinner":
        return "border-purple-500";
      default:
        return "border-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📅 Current Week Menu
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📅 Current Week Menu
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📅 Current Week Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => {
          const dayMenu = getMenuForDay(day);

          return (
            <div key={day} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {day}
              </h3>

              {dayMenu ? (
                <div className="space-y-3">
                  {dayMenu.meals.map((meal, index) => (
                    <div
                      key={index}
                      className={`border-l-4 ${getMealColor(meal.type)} pl-3`}
                    >
                      <p className="font-medium text-sm text-gray-600 capitalize">
                        {meal.type}
                      </p>
                      <p className="text-sm text-gray-800">
                        {meal.items.join(", ")}
                      </p>
                      {meal.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {meal.description}
                        </p>
                      )}
                      <div className="flex gap-3 mt-1">
                        {meal.calories && (
                          <p className="text-xs text-blue-600">
                            {meal.calories} cal
                          </p>
                        )}
                        {meal.price && (
                          <p className="text-xs text-green-600">
                            ₹{meal.price}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No menu available</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Menu will be updated soon
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuDisplay;
