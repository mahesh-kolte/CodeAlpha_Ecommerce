function NewArrivals({ products }) {
  const newArrivals = products.filter((p) => p.newArrival);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>

      {newArrivals.length === 0 ? (
        <p>No New Arrivals</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg"
              />

              <h3 className="font-bold mt-3">
                {product.name}
              </h3>

              <p className="text-blue-600 font-semibold">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default NewArrivals;