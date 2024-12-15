import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Временные данные для демонстрации
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Имитация загрузки данных
        setProject({
          id: 1,
          name: "Веб-приложение",
          description: "Разработка нового веб-приложения для управления проектами",
          status: "in_progress",
          startDate: "2024-01-15",
          endDate: "2024-06-30",
          progress: 65,
        });

        setTasks([
          {
            id: 1,
            title: "Разработка API",
            status: "completed",
            assignee: "John Doe",
            dueDate: "2024-02-28",
            priority: "high"
          },
          {
            id: 2,
            title: "Создание UI компонентов",
            status: "in_progress",
            assignee: "Jane Smith",
            dueDate: "2024-03-15",
            priority: "medium"
          },
          {
            id: 3,
            title: "Тестирование",
            status: "pending",
            assignee: "Mike Johnson",
            dueDate: "2024-04-01",
            priority: "low"
          }
        ]);

        setMembers([
          {
            id: 1,
            name: "John Doe",
            role: "Project Manager",
            avatar: "/placeholder.jpg"
          },
          {
            id: 2,
            name: "Jane Smith",
            role: "Developer",
            avatar: "/placeholder.jpg"
          },
          {
            id: 3,
            name: "Mike Johnson",
            role: "Designer",
            avatar: "/placeholder.jpg"
          }
        ]);

        setIsLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных проекта');
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

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
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-500',
      in_progress: 'bg-blue-500',
      pending: 'bg-yellow-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Заголовок проекта */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-500 mt-1">{project.description}</p>
        </div>
        <button
          onClick={() => navigate(`/projects/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
        >
          Редактировать проект
        </button>
      </div>

      {/* Информация о проекте */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Статус</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                <span className="font-medium capitalize">{project.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Прогресс</p>
              <div className="space-y-2">
                <div className="font-medium">{project.progress}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Дата начала</p>
              <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Дата окончания</p>
              <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Задачи проекта */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Задачи</CardTitle>
          <button
            onClick={() => navigate(`/projects/${id}/tasks/create`)}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Добавить задачу
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 
                           transition-colors cursor-pointer"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">Исполнитель: {task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-500">
                    До {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Участники проекта */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Участники проекта</CardTitle>
          <button
            onClick={() => navigate(`/projects/${id}/members/add`)}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Добавить участника
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;