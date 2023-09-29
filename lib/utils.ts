import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return Math.random().toString(36).substring(2);
};

export const getBgColorBasedOnPriority = (
  priority: "low" | "medium" | "high" | "urgent"
) => {
  let bgColor = "";
  switch (priority) {
    case "medium":
      bgColor = "bg-yellow-200";
      break;
    case "high":
      bgColor = "bg-orange-300";
      break;
    case "urgent":
      bgColor = "bg-red-300";
      break;
    default:
      bgColor = "bg-blue-200";
  }
  return bgColor;
};
