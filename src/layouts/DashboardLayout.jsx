// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    { path: "/", label: "Обзор", icon: "📊" },
    { path: "/tasks", label: "Задачи", icon: "✔️" },
    { path: "/projects", label: "Проекты", icon: "📁" },
    { path: "/calendar", label: "Календарь", icon: "📅" },
    { path: "/reports", label: "Отчеты", icon: "📈" },
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Сайдбар */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out 
                   ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Логотип */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <span className="text-xl font-semibold">Task Manager</span>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            ✖️
          </button>
        </div>

        {/* Навигация */}
        <nav className="mt-4 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg hover:bg-gray-100
                         ${
                           isActivePath(item.path)
                             ? "bg-blue-50 text-blue-600"
                             : ""
                         }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Основной контент */}
      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Верхняя панель */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              ☰
            </button>

            {/* Профиль пользователя */}
            <div className="flex items-center space-x-4 ml-auto">
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user?.name?.[0] || "U"}
                  </div>
                  <span>{user?.name || "Пользователь"}</span>
                </button>

                {/* Выпадающее меню профиля */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Профиль
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Настройки
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Основной контент страницы */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Оверлей для мобильного сайдбара */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
