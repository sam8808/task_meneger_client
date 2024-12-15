// src/pages/dashboard/Tasks.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import Input from "../../components/common/Input";

const Tasks = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("kanban"); // 'kanban' или 'list'
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    assignee: "all",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // TODO: Заменить на реальный API-запрос
      const mockTasks = [
        {
          id: 1,
          title: "Разработка API",
          description: "Создание RESTful API для проекта",
          status: "todo",
          priority: "high",
          assignee: {
            id: 1,
            name: "John Doe",
            avatar: "/avatar.jpg",
          },
          project: {
            id: 1,
            name: "Веб-приложение",
          },
          dueDate: "2024-03-20",
        },
        {
          id: 2,
          title: "Дизайн интерфейса",
          description: "Создание UI компонентов",
          status: "in_progress",
          priority: "medium",
          assignee: {
            id: 2,
            name: "Jane Smith",
            avatar: "/avatar.jpg",
          },
          project: {
            id: 1,
            name: "Веб-приложение",
          },
          dueDate: "2024-03-25",
        },
        // Добавьте больше задач для тестирования
      ];

      setTasks(mockTasks);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: "bg-gray-500",
      in_progress: "bg-blue-500",
      review: "bg-yellow-500",
      done: "bg-green-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-red-600",
      medium: "text-yellow-600",
      low: "text-green-600",
    };
    return colors[priority] || "text-gray-600";
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;
    const matchesAssignee =
      filters.assignee === "all" ||
      task.assignee.id.toString() === filters.assignee;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    in_progress: filteredTasks.filter((task) => task.status === "in_progress"),
    review: filteredTasks.filter((task) => task.status === "review"),
    done: filteredTasks.filter((task) => task.status === "done"),
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    try {
      // TODO: Реализовать API запрос для обновления статуса
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id.toString() === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderTaskCard = (task) => (
    <div
      key={task.id}
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-medium ${getPriorityColor(task.priority)}`}
          >
            {task.priority}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-medium">{task.title}</h3>

        <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src={task.assignee.avatar}
                alt={task.assignee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-gray-600">{task.assignee.name}</span>
          </div>
          <span className="text-sm text-gray-500">{task.project.name}</span>
        </div>
      </div>
    </div>
  );

  const renderKanbanBoard = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
        <div
          key={status}
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-700 capitalize">
              {status.replace("_", " ")}
            </h3>
            <span className="text-sm text-gray-500">{statusTasks.length}</span>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg min-h-[500px] space-y-4">
            {statusTasks.map((task) => renderTaskCard(task))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <Card
          key={task.id}
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="hover:shadow-md transition-shadow cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    task.status
                  )}`}
                />
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src={task.assignee.avatar}
                      alt={task.assignee.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {task.assignee.name}
                  </span>
                </div>
                <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
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
        <h1 className="text-2xl font-bold">Задачи</h1>
        <button
          onClick={() => navigate("/tasks/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
        >
          Создать задачу
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="all">Все статусы</option>
            <option value="todo">К выполнению</option>
            <option value="in_progress">В работе</option>
            <option value="review">На проверке</option>
            <option value="done">Выполнено</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.priority}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value="all">Все приоритеты</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.assignee}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, assignee: e.target.value }))
            }
          >
            <option value="all">Все исполнители</option>
            {/* TODO: Добавить список исполнителей из API */}
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setView("kanban")}
            className={`p-2 rounded ${
              view === "kanban" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Канбан
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

      {/* Список задач */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Задачи не найдены</p>
        </div>
      ) : view === "kanban" ? (
        renderKanbanBoard()
      ) : (
        renderListView()
      )}
    </div>
  );
};

export default Tasks;
