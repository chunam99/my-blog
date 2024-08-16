import Post from "@/models/Post";
import { Edit2Icon, User2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import DeleteAction from "./DeleteAction";
import { PostModalForm } from "./PostModalForm";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDateRelativeToNow = formatDistanceToNow(post.date, {
    locale: enUS,
    addSuffix: true,
  });

  return (
    <div className="bg-indigo-300 border border-indigo-300 rounded-md flex-1 max-w-[400px] min-w-[300px] dark:bg-gray-900 dark:border-gray-700">
      <div className="flex gap-2 justify-between items-center p-3">
        <div className="flex gap-2 items-center">
          <span>
            {post.user?.photo ? (
              <img
                src={post.user?.photo}
                className="rounded-full max-w-[32px] h-[32px] object-cover"
              />
            ) : (
              <User2Icon
                size={32}
                className="bg-gray-100 p-1 rounded-full dark:bg-gray-700"
              />
            )}
          </span>
          <span>{post.user?.name}</span>
        </div>
        <span className="text-sm text-gray-400">
          {publishedDateRelativeToNow}
        </span>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 overflow-hidden relative dark:border-y dark:border-gray-800">
        <h2 className="font-bold p-3">{post.title}</h2>
        <p className="px-3 h-[100px]">{post.text}</p>
        <div className="bg-gradient-to-t from-indigo-300 to-gray-400/0 p-3 absolute bottom-0 left-0 right-0 dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-900/0"></div>
      </div>

      <div className="p-3 flex justify-between items-center">
        <span className="bg-indigo-500 px-2 py-0 rounded-md inline-block text-sm dark:bg-indigo-500/60">
          #{post.theme?.description}
        </span>
        <div>
          <button className="py-1 px-2 bg-gray-100 rounded-md mr-1 hover:text-indigo-500 duration-200 dark:bg-gray-800">
            <PostModalForm postID={post.id} icon={Edit2Icon} />
          </button>
          <button className="py-1 px-2 bg-gray-100 rounded-md hover:text-red-500 duration-200 dark:bg-gray-800">
            <DeleteAction
              url="/posts/"
              item={post}
              text={{
                title: "Are you sure you want to delete this post?",
                description: "This action is permanent!",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
