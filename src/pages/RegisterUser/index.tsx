import User from "@/models/User";
import { registerUser } from "@/services/Service";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    password: "",
    username: "",
    photo: "",
  });

  const [userResponse, setUserResponse] = useState<User>({
    id: 0,
    name: "",
    password: "",
    username: "",
    photo: "",
  });

  useEffect(() => {
    if (userResponse.id !== 0) {
      back();
    }
  }, [back, userResponse]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function back() {
    navigate("/login");
  }

  function handleConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function registerNewUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmPassword === user.password && user.password.length >= 8) {
      try {
        await registerUser(`/users/cadastrar`, user, setUserResponse);
        alert("Usuário cadastrado com sucesso");
      } catch (error) {
        alert("Erro ao cadastrar o Usuário");
      }
    } else {
      alert("Dados inconsistentes. Verifique as informações de cadastro.");
      setUser({ ...user, password: "" });
      setConfirmPassword("");
    }
  }

  return (
    <div className="bg-gray-200 w-full h-[100vh] flex">
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-gray-100 basis-1/2 text-[48px] font-bold flex justify-center items-center">
        Bem Vindo!
      </div>

      <div className="bg-gray-200 flex basis-1/2 flex-col justify-center items-center w-full p-4 dark:bg-gray-900">
        <form
          onSubmit={registerNewUser}
          className="bg-gray-300 py-12 px-6 rounded-md flex flex-col w-[560px] dark:bg-gray-800"
        >
          <h1 className="text-[32px] font-bold text-center mb-4">
            Cadastre-se
          </h1>

          <label htmlFor="user">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="user">User Name</label>
          <input
            type="text"
            id="user"
            name="user"
            value={user.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="">Confirme Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleConfirmPassword(e)
            }
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <button
            type="submit"
            className="bg-indigo-500 text-gray-100 py-2 px-4 rounded-md my-4"
          >
            Submit
          </button>
          <p className="text-center">
            If you already have an account{" "}
            <Link
              to="/login"
              className="text-indigo-500 dark:text-indigo-400 font-semibold"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
