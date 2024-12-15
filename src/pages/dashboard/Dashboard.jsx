import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    tasks: {
      total: 24,
      completed: 12,
      inProgress: 8,
      pending: 4,
    },
    projects: {
      total: 5,
      active: 3,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  // Временные данные для демонстрации
  const recentTasks = [
    {
      id: 1,
      title: "Разработка API",
      status: "in_progress",
      priority: "high",
    },
    {
      id: 2,
      title: "Создание UI компонентов",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      title: "Тестирование",
      status: "completed",
      priority: "low",
    },
  ];

  const activeProjects = [
    {
      id: 1,
      name: "Веб-приложение",
      progress: 65,
      tasks: { completed: 13, total: 20 },
    },
    {
      id: 2,
      name: "Мобильное приложение",
      progress: 32,
      tasks: { completed: 8, total: 25 },
    },
  ];

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const renderStatCard = (title, value, subtitle) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-gray-500">{title}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );

  const renderTaskCard = (task) => {
    const statusColors = {
      completed: "bg-green-500",
      in_progress: "bg-blue-500",
      pending: "bg-yellow-500",
    };

    const priorityColors = {
      high: "text-red-600",
      medium: "text-yellow-600",
      low: "text-green-600",
    };

    return (
      <div
        key={task.id}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${statusColors[task.status]}`}
          />
          <span className="font-medium">{task.title}</span>
        </div>
        <span className={`text-sm ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    );
  };

  const renderProjectCard = (project) => (
    <div key={project.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">{project.name}</span>
        <span className="text-sm text-gray-500">
          {project.tasks.completed}/{project.tasks.total} задач
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Добро пожаловать, {user?.name || "Пользователь"}!
        </h1>
        <p className="text-gray-500 mt-1">Ваша сводка на сегодня</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {renderStatCard("Всего задач", stats.tasks.total)}
        {renderStatCard("Выполнено", stats.tasks.completed)}
        {renderStatCard("В работе", stats.tasks.inProgress)}
        {renderStatCard("В ожидании", stats.tasks.pending)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последние задачи */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Последние задачи</CardTitle>
            <button
              onClick={() => navigate("/tasks")}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Все задачи →
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">{recentTasks.map(renderTaskCard)}</div>
          </CardContent>
        </Card>

        {/* Активные проекты */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Активные проекты</CardTitle>
            <button
              onClick={() => navigate("/projects")}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Все проекты →
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeProjects.map(renderProjectCard)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/tasks/create")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2"
          >
            Новая задача
          </button>
          <button
            onClick={() => navigate("/projects/create")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       transition-colors focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-offset-2"
          >
            Новый проект
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
