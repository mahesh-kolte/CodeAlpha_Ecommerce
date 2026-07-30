function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">
              Fast Delivery
            </h3>

            <p className="mt-3">
              We deliver products quickly across India.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">
              Secure Payment
            </h3>

            <p className="mt-3">
              Razorpay secure payment gateway.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">
              Quality Products
            </h3>

            <p className="mt-3">
              100% genuine and premium quality products.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;