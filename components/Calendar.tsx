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
  const {
    events,
    setEvents,
    createEvent,
    getEventsByDay,
    deleteEvent,
    editEvent,
    getEventDetails,
  } = useEvents();

  const handleDateClick = (arg: DateClickArg) => {
    let id = Math.random().toString(36).substring(2);
    createEvent({
      title: "event 3",
      date: arg.date,
      id,
      allDay: arg.allDay,
    });
    console.log("Events on this Day!!");
    console.log(getEventsByDay(arg.date));
  };
  const eventActions = (arg: EventClickArg) => {
    console.log("Event !! clicked");
    // deleteEvent(arg.event.id);
    const event = getEventDetails(arg.event.id);
    if (!event) {
      return null;
    }
    event.title = "Hello";
    editEvent(event);
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