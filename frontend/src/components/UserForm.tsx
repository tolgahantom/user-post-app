import { useState, useEffect } from "react";
import type { User } from "../models/User";

type Props = {
  onSubmit: (user: Omit<User, "id">) => void;
  editingUser?: User | null;
};

const UserForm = ({ onSubmit, editingUser }: Props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
  }>({});

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setUsername(editingUser.username);
      setEmail(editingUser.email);
      setErrors({});
    }
  }, [editingUser]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Email is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, username, email });
    setName("");
    setUsername("");
    setEmail("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border p-2 rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`border p-2 rounded ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && (
          <span className="text-red-500 text-sm mt-1">{errors.username}</span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border p-2 rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {editingUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
