const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Assigned: "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
  "In Progress": "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};
 
function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
 
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${style}`}>
      {status}
    </span>
  );
}

export default StatusBadge;