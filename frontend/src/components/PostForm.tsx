import { useState, useEffect } from "react";
import type { Post } from "../models/Post";
import type { User } from "../models/User";

type Props = {
  onSubmit: (post: Omit<Post, "id">) => void;
  editingPost?: Post | null;
  users: User[];
};

const PostForm = ({ onSubmit, editingPost, users }: Props) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState<number>(users[0]?.id || 0);
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setUserId(editingPost.userId);
      setErrors({});
    }
  }, [editingPost]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title, userId });
    setTitle("");
    setUserId(users[0]?.id || 0);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`border p-2 rounded ${
          errors.title ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title}</span>
      )}

      <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {editingPost ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
};

export default PostForm;
