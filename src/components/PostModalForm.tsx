import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/AuthContext";
import Post from "@/models/Post";
import Theme from "@/models/Theme";
import { register, search, update } from "@/services/Service";
import { LucideIcon } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PostModalFormProps {
  icon: LucideIcon;
  postID?: number;
}

export function PostModalForm({ icon: Icon, postID }: PostModalFormProps) {
  const navigate = useNavigate();

  const id = postID?.toString();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [themes, setThemes] = useState<Theme[]>([]);
  const [theme, setTheme] = useState<Theme>({
    id: 0,
    description: "",
  });
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "",
    text: "",
    date: "",
    theme: null,
    user: null,
  });

  async function searchPostByID(id: string) {
    await search(`/posts/${id}`, setPost, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function searchThemeByID(id: string) {
    await search(`/themes/${id}`, setTheme, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function searchThemes() {
    await search("/themes", setThemes, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      alert("You need to be logged in");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    searchThemes();
    if (id !== undefined) {
      searchPostByID(id);
      console.log(theme);
    }
  }, [id]);

  useEffect(() => {
    setPost({
      ...post,
      theme: theme,
    });
  }, [theme]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      theme: theme,
      user: user,
    });
  }

  async function generateNewPost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ post });

    if (id != undefined) {
      try {
        await update(`/posts`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });
        alert("Post updated successfully");
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes("403")) {
          alert("Token expired, please log in again");
          handleLogout();
        } else {
          alert("Error updating the post");
        }
      }
    } else {
      try {
        await register(`/posts`, post, setPost, {
          headers: {
            Authorization: token,
          },
        });
        alert("Post created successfully");
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes("403")) {
          alert("Token expired, please log in again");
          handleLogout();
        } else {
          alert("Error creating the post");
        }
      }
    }
  }

  const loadingTheme = theme.description === "";

  return (
    <Dialog>
      <DialogTrigger>
        <span>{Icon && <Icon />}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={generateNewPost} className="flex flex-col">
          <label htmlFor="">Title</label>
          <input
            type="text"
            onChange={updateState}
            name="title"
            required
            className="p-2 rounded-md bg-gray-800"
          />

          <label htmlFor="">Text</label>
          <input
            value={post.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            name="text"
            required
            type="text"
            className="p-2 rounded-md bg-gray-800 h-28"
          />

          <label htmlFor="">Theme</label>
          <select
            onChange={(e) => searchThemeByID(e.currentTarget.value)}
            className="p-2 rounded-md bg-gray-800"
          >
            <option value="">Select a theme</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.description}
              </option>
            ))}
          </select>

          <button
            disabled={loadingTheme}
            type="submit"
            className="bg-indigo-500 p-2 rounded-md mt-4"
          >
            {loadingTheme ? (
              <span>Loading</span>
            ) : id !== undefined ? (
              "Edit"
            ) : (
              "Create"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
