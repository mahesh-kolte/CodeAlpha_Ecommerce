 import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../components/Admin/AdminLayout";
import toast from "react-hot-toast";
import {
  FaShoppingBag,
  FaTruck,
  FaSearch,
  FaMoneyBillWave,
} from "react-icons/fa";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(data.orders || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to Load Orders");
    } finally {
      setLoading(false);
    }
  };

 const updateStatus = async (id, status) => {

  if (!window.confirm(`Change status to ${status}?`)) {
    return;
  }

  try {
    await API.put(
      `/admin/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("Order Status Updated");
    fetchOrders();

  } catch (err) {
    console.log(err);
    toast.error("Failed to Update Order");
  }
};

  const badgeColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order._id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  const deliveredOrders = filteredOrders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const pendingOrders = filteredOrders.filter(
    (o) => o.status === "Pending"
  ).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-bold">
            Loading Orders...
          </h2>
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
            Manage Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer orders
          </p>
        </div>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaShoppingBag className="text-blue-600 text-3xl mb-4" />
          <h2 className="text-gray-500">
            Total Orders
          </h2>
          <h1 className="text-3xl font-bold">
            {filteredOrders.length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaTruck className="text-green-600 text-3xl mb-4" />
          <h2 className="text-gray-500">
            Delivered
          </h2>
          <h1 className="text-3xl font-bold">
            {deliveredOrders}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaTruck className="text-yellow-500 text-3xl mb-4" />
          <h2 className="text-gray-500">
            Pending
          </h2>
          <h1 className="text-3xl font-bold">
            {pendingOrders}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaMoneyBillWave className="text-purple-600 text-3xl mb-4" />
          <h2 className="text-gray-500">
            Revenue
          </h2>
          <h1 className="text-3xl font-bold">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h1>
        </div>

      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer, email or Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-xl px-4 py-3"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

      </div>
            {/* Orders Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Order Date</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Update Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (

              filteredOrders.map((order, index) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold">
                    {index + 1}
                  </td>

                  <td className="p-4 font-semibold">
                    {order.user?.name || "N/A"}
                  </td>

                  <td className="p-4 text-gray-600">
                    {order.user?.email || "N/A"}
                  </td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">

                      {order.items?.map((item, i) => (

                        <div
                          key={i}
                          className="text-sm"
                        >
                          <span className="font-medium">
                            {item.product?.name || "Deleted Product"}
                          </span>

                          <span className="text-gray-500">
                            {" "}
                            × {item.quantity}
                          </span>

                        </div>

                      ))}

                    </div>
                  </td>

                  <td className="p-4 font-bold text-blue-600">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-16 text-xl text-gray-500"
                >
                  🚫 No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
            {/* Footer */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">

        <div className="text-gray-500">
          Showing{" "}
          <span className="font-semibold">
            {filteredOrders.length}
          </span>{" "}
          Orders
        </div>

        <button
          onClick={() => fetchOrders()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Refresh Orders
        </button>

      </div>

    </AdminLayout>
  );
}

export default AdminOrders;