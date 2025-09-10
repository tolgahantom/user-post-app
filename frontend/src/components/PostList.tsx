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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

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

  // Add Post
  const addPost = (newPost: Omit<Post, "id">) => {
    const id = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    setPosts([...posts, { ...newPost, id }]);
    setIsModalOpen(false);
  };

  // Update Post
  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
    setIsModalOpen(false);
  };

  // Delete Post
  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  if (loading) return <Loader />;

  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Posts
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPosts.map((post) => {
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
                    onClick={() => deletePost(post.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-gray-100 py-3 flex justify-center gap-2 shadow-inner">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="px-4 py-1 font-bold">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button
          onClick={() => {
            setEditingPost(null);
            setIsModalOpen(true);
          }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl flex items-center justify-center shadow-lg transition"
        >
          +
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPost ? "Edit Post" : "Add Post"}
        >
          <PostForm
            editingPost={editingPost}
            onSubmit={
              editingPost
                ? (data) => updatePost({ ...editingPost, ...data })
                : addPost
            }
            users={users}
          />
        </Modal>
      </div>
    </div>
  );
};

export default PostList;
