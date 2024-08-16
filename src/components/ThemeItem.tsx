import Theme from "@/models/Theme";
import DeleteAction from "./DeleteAction";
import EditItems from "./EditTheme";

interface ThemeCardProps {
  theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <div className="flex-1 min-w-[300px] max-w-80 flex justify-between items-center gap-4 bg-gray-200 py-2 px-4 rounded-md dark:bg-gray-800">
      <div className="text-xl">
        <span className="text-indigo-400 font-semibold">#</span>
        <span className="dark:text-gray-300">{theme.description}</span>
      </div>
      <div className="flex gap-2">
        <button aria-label="Edit theme">
          <EditItems themeID={theme.id} />
        </button>

        <button aria-label="Delete theme">
          <DeleteAction
            url={"/theme/"}
            item={theme}
            text={{
              title: "Are you sure you want to delete this theme?",
              description:
                "Deleting this theme will also remove all posts associated with it.",
            }}
          />
        </button>
      </div>
    </div>
  );
}
