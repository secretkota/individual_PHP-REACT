import { useForm } from "react-hook-form";
import { Button, Login, Error, Input, Label, Title } from "./Auth.styled";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { loginUser, registerUser } from "../../api/api";

export default function AuthForm() {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isRegister = location.pathname === "/register"

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()



  const onSubmit = async (data) => {
    setError(null);


    const { login: username, email, password } = data

    try {
      const res = isRegister
        ? await registerUser(username, email, password)
        : await loginUser(username, password)
  
      if (res.success && res.token) {
        localStorage.setItem('token', res.token)
        navigate('/main/ads');
      } else {
        setError(res.message || 'Ошибка входа')
      }
    } catch (err) {
      setError('Произошла ошибка. Попробуйте позже.')
    }
  };

  return (
    <>
      <Login>
        <Title>{isRegister ? "Регистрация" : "Авторизация"}</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="login">{isRegister ? "Логин" : "Логин или Email:"}</Label>
          <Input type="text" name="login" id="login"
            {...register("login", {
              required: "Поле обязательно к заполнению",
              minLength: { value: 3, message: "Минимум 3 символа" },
              maxLength: { value: 30, message: "Максимум 30 символов" }
            })}
          />
          {errors.login && <Error>{errors.login.message}</Error>}

          {isRegister && (
            <>
              <Label htmlFor="email">Email:</Label>
              <Input type="text" name="email" id="email"
                {...register("email", {
                  required: "Поле обязательно к заполнению",
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Некорректный email" }
                })}
              />
              {errors.email && <Error>{errors.email.message}</Error>}
            </>
          )}

          <Label htmlFor="password">Пароль:</Label>
          <Input type="text" name="password" id="password"
            {...register("password", {
              required: "Поле обязательно к заполнению",
              minLength: { value: 3, message: "Минимум 3 символа" },
              maxLength: { value: 30, message: "Максимум 30 символов" }
            })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          {error && <Error>{error}</Error>}
          <Button type="submit">{isRegister ? "Зарегистрироваться" : "Войти"}</Button>
        </form>

        {isRegister ? (
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        ) : (
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        )}
      </Login>
    </>
  )
}
