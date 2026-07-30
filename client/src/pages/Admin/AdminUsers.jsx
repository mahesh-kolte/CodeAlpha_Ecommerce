 import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../components/Admin/AdminLayout";
import {
  FaSearch,
  FaTrash,
  FaUsers,
  FaUserShield,
  FaUser,
  FaSync,
} from "react-icons/fa";
import toast from "react-hot-toast";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(data.users || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to Load Users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold animate-pulse">
            Loading Users...
          </h1>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Manage Users
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all registered users
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaSync />
          Refresh
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaUsers className="text-4xl text-blue-600 mb-3" />
          <h2 className="text-gray-500">Total Users</h2>
          <h1 className="text-3xl font-bold">
            {users.length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaUserShield className="text-4xl text-red-600 mb-3" />
          <h2 className="text-gray-500">Admins</h2>
          <h1 className="text-3xl font-bold text-red-600">
            {users.filter((u) => u.role === "admin").length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaUser className="text-4xl text-green-600 mb-3" />
          <h2 className="text-gray-500">Customers</h2>
          <h1 className="text-3xl font-bold text-green-600">
            {users.filter((u) => u.role === "user").length}
          </h1>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <FaSearch className="absolute left-4 top-4 text-gray-500" />

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>
            {/* Users Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (

              filteredUsers.map((user, index) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {index + 1}
                  </td>

                  <td className="p-4 font-semibold">
                    {user.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-4 text-gray-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center">

                      <button
                        title="Delete User"
                        disabled={user.role === "admin"}
                        onClick={() => deleteUser(user._id)}
                        className={`p-3 rounded-xl text-white transition ${
                          user.role === "admin"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="py-12 text-center"
                >

                  <h2 className="text-2xl font-bold">
                    No Users Found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Try another search keyword.
                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default AdminUsers;