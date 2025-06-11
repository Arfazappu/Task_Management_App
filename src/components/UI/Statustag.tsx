type StatusProps = {
  status: "pending" | "in-progress" | "completed";
};

const statusStyles = {
  pending: "bg-yellow-500",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
};

const StatusTag = ({ status }: StatusProps) => {
  return (
    <span className={`w-24 text-center capitalize inline-block text-white bg- text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[status]}`}>
      {status.replace("-", " ")}
    </span>
  );
};

export default StatusTag;
