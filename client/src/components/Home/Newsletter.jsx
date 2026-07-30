function Newsletter() {
  return (
    <section className="bg-blue-600 py-16 text-white">
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-3xl font-bold">
          Subscribe Newsletter
        </h2>

        <p className="mt-4">
          Get latest offers and updates.
        </p>

        <div className="flex mt-8">

          <input
            type="email"
            placeholder="Enter Email"
            className="flex-1 p-4 rounded-l-xl text-black"
          />

          <button className="bg-black px-8 rounded-r-xl">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;