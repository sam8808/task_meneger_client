import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import ProjectForm from "../../components/projects/ProjectForm";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("grid"); // 'grid' или 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProjects();
  }, []);

  // Имитация загрузки проектов
  const fetchProjects = async () => {
    try {
      // TODO: Заменить на реальный API-запрос
      const mockProjects = [
        {
          id: 1,
          name: "Веб-приложение",
          description: "Разработка нового веб-приложения",
          status: "in_progress",
          progress: 65,
          tasksCount: 24,
          completedTasks: 16,
          members: 8,
          dueDate: "2024-06-30",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Мобильное приложение",
          description: "Разработка мобильного приложения для iOS и Android",
          status: "planning",
          progress: 25,
          tasksCount: 18,
          completedTasks: 4,
          members: 6,
          dueDate: "2024-08-15",
          createdAt: "2024-02-01",
        },
        // Добавьте больше проектов для тестирования
      ];

      setProjects(mockProjects);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-500",
      in_progress: "bg-blue-500",
      planning: "bg-yellow-500",
      delayed: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getStatusText = (status) => {
    const statusText = {
      completed: "Завершен",
      in_progress: "В работе",
      planning: "Планирование",
      delayed: "Отложен",
    };
    return statusText[status] || status;
  };

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.name.localeCompare(b.name);
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <Card
          key={project.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    project.status
                  )} text-white`}
                >
                  {getStatusText(project.status)}
                </div>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Прогресс</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Задачи</p>
                  <p className="font-medium">
                    {project.completedTasks}/{project.tasksCount}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Участники</p>
                  <p className="font-medium">{project.members}</p>
                </div>
                <div>
                  <p className="text-gray-500">Срок</p>
                  <p className="font-medium">
                    {new Date(project.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-4"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-gray-500 text-sm">{project.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  project.status
                )} text-white`}
              >
                {getStatusText(project.status)}
              </div>
              <div className="text-sm text-gray-500">
                {project.completedTasks}/{project.tasksCount} задач
              </div>
              <div className="text-sm text-gray-500">
                {project.members} участников
              </div>
            </div>
          </div>
        </div>
      ))}
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
      {/* Заголовок и действия */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Проекты</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
               transition-colors focus:outline-none focus:ring-2 
               focus:ring-blue-500 focus:ring-offset-2"
        >
          Создать проект
        </button>
      </div>
      {/* Фильтры и поиск */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Поиск проектов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="in_progress">В работе</option>
            <option value="planning">Планирование</option>
            <option value="completed">Завершенные</option>
            <option value="delayed">Отложенные</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="name">По названию</option>
            <option value="progress">По прогрессу</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded ${
              view === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Сетка
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${
              view === "list" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Список
          </button>
        </div>
      </div>
      {/* Список проектов */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Проекты не найдены</p>
        </div>
      ) : view === "grid" ? (
        renderGridView()
      ) : (
        renderListView()
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm onClose={() => setIsModalOpen(false)} />
      </Modal>
      ;
    </div>
  );
};

export default Projects;
