"use client";
import React, { FC, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEvents } from "@/context/EventsContext";
import EventForm from "./EventForm";
import CustomDialog from "./Dialog";

import DayEvents from "./DayEvents";

interface CalendarProps {}

const Calendar: FC<CalendarProps> = ({}) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { events } = useEvents();

  const handleDateClick = (arg: DateClickArg) => {
    setOpenDialog(true);
    setSelectedDay(arg.date);
  };

  useEffect(() => {}, [events]);
  return (
    <main className="   ">
      <div className="text-right">
        <div className=" bg-blue-600 p-2 rounded text-white inline-block">
          <CustomDialog title="Create New Event" triggerString="New Event">
            <EventForm />
          </CustomDialog>
        </div>
      </div>
      {selectedDay && (
        <div>
          <CustomDialog
            title="Events on this day"
            triggerString=""
            open={openDialog}
            setOpen={setOpenDialog}
          >
            <DayEvents selectedDate={selectedDay} />
          </CustomDialog>
        </div>
      )}
      <FullCalendar
        height={"85vh"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        dateClick={handleDateClick}
        events={events}
        headerToolbar={{
          left: "prev today next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        // eventClick={eventActions}
      />
    </main>
  );
};

export default Calendar;
