import { FC } from "react";

interface PriorityProps {
  priority: string;
}

const Priority: FC<PriorityProps> = ({ priority }) => {
  let bgColor = "";
  switch (priority) {
    case "low":
      bgColor = "bg-blue-200";
      break;
    case "medium":
      bgColor = "bg-yellow-200";
      break;
    case "high":
      bgColor = "bg-orange-200";
      break;
    case "urgent":
      bgColor = "bg-red-200";
      break;
  }
  return (
    <span className={`text-black px-2 py-1 rounded font-bold  ${bgColor}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default Priority;
