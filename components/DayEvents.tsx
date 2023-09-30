"use client";
import React, { FC, useEffect, useState } from "react";
import EventCard from "./EventCard";
import { event } from "@/types/calenderTypes";
import { useEvents } from "@/context/EventsContext";

interface DayEventsProps {
  selectedDate: Date | null;
}

const DayEvents: FC<DayEventsProps> = ({ selectedDate }) => {
  const [dayEvents, setDayEvents] = useState<event[]>([]);
  const { getEventsByDay, events } = useEvents();

  useEffect(() => {
    if (selectedDate) {
      setDayEvents(getEventsByDay(selectedDate));
    }
  }, [selectedDate, events]);
  return (
    <div className="overflow-y-auto max-h-[60vh] overflow-x-hidden">
      {dayEvents.length > 0 ? (
        dayEvents.map((event) => (
          <React.Fragment key={event.id}>
            <EventCard event={event} />
          </React.Fragment>
        ))
      ) : (
        <div>Free Day 😊</div>
      )}
    </div>
  );
};

export default DayEvents;
