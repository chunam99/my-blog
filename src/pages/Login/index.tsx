import { AuthContext } from "@/contexts/AuthContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import UserLogin from "@/models/UserLogin";

export default function Login() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin);

  const { user, handleLogin } = useContext(AuthContext);

  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user.token) {
      navigate("/home");
    }
  }, [user, navigate]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(userLogin);
    // navigate("/home");
  }

  return (
    <div className="bg-gray-200 w-full h-[100vh] flex">
      <div className="bg-gray-200 flex basis-1/2 flex-col justify-center items-center w-full p-4 dark:bg-gray-900">
        <form
          onSubmit={login}
          className="bg-gray-300 py-12 px-6 rounded-xl flex flex-col w-[560px] dark:bg-gray-800"
        >
          <h1 className="text-[32px] font-bold text-center mb-4">Login</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userLogin.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userLogin.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
              className="mb-4 py-2 px-4 rounded-md dark:bg-gray-900"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-gray-100 py-2 px-4 rounded-md my-4"
          >
            <span className="flex justify-center items-center font-bold">
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  height="30"
                  width="40"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Login"
              )}
            </span>
          </button>

          <p className="text-center">
            if you don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 dark:text-indigo-400 font-semibold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-gray-100 basis-1/2 text-[48px] font-bold flex justify-center items-center">
        <h1>Blog</h1>
      </div>
    </div>
  );
}
