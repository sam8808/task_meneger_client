import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaskData();
  }, [id]);

  const fetchTaskData = async () => {
    try {
      // Имитация загрузки данных
      setTask({
        id: 1,
        title: "Разработка API для проекта",
        description:
          "Создание RESTful API с использованием Laravel для проекта управления задачами",
        status: "in_progress",
        priority: "high",
        assignee: {
          id: 2,
          name: "John Doe",
          avatar: "/avatar.jpg",
        },
        dueDate: "2024-03-30",
        createdAt: "2024-02-15",
        project: {
          id: 1,
          name: "Таск-менеджер",
        },
        attachments: [
          { id: 1, name: "api-docs.pdf", size: "2.5MB" },
          { id: 2, name: "schema.jpg", size: "1.1MB" },
        ],
      });

      setComments([
        {
          id: 1,
          text: "Документация API готова, можно приступать к реализации",
          author: { id: 1, name: "Jane Smith", avatar: "/avatar.jpg" },
          createdAt: "2024-02-16T10:30:00",
        },
        {
          id: 2,
          text: "Начал работу над авторизацией",
          author: { id: 2, name: "John Doe", avatar: "/avatar.jpg" },
          createdAt: "2024-02-16T14:45:00",
        },
      ]);

      setSubtasks([
        {
          id: 1,
          title: "Настройка аутентификации",
          status: "completed",
          assignee: { id: 2, name: "John Doe" },
        },
        {
          id: 2,
          title: "Реализация CRUD операций",
          status: "in_progress",
          assignee: { id: 2, name: "John Doe" },
        },
      ]);

      setIsLoading(false);
    } catch (err) {
      setError("Ошибка при загрузке задачи");
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // TODO: Реализовать API запрос
      setTask((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // TODO: Реализовать API запрос
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        author: { id: user.id, name: user.name, avatar: user.avatar },
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newCommentObj]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-500",
      in_progress: "bg-blue-500",
      pending: "bg-yellow-500",
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Заголовок и действия */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <span
              className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
            <span
              className={`text-sm font-medium ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
          <p className="text-gray-500 mt-1">Проект: {task.project.name}</p>
        </div>
        <button
          onClick={() => navigate(`/tasks/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
        >
          Редактировать
        </button>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{task.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Исполнитель</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{task.assignee.name}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Срок выполнения</p>
                  <p className="font-medium mt-1">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Создано</p>
                  <p className="font-medium mt-1">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вложения */}
          <Card>
            <CardHeader>
              <CardTitle>Вложения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {task.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <span className="text-blue-600">{attachment.name}</span>
                    <span className="text-sm text-gray-500">
                      {attachment.size}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Подзадачи */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Подзадачи</CardTitle>
          <button
            className="text-sm text-blue-600 hover:text-blue-700"
            onClick={() => navigate(`/tasks/${id}/subtasks/create`)}
          >
            Добавить подзадачу
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      subtask.status
                    )}`}
                  />
                  <span>{subtask.title}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {subtask.assignee.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Комментарии */}
      <Card>
        <CardHeader>
          <CardTitle>Комментарии</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Форма добавления комментария */}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Добавить комментарий..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2"
                disabled={!newComment.trim()}
              >
                Отправить
              </button>
            </form>

            {/* Список комментариев */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
