 import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBoxOpen } from "react-icons/fa";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
      case "Processing":
        return "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200";
      case "Shipped":
        return "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500";
      case "Processing":
        return "bg-sky-500";
      case "Shipped":
        return "bg-violet-500";
      case "Delivered":
        return "bg-emerald-500";
      case "Cancelled":
        return "bg-rose-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-medium text-indigo-600 tracking-wide uppercase mb-1">
          Your account
        </p>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          My Orders
        </h1>
        <p className="text-slate-500 mt-2">
          {orders.length > 0
            ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed so far`
            : "Track and review everything you've bought"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-16 text-center">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <FaBoxOpen className="text-3xl text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            No orders yet
          </h2>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            Once you place an order, it'll show up here with live status and delivery details.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-6 py-5 bg-slate-50/60 border-b border-slate-100">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Order
                  </p>
                  <h2 className="font-mono font-semibold text-slate-800 text-lg">
                    #{order._id.slice(-8)}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(order.status)}`} />
                    {order.status}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    ₹{order.totalPrice}
                  </h3>
                </div>
              </div>

              {/* Products */}
              <div className="divide-y divide-slate-50">
                {order.items.map((item, index) => (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
                          <FaBoxOpen className="text-xl" />
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {item.product?.name || "Product deleted"}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          Qty {item.quantity}
                          {item.product && (
                            <span className="text-slate-400"> · ₹{item.product.price} each</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {item.product && (
                      <span className="font-bold text-slate-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;