import Post from "./Post";

export default interface User {
  id: number;
  name: string;
  username: string;
  photo: string;
  password: string;
  post?: Post | null;
}
