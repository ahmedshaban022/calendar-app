"use client";
import { event } from "@/types/calenderTyps";
import React, { createContext, useContext, useEffect, useState } from "react";

type contextProps = {
  children: React.ReactNode;
};
type contextType = {
  events: event[];
  setEvents: React.Dispatch<React.SetStateAction<event[]>>;
  getEventDetails: (id: string) => event | null;
  createEvent: (event: event) => void;
  editEvent: (event: event) => void;
  deleteEvent: (id: string) => void;
  getEventsByDay: (date: Date) => event[];
};
export const eventContext = createContext<contextType | null>(null);
export default function EventsContextProvider({ children }: contextProps) {
  const [events, setEvents] = useState<event[]>([]);

  useEffect(() => {
    const localEvents = localStorage.getItem("events");
    if (localEvents) {
      const parsedEvents = JSON.parse(localEvents);
      if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
        setEvents(parsedEvents);
      }
    }
  }, []);
  const createEvent = (event: event) => {
    setEvents([...events, event]);
  };
  const editEvent = (event: event) => {
    const newEvents: event[] = events.map((e) => {
      return e.id === event.id ? event : e;
    });
    setEvents([...newEvents]); //! need to fix
  };
  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };
  const getEventsByDay = (selectedDayDate: Date) => {
    return events.filter((e) => {
      return (
        e.date.getFullYear() === selectedDayDate.getFullYear() &&
        e.date.getMonth() === selectedDayDate.getMonth() &&
        e.date.getDate() === selectedDayDate.getDate()
      );
    });
  };
  const getEventDetails = (id: string) => {
    const event = events.find((e: event) => e.id === id);
    if (event) return event;
    return null;
  };
  return (
    <eventContext.Provider
      value={{
        events,
        setEvents,
        createEvent,
        editEvent,
        deleteEvent,
        getEventDetails,
        getEventsByDay,
      }}
    >
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
