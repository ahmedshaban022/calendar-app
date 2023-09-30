"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { event } from "@/types/calenderTypes";
import React, { createContext, useContext } from "react";

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
  completeEvent: (id: string) => void;
};
export const eventContext = createContext<contextType | null>(null);
export default function EventsContextProvider({ children }: contextProps) {
  const { value: events, setValue: setEvents } = useLocalStorage("events", []);

  const createEvent = (event: event) => {
    setEvents([...events, event]);
  };
  const editEvent = (event: event) => {
    const newEvents: event[] = events.map((e) => {
      return e.id === event.id ? event : e;
    });
    setEvents([...newEvents]);
  };
  const deleteEvent = (id: string) => {
    const newEvents = events.filter((e) => e.id !== id);
    setEvents([...newEvents]);
  };
  const getEventsByDay = (selectedDayDate: Date) => {
    return events.filter((e) => {
      //! need to refactor
      e.date = new Date(e.date); //? to get the date object Because of localStorage JSON changing
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
  const completeEvent = (id: string) => {
    const newEvents: event[] = events.map((e) => {
      return e.id === id ? { ...e, status: "Completed" } : e;
    });
    setEvents([...newEvents]);
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
        completeEvent,
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
