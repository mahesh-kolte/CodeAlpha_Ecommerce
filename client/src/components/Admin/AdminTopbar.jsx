function AdminTopbar() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome Admin 👋
        </p>
      </div>

      <img
        src="https://ui-avatars.com/api/?name=Admin"
        alt="Admin"
        className="rounded-full"
      />

    </div>
  );
}

export default AdminTopbar;