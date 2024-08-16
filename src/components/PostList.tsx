import { useContext, useEffect, useState } from "react";
import Post from "@/models/Post";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { search } from "@/services/FakeApiService";
import PostCard from "./PostCard";
import { PostModalForm } from "./PostModalForm";
import { Plus } from "lucide-react";

function CardList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user?.token || "";

  useEffect(() => {
    if (token === "") {
      alert("You need to be logged in");
      navigate("/");
    }
  }, [token, navigate]);

  async function fetchPosts() {
    try {
      await search("/posts", setPosts, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.toString().includes("403")) {
        alert("Token expired, please log in again");
        handleLogout();
      } else {
        setPosts([]);
      }
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="max-w-[1000px] mx-auto py-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-[48px] font-semibold mb-8">Posts</h1>
        <span className="bg-indigo-500 p-2 flex items-center gap-2 rounded-md">
          New post <PostModalForm icon={Plus} />
        </span>
      </div>

      <div id="posts" className="flex gap-3 flex-wrap">
        {posts ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </section>
  );
}

export default CardList;
