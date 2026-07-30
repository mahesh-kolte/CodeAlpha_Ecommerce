function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg text-white ${color}`}
    >
      <h3 className="text-lg">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;