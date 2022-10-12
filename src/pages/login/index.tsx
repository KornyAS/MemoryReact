import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../constans/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      const res = await API.post("/authorisation.php", {
        login: email,
        password: password,
      });
      console.log(res.data.data);
      console.log(res.data.message);

      if (res.data.data.token) {
        localStorage.setItem("accessToken", res.data.data.token);
        localStorage.setItem("refreshToken", res.data.data.refresh_token);
        navigate("/");
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" min-h-screen bg-slate-100 flex justify-center">
      <div className="container w-full h-96 flex flex-col mt-8 items-center  rounded-3xl bg-white p-14">
        <span className="font-medium text-2xl text-sky-700">Авторизация</span>
        <span className="font-medium  text-sm mt-4">
          Введите логин и пароль{" "}
        </span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 border rounded-3xl h-10 p-2 bg-slate-50"
          placeholder="email"
          type="text"
          name=""
          id=""
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 border rounded-3xl h-10 p-2 bg-slate-50"
          placeholder="password"
          type="text"
          name=""
          id=""
        />
        <span className="text-red-600">{errorMessage}</span>
        <button
          onClick={() => handleSubmit()}
          className="mt-12 rounded-3xl py-2 px-12 text-white bg-sky-700"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Login;
