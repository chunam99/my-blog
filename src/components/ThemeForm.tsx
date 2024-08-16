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
    username: "",
    password: "",
    photo: "",
  });

  const [userResponse, setUserResponse] = useState<User>({
    id: 0,
    name: "",
    username: "",
    password: "",
    photo: "",
  });

  useEffect(() => {
    if (userResponse.id !== 0) {
      goBack();
    }
  }, [goBack, userResponse]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function goBack() {
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
        await registerUser(`/users/register`, user, setUserResponse);
        alert("User registered successfully");
      } catch (error) {
        alert("Error registering user");
      }
    } else {
      alert("Inconsistent data. Please check your registration information.");
      setUser({ ...user, password: "" });
      setConfirmPassword("");
    }
  }

  return (
    <div className="bg-gray-200 w-full h-[100vh] flex">
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-gray-100 basis-1/2 text-[48px] font-bold flex justify-center items-center">
        Welcome!
      </div>

      <div className="bg-gray-200 flex basis-1/2 flex-col justify-center items-center w-full p-4 dark:bg-gray-900">
        <form
          onSubmit={registerNewUser}
          className="bg-gray-300 py-12 px-6 rounded-md flex flex-col w-[560px] dark:bg-gray-800"
        >
          <h1 className="text-[32px] font-bold text-center mb-4">Register</h1>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
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
            Register
          </button>
          <p className="text-center">
            Already have an account?{" "}
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
