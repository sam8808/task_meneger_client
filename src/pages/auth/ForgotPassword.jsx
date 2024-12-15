// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Сброс состояний
    setError("");
    setSuccess(false);

    // Валидация email
    if (!email) {
      setError("Email обязателен");
      return;
    }

    if (!validateEmail(email)) {
      setError("Введите корректный email");
      return;
    }

    setIsLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
      setEmail(""); // Очищаем поле после успешной отправки
    } catch (err) {
      setError(
        err.response?.data?.message || "Произошла ошибка при отправке запроса"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Восстановление пароля
          </CardTitle>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="text-center space-y-4">
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-green-700">
                  Инструкции по восстановлению пароля отправлены на ваш email
                </p>
              </div>
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Вернуться к входу
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Введите email, указанный при регистрации, и мы отправим вам
                  инструкции по восстановлению пароля
                </p>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Email"
                  disabled={isLoading}
                  error={error}
                />
              </div>

              <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  className="w-full"
                >
                  Отправить инструкции
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Вернуться к входу
                  </Link>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
