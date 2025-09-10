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

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Users
        </h1>

        <button
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="cursor-pointer fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl flex items-center justify-center shadow-lg transition"
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-xl mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-1">Username: {user.username}</p>
                <p className="text-gray-600">Email: {user.email}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setIsModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
