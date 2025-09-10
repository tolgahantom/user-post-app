import { useEffect, useState } from "react";
import type { User } from "../models/User";
import Loader from "./Loader";
import UserForm from "./UserForm";
import Modal from "./Modal";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usersRes = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData: User[] = await usersRes.json();
      setUsers(usersData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addUser = (newUser: Omit<User, "id">) => {
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id }]);
    setIsModalOpen(false);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  if (loading) return <Loader />;

  // 🔹 Arama filtresi
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Users
        </h1>

        {/* Search */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full max-w-md"
          />
        </div>

        {/* Users Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-lg mb-1">{user.name}</h2>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add User Button */}
        <button
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="fixed bottom-16 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl flex items-center justify-center shadow-lg transition"
        >
          +
        </button>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingUser ? "Edit User" : "Add User"}
        >
          <UserForm
            editingUser={editingUser}
            onSubmit={
              editingUser
                ? (data) => updateUser({ ...editingUser, ...data })
                : addUser
            }
          />
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
