import { useEffect, useState } from "react";
import type { Post } from "../models/Post";
import type { User } from "../models/User";
import Loader from "./Loader";
import PostForm from "./PostForm";
import Modal from "./Modal";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usersRes = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData: User[] = await usersRes.json();
      setUsers(usersData);

      const postsRes = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const postsData: Post[] = await postsRes.json();
      setPosts(postsData.slice(0, 20));
      setLoading(false);
    };

    fetchData();
  }, []);

  // Add, Update, Delete işlemleri aynı şekilde

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Posts
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const user = users.find((u) => u.id === post.userId);
            return (
              <div
                key={post.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-bold text-lg mb-1">{post.title}</h2>
                  <p className="text-gray-600">
                    User: {user?.username || "Unknown"}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setIsModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setPosts(posts.filter((p) => p.id !== post.id))
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostList;
