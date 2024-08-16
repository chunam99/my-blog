/* eslint-disable @typescript-eslint/ban-types */
import fakeData from "@/constans/index.json";
import User from "../models/User";
import UserLogin from "../models/UserLogin";

export const registerUser = async (
  url: string,
  data: Partial<User>,
  setData: Function
) => {
  const mockData = fakeData.users.find(
    (user) => user.username === data.username
  );
  setData(mockData ? mockData : { error: "User not found" });
};

export const login = async (
  url: string,
  data: Partial<UserLogin>,
  setData: Function
) => {
  const mockData = fakeData.user_logins.find(
    (user) => user.username === data.username && user.password === data.password
  );
  setData(mockData ? mockData : { error: "Invalid credentials" });
};

export const search = async (
  url: string,
  setData: Function,
  header: Object
) => {
  setData(fakeData.posts);
};

export const register = async (
  url: string,
  data: User,
  setData: Function,
  header: Object
) => {
  const newUser = { ...data, post: null };
  fakeData.users.push(newUser);
  setData(newUser);
};

export const update = async (
  url: string,
  data: Partial<User>,
  setData: Function,
  header: Object
) => {
  const index = fakeData.users.findIndex((user) => user.id === data.id);
  if (index !== -1) {
    fakeData.users[index] = {
      ...fakeData.users[index],
      ...data,
      post: null,
    }; // Đảm bảo post có giá trị null nếu không có giá trị khác
    setData(fakeData.users[index]);
  } else {
    setData({ error: "User not found" });
  }
};

export const deleteItems = async (url: string, header: Object) => {
  const remainingUsers = fakeData.users.filter(
    (user) => user.id !== parseInt(url)
  );
  console.log("Remaining users after deletion:", remainingUsers);
};
