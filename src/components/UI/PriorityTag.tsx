type Props = {
  priority: "low" | "medium" | "high";
};

const priorityStyles = {
  low: "bg-green-100 text-green-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
};

const PriorityTag = ({ priority }: Props) => {
  return (
    <span className={`w-24 text-center capitalize inline-block text-xs font-semibold px-2 py-1 rounded-full ${priorityStyles[priority]}`}>
      {priority}
    </span>
  );
};

export default PriorityTag;
