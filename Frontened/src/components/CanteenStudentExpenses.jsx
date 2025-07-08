import React, { useState } from "react";
import { Plus, Search, DollarSign, User, Receipt } from "lucide-react";

const CanteenStudentExpenses = () => {
  const [expenseData, setExpenseData] = useState({
    rollNo: "",
    amount: "",
    description: "",
  });

  const [recentExpenses, setRecentExpenses] = useState([
    {
      id: 1,
      rollNo: "22BCE1234",
      amount: 85,
      description: "Snacks and beverages",
      date: "2025-07-07",
    },
    {
      id: 2,
      rollNo: "22BCE5678",
      amount: 120,
      description: "Lunch combo meal",
      date: "2025-07-06",
    },
    {
      id: 3,
      rollNo: "22BCE9012",
      amount: 45,
      description: "Tea and samosa",
      date: "2025-07-06",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseData.rollNo || !expenseData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    // Add new expense to recent expenses (in real app, this would be API call)
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      amount: parseFloat(expenseData.amount),
      date: new Date().toISOString().split("T")[0], // Current date
    };

    setRecentExpenses((prev) => [newExpense, ...prev]);

    // Reset form
    setExpenseData({
      rollNo: "",
      amount: "",
      description: "",
    });
  };

  const filteredExpenses = recentExpenses.filter(
    (expense) =>
      expense.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Canteen Student Expenses
            </h1>
            <p className="text-gray-600">Manage and track canteen expenses</p>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Plus className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Canteen Expense
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Roll Number *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                name="rollNo"
                value={expenseData.rollNo}
                onChange={handleInputChange}
                placeholder="e.g., 22BCE1234"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Amount (₹) *
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="relative">
              <Receipt className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                name="description"
                value={expenseData.description}
                onChange={handleInputChange}
                placeholder="e.g., Snacks and beverages"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Add Canteen Expense
            </button>
          </div>
        </form>
      </div>

      {/* Recent Expenses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Canteen Expenses
            </h2>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by roll number or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold text-purple-600">
                        ₹{expense.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.description || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No canteen expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CanteenStudentExpenses;
