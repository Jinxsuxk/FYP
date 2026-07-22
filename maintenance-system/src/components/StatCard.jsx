function StatCard({ icon, label, value, tint }) {
  const tints = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tints[tint]}`}>
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-1">{value}</h2>
    </div>
  );
}

export default StatCard;