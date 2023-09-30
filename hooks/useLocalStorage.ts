import { event } from "@/types/calenderTypes";
import React, { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: event[] | null) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) {
    const parsedValue: event[] = JSON.parse(savedValue);
    return parsedValue;
  }
  if (initialValue) {
    return initialValue;
  } else {
    return [];
  }
}
export default function useLocalStorage(
  key: string,
  initialValue: event[] | null
) {
  const [value, setValue] = useState<event[]>(() => {
    return getSavedValue(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return { value, setValue };
}