// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (formData.name.length < 2) {
      newErrors.name = "Имя должно быть не короче 2 символов";
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    // Валидация пароля
    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль должен быть не короче 8 символов";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Пароль должен содержать хотя бы одну цифру";
    }

    // Проверка совпадения паролей
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Пароли не совпадают";
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
    // Очищаем ошибку при изменении поля
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
      await register(formData);
      navigate("/"); // После успешной регистрации перенаправляем на главную
    } catch (error) {
      const responseErrors = {};
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          responseErrors[key] = error.response.data.errors[key][0];
        });
      } else {
        responseErrors.general =
          error.response?.data?.message || "Ошибка при регистрации";
      }
      setErrors(responseErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Имя"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <Input
                label="Подтверждение пароля"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                error={errors.password_confirmation}
                required
              />
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Зарегистрироваться
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Уже есть аккаунт? Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
