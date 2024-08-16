// /* eslint-disable @typescript-eslint/ban-types */
// import axios from "axios";

// const api = axios.create({
//   baseURL: "",
// });

// export const registerUser = async (
//   url: string,
//   data: Object,
//   setData: Function
// ) => {
//   const response = await api.post(url, data);
//   setData(response.data);
// };

// export const login = async (url: string, data: Object, setData: Function) => {
//   const response = await api.post(url, data);
//   setData(response.data);
// };

// export const search = async (
//   url: string,
//   setData: Function,
//   header: Object
// ) => {
//   const response = await api.get(url, header);
//   setData(response.data);
// };

// export const register = async (
//   url: string,
//   data: Object,
//   setData: Function,
//   header: Object
// ) => {
//   const response = await api.post(url, data, header);
//   setData(response.data);
// };

// export const update = async (
//   url: string,
//   data: Object,
//   setData: Function,
//   header: Object
// ) => {
//   const response = await api.put(url, data, header);
//   setData(response.data);
// };

// export const deleteItems = async (url: string, header: Object) => {
//   await api.delete(url, header);
// };

/* eslint-disable @typescript-eslint/ban-types */
import axios from "axios";

// Định nghĩa các interface cho dữ liệu của bạn
interface User {
  id: number;
  name: string;
  username: string;
  photo: string;
  password: string;
}

interface UserLogin extends User {
  token: string;
}

interface Post {
  id: number;
  title: string;
  text: string;
  date: string;
  theme: any;
  user: User | null;
}

interface ConstantsData {
  users: User[];
  user_logins: UserLogin[];
  posts: Post[];
}

const api = axios.create({
  baseURL: "../constants", // Đảm bảo baseURL dẫn đến thư mục chứa file JSON của bạn
});

export const registerUser = async (
  url: string,
  data: Partial<User>,
  setData: Function
) => {
  const response = await api.get<ConstantsData>("/index.json");
  const mockData = response.data.users.find(
    (user) => user.username === data.username
  );
  setData(mockData ? mockData : { error: "User not found" });
};

export const login = async (
  url: string,
  data: Partial<UserLogin>,
  setData: Function
) => {
  const response = await api.get<ConstantsData>("/index.json");
  const mockData = response.data.user_logins.find(
    (user) => user.username === data.username && user.password === data.password
  );
  setData(mockData ? mockData : { error: "Invalid credentials" });
};

export const search = async (
  url: string,
  setData: Function,
  header: Object
) => {
  const response = await api.get<ConstantsData>("/index.json");
  setData(response.data.posts); // Giả lập việc tìm kiếm posts
};

export const register = async (
  url: string,
  data: User,
  setData: Function,
  header: Object
) => {
  const response = await api.get<ConstantsData>("/index.json");
  response.data.users.push(data); // Giả lập việc đăng ký người dùng mới
  setData(data);
};

export const update = async (
  url: string,
  data: Partial<User>,
  setData: Function,
  header: Object
) => {
  const response = await api.get<ConstantsData>("/index.json");
  const index = response.data.users.findIndex((user) => user.id === data.id);
  if (index !== -1) {
    response.data.users[index] = { ...response.data.users[index], ...data }; // Giả lập việc cập nhật người dùng
    setData(response.data.users[index]);
  } else {
    setData({ error: "User not found" });
  }
};

export const deleteItems = async (url: string, header: Object) => {
  const response = await api.get<ConstantsData>("/index.json");
  const remainingUsers = response.data.users.filter(
    (user) => user.id !== parseInt(url)
  );
  console.log("Remaining users after deletion:", remainingUsers);
};
