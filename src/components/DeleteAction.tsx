import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { deleteItems } from "@/services/FakeApiService";
import Theme from "@/models/Theme";
import Post from "@/models/Post";

interface DeleteActionProps {
  url: string;
  item: Theme | Post;
  text: {
    title: string;
    description: string;
  };
}

export default function DeleteAction({ url, item, text }: DeleteActionProps) {
  const { user } = useContext(AuthContext);

  async function deletePostOrTheme(id: number) {
    try {
      await deleteItems(url + id, {
        headers: {
          Authorization: user.token,
        },
      });

      alert("Deleted successfully");
    } catch (error) {
      alert("Error deleting");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon size={22} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text.title}</AlertDialogTitle>
          <AlertDialogDescription>{text.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePostOrTheme(item.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
