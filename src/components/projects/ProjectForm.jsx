// src/components/projects/ProjectForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/slices/projectSlice";
import { projectsAPI } from "../../api/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";

const ProjectForm = ({ onClose, initialData = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Если есть id, загружаем данные проекта
    if (id) {
      const fetchProject = async () => {
        try {
          const projectData = await projectsAPI.getProjectById(id);
          setFormData(projectData);
        } catch (error) {
          console.error("Error loading project:", error);
          // Обработка ошибки
        }
      };
      fetchProject();
    }
  }, [id]);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    status: initialData?.status || "planning",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Название проекта обязательно";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Дата начала обязательна";
    }

    if (!formData.endDate) {
      newErrors.endDate = "Дата окончания обязательна";
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "Дата окончания не может быть раньше даты начала";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let response;
      if (initialData) {
        response = await projectsAPI.updateProject(initialData.id, formData);
      } else {
        response = await projectsAPI.createProject(formData);
      }

      dispatch(addProject(response));
      onClose();
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message ||
          "Произошла ошибка при сохранении проекта",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? "Редактирование проекта" : "Создание проекта"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          <Input
            label="Название проекта"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Дата начала"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              required
            />

            <Input
              label="Дата окончания"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              error={errors.endDate}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Статус
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="planning">Планирование</option>
              <option value="active">Активный</option>
              <option value="on_hold">На паузе</option>
              <option value="completed">Завершен</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {initialData ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
