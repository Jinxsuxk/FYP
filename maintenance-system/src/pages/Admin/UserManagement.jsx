import Layout from "../../components/Layout";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { getUsers, updateRole, deleteUser } from "../../services/userService";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();

      setUsers(data);

      const roleMap = {};

      data.forEach((user) => {
        roleMap[user.id] = user.role;
      });

      setSelectedRoles(roleMap);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRoleChange(userId) {
    try {
      await updateRole(userId, selectedRoles[userId]);

      alert("Role updated successfully");

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update role");
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(userId, fullName) {
    const confirmed = window.confirm(`Delete ${fullName}?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);

      alert("User deleted successfully");

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage accounts, roles, and access across the system.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
            {users.length} Users
          </span>

          <Link
            to="/admin/users/create"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            <FaPlus size={14} />
            Create User
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Search Users
        </label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* User Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            No users match your search.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="p-4 font-medium text-gray-500">Name</th>
                <th className="p-4 font-medium text-gray-500">Email</th>
                <th className="p-4 font-medium text-gray-500">Role</th>
                <th className="p-4 font-medium text-gray-500">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">
                    {user.full_name}
                  </td>

                  <td className="p-4 text-gray-600">{user.email}</td>

                  <td className="p-4">
                    <select
                      value={selectedRoles[user.id] || ""}
                      onChange={(e) =>
                        setSelectedRoles({
                          ...selectedRoles,
                          [user.id]: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Technician">Technician</option>
                      <option value="Lecturer">Lecturer</option>
                      <option value="Student">Student</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRoleChange(user.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(user.id, user.full_name)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default UserManagement;