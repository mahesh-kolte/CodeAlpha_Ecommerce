import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-blue-50 flex items-center justify-center mb-8">
          <FaExclamationTriangle className="text-4xl text-blue-500" />
        </div>

        <h1 className="text-8xl font-extrabold text-slate-900 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl font-bold text-slate-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-500 mt-3 leading-relaxed">
          जी page तू शोधतोयस ती इथे नाहीये — कदाचित लिंक चुकीची आहे किंवा
          page हलवली गेली आहे.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-400 text-slate-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaSearch />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;