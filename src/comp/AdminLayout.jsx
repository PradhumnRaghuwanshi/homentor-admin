import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full w-72 bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="md:hidden flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold text-blue-700">Admin Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <AdminSidebar />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar on small screen */}
        <div className="md:hidden p-4 flex items-center justify-between border-b bg-white">
          <h1 className="text-xl font-bold text-blue-700">{title}</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-blue-700" />
          </button>
        </div>

        {/* Title on large screen */}
        <div className="hidden md:block px-6 pt-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">{title}</h1>
        </div>

        {/* Page Content - remove hover animation that causes flicker */}
        <main className="bg-gradient-to-br from-white via-slate-100 to-blue-50 px-4 sm:px-6 md:px-6 lg:px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
