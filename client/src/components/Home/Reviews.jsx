function Reviews() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="shadow rounded-xl p-6">
            ⭐⭐⭐⭐⭐
            <p className="mt-3">
              Amazing products and fast delivery.
            </p>
            <h4 className="font-bold mt-4">Mahesh</h4>
          </div>

          <div className="shadow rounded-xl p-6">
            ⭐⭐⭐⭐⭐
            <p className="mt-3">
              Excellent shopping experience.
            </p>
            <h4 className="font-bold mt-4">Rahul</h4>
          </div>

          <div className="shadow rounded-xl p-6">
            ⭐⭐⭐⭐⭐
            <p className="mt-3">
              Best quality at affordable prices.
            </p>
            <h4 className="font-bold mt-4">Priya</h4>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Reviews;