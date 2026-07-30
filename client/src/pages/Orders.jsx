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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-slate-800 mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <FaBoxOpen className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            No Orders Yet
          </h2>
          <p className="text-gray-500 mt-2">
            Start shopping to see your orders here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg border p-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-5">
                <div>
                  <p className="text-gray-500 text-sm">Order ID</p>
                  <h2 className="font-semibold text-lg">
                    #{order._id.slice(-8)}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="text-right mt-4 md:mt-0">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  <h3 className="text-2xl font-bold mt-3 text-blue-600">
                    ₹{order.totalPrice}
                  </h3>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex items-center justify-between border rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover border"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                          ❌
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product?.name || "Product Deleted"}
                        </h3>

                        <p className="text-gray-500">
                          Quantity : {item.quantity}
                        </p>

                        {item.product && (
                          <p className="font-bold text-blue-600">
                            ₹{item.product.price}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.product && (
                      <h3 className="font-bold text-lg">
                        ₹{item.product.price * item.quantity}
                      </h3>
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