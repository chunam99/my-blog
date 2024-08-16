import Theme from "./Theme";
import User from "./User";

export default interface Post {
  id: number;
  title: string;
  text: string;
  date: string;
  theme: Theme | null;
  user: User | null;
}
