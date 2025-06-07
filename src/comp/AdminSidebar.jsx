// AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bed,
  Users,
  FileWarning,
  IndianRupee,
  Zap,
  Utensils,
  ScrollText,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/AdminDashboard" },
  { label: "Mentor Requests", icon: Bed, to: "/mentor-request" },
  { label: "All Mentor", icon: Users, to: "/all-mentor" },
  // { label: "Complaints", icon: FileWarning, to: "/AdminComplaints" },
  { label: "Rent", icon: IndianRupee, to: "/RentManagementPage" },
  { label: "Utilities", icon: Zap, to: "/Utilities" },
  // { label: "Mess", icon: Utensils, to: "/Mess" },
  // { label: "Notices", icon: ScrollText, to: "/Notices" },
  { label: "Settings", icon: Settings, to: "/Settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="h-full w-72 bg-white border-r flex flex-col justify-between overflow-y-auto">
      {/* Top */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-6 border-t">
        <div className="flex items-center gap-3 mb-3">
          <UserCircle className="h-8 w-8 text-blue-600" />
          <div>
            <p className="font-semibold text-sm text-gray-800">Admin</p>
            <p className="text-xs text-gray-400">admin@hostel.com</p>
          </div>
        </div>
        <button
          onClick={() => alert("Logout logic here")}
          className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}