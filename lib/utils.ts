import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return Math.random().toString(36).substring(2);
};

export function formatDate(date: Date) {
  date = new Date(date); //? to return the date object after  Json parsing
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let ampm: number | string = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour "0" should be "12"
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getDate() +
    "/" +
    new Intl.DateTimeFormat("en", { month: "short" }).format(date) +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
}
