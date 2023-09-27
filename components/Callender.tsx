"use client";
import { FC, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

import { event } from "@/types/calenderTyps";
import { EventClickArg } from "@fullcalendar/core/index.js";

interface CallenderProps {}

const Callender: FC<CallenderProps> = ({}) => {
  // toast.success("Successfully toasted!");
  const [events, setEvents] = useState<event[]>([
    { title: "event 1", date: "2023-09-26" },
    { title: "event 2", date: "2023-09-27" },
  ]);

  const handleDateClick = (arg: DateClickArg) => {
    console.log("clicked");
    console.log(arg);
    setEvents([...events, { title: "event 3", date: arg.dateStr }]);
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

export default Callender;
