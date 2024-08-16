import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthContext } from "@/contexts/AuthContext";
import Theme from "@/models/Theme";
import { search, update } from "@/services/Service";
import { Check, Edit2Icon } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type EditThemeProps = {
  themeID: number;
};

export default function EditItems({ themeID }: EditThemeProps) {
  const [theme, setTheme] = useState<Theme>({} as Theme);

  const navigate = useNavigate();

  const id = themeID.toString();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  async function searchById(id: string) {
    await search(`/themes/${id}`, setTheme, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      searchById(id);
    }
  }, [id]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setTheme({
      ...theme,
      [e.target.name]: e.target.value,
    });
  }

  async function generateNewTheme(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await update(`/themes`, theme, setTheme, {
          headers: {
            Authorization: token,
          },
        });

        alert("Theme updated successfully");
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes("403")) {
          alert("The token has expired, please log in again");
          handleLogout();
        } else {
          alert("Error updating theme");
        }
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("You need to be logged in");
      navigate("/login");
    }
  }, [token]);

  return (
    <Dialog>
      <DialogTrigger className="bg-gray-900 text-gray-400 p-2 rounded-full">
        <Edit2Icon size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Theme</DialogTitle>
        </DialogHeader>

        <form onSubmit={generateNewTheme} className="flex gap-1">
          <input
            type="text"
            value={theme.description}
            name="description"
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            className="w-full p-2 rounded-md dark:bg-gray-800"
          />
          <DialogClose type="submit" className="bg-indigo-500 p-2 rounded-md">
            <Check />
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
