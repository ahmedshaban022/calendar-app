"use client";
import { FC, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

import { EventClickArg } from "@fullcalendar/core/index.js";
import { useEvents } from "@/context/EventsContext";

interface CalendarProps {}

const Calendar: FC<CalendarProps> = ({}) => {
  // toast.success("Successfully toasted!");
  const { events, setEvents } = useEvents();

  const handleDateClick = (arg: DateClickArg) => {
    console.log("clicked");
    console.log(arg);
    let id = Math.random().toString(36).substring(2);
    if (Array.isArray(events)) {
      setEvents([
        ...events,
        { title: "event 3", date: arg.dateStr, id, allDay: false },
      ]);
    }
  };
  const eventActions = (arg: EventClickArg) => {
    console.log("Event !! clicked");
    console.log(arg);
  };
  return (
    <main className=" w-[60rem] ">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        dateClick={handleDateClick}
        events={events}
        headerToolbar={{
          left: "prev today next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={eventActions}
      />
    </main>
  );
};

export default Calendar;
