"use client";
import { event } from "@/types/calenderTyps";
import React, { createContext, useContext, useEffect } from "react";

type contextProps = {
  children: React.ReactNode;
};
type contextType = {
  events: event[];
  setEvents: React.Dispatch<React.SetStateAction<event[]>>;
  createEvent?: (event: event) => void;
  updateEvent?: (event: event) => void;
  deleteEvent?: (id: string) => void;
  getEventsByDay?: (date: Date | string) => event[];
};
export const eventContext = createContext<contextType | null>(null);
export default function EventsContextProvider({ children }: contextProps) {
  const [events, setEvents] = React.useState<event[]>([
    { title: "event 1", date: "2023-09-26", id: "1", allDay: true },
    {
      title: "event 2",
      date: "2023-09-27",
      id: "2",
      description: "test",
      allDay: false,
    },
  ]);
  useEffect(() => {
    const localEvents = localStorage.getItem("events");
    if (localEvents) {
      const parsedEvents = JSON.parse(localEvents);
      if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
        setEvents(parsedEvents);
      }
    }
  }, []);

  return (
    <eventContext.Provider value={{ events, setEvents }}>
      {children}
    </eventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(eventContext);
  if (context === null) {
    throw new Error("useEvents must be used within a EventsContextProvider");
  }
  return context;
}
