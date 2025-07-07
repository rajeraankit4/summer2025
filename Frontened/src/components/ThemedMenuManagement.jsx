import React from "react";
import { useAuth } from "../context/AuthContext";
import MenuManagement from "./MenuManagement";

const ThemedMenuManagement = () => {
  const { user } = useAuth();

  // Determine theme based on user role
  const getTheme = () => {
    if (user?.role === "canteenadmin") {
      return {
        primary: "purple",
        gradient: "from-purple-600 to-purple-700",
        hover: "hover:to-purple-800",
        focus: "focus:ring-purple-500 focus:border-purple-500",
        text: "text-purple-700",
        border: "border-purple-600",
        bg: "bg-purple-600",
      };
    } else if (user?.role === "messadmin") {
      return {
        primary: "green",
        gradient: "from-green-600 to-green-700",
        hover: "hover:to-green-800",
        focus: "focus:ring-green-500 focus:border-green-500",
        text: "text-green-700",
        border: "border-green-600",
        bg: "bg-green-600",
      };
    } else {
      // Default (SuperAdmin)
      return {
        primary: "orange",
        gradient: "from-orange-600 to-orange-700",
        hover: "hover:to-orange-800",
        focus: "focus:ring-orange-500 focus:border-orange-500",
        text: "text-orange-700",
        border: "border-orange-600",
        bg: "bg-orange-600",
      };
    }
  };

  const theme = getTheme();

  return (
    <div className="themed-menu-management" data-theme={theme.primary}>
      <style jsx>{`
        .themed-menu-management [data-theme="${theme.primary}"] .btn-primary {
          background: linear-gradient(to right, var(--tw-gradient-stops));
          --tw-gradient-from: ${theme.primary === "green"
            ? "#059669"
            : theme.primary === "purple"
            ? "#7c3aed"
            : "#ea580c"};
          --tw-gradient-to: ${theme.primary === "green"
            ? "#047857"
            : theme.primary === "purple"
            ? "#6d28d9"
            : "#c2410c"};
        }
        .themed-menu-management
          [data-theme="${theme.primary}"]
          .btn-primary:hover {
          --tw-gradient-to: ${theme.primary === "green"
            ? "#065f46"
            : theme.primary === "purple"
            ? "#581c87"
            : "#9a3412"};
        }
        .themed-menu-management
          [data-theme="${theme.primary}"]
          .focus-ring:focus {
          --tw-ring-color: ${theme.primary === "green"
            ? "#10b981"
            : theme.primary === "purple"
            ? "#8b5cf6"
            : "#f97316"};
          --tw-border-color: ${theme.primary === "green"
            ? "#10b981"
            : theme.primary === "purple"
            ? "#8b5cf6"
            : "#f97316"};
        }
        .themed-menu-management [data-theme="${theme.primary}"] .text-accent {
          color: ${theme.primary === "green"
            ? "#047857"
            : theme.primary === "purple"
            ? "#6d28d9"
            : "#c2410c"};
        }
        .themed-menu-management [data-theme="${theme.primary}"] .border-accent {
          border-color: ${theme.primary === "green"
            ? "#059669"
            : theme.primary === "purple"
            ? "#7c3aed"
            : "#ea580c"};
        }
      `}</style>
      <MenuManagement theme={theme} />
    </div>
  );
};

export default ThemedMenuManagement;
