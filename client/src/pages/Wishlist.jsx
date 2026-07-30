import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setWishlist(data.wishlist);

    } catch (err) {
      console.log(err);
      toast.error("Failed To Load Wishlist");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length > 0 ? (

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {wishlist.map((item) => (
            <ProductCard
              key={item._id}
              product={item.product}
            />
          ))}

        </div>

      ) : (

        <div className="text-center text-gray-500 text-xl py-20">
          No Products In Wishlist ❤️
        </div>

      )}

    </div>
  );
}

export default Wishlist;