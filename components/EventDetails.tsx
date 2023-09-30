"use client";

import CustomDialog from "@/components/Dialog";
import EventForm from "@/components/EventForm";
import Priority from "@/components/Priority";
import { useEvents } from "@/context/EventsContext";
import { formatDate } from "@/lib/utils";
import { event } from "@/types/calenderTypes";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface EventDetailsProps {
  id: string;
}

const EventDetails: FC<EventDetailsProps> = ({ id }) => {
  const [event, setEvent] = useState<event | null | "loading">("loading");
  const { getEventDetails, deleteEvent, completeEvent } = useEvents();

  useEffect(() => {
    if (id) {
      const existedEvent = getEventDetails(id);
      if (existedEvent) {
        setEvent(existedEvent);
      } else {
        setEvent(null);
      }
    }
  }, [id, getEventDetails]);

  if (event === "loading") {
    return (
      <div className="m-5 p-5 text-center">
        <h1 className="text-3xl animate-pulse">Loading..</h1>
      </div>
    );
  }

  const handleDeleteEvent = () => {
    if (event) {
      deleteEvent(event.id);
    }
  };
  const handleCompleteEvent = () => {
    if (event) {
      completeEvent(event.id);
    }
  };

  return (
    <div>
      <div className="m-5 p-5">
        <Link
          href="/"
          className="btn-actions px-3 py-1 rounded border-b hover:text-blue-500  shadow"
        >
          {"⬅️"} Back To Calender
        </Link>
      </div>
      {event ? (
        <div className="">
          <div
            className={`${
              event.status === "Completed" ? "bg-green-200" : "bg-blue-100"
            } max-w-[600px]  m-auto p-5 rounded-md min-h-[500px]`}
          >
            <div className="flex justify-between my-2 ">
              <div className="flex space-x-2">
                <div className="btn-actions border-2 border-blue-600 bg-blue-400 rounded text-white px-3 py-1 ">
                  <CustomDialog title="Edit Event" triggerString="Edit">
                    <EventForm ExitedEvent={event} />
                  </CustomDialog>
                </div>
                {event.status !== "Completed" ? (
                  <button
                    className="btn-actions py-1 px-2 text-white rounded  border bg-green-500 border-green-600 "
                    onClick={handleCompleteEvent}
                  >
                    Complete
                  </button>
                ) : (
                  <span className="text-green-600 mt-1">Completed</span>
                )}
              </div>
              <div>
                <button
                  className="btn-actions   py-1 px-2  text-white rounded  border bg-red-500 border-red-600"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mb-2 mt-10 flex  justify-center font-semibold text-2xl border-b-2 border-black ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-calendar-clock"
              >
                <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h5" />
                <path d="M17.5 17.5 16 16.25V14" />
                <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
              </svg>
              <p> {formatDate(event.date)}</p>
            </div>
            {event?.start && event?.end ? (
              <div className="mb-2 mt-10 flex  justify-between font-semibold  border-b border-black ">
                <p> Start: {formatDate(event?.start)}</p>
                <p> End: {formatDate(event?.end)}</p>
              </div>
            ) : null}

            <div>
              <div className="p-2 flex justify-between  ">
                <span>{event.allDay ? " Day Event" : "Hourly Event "}</span>

                <Priority priority={event.priority} />
              </div>

              <div className="text-center">
                <h1 className="text-3xl my-3 border-b border-black p-2 inline-block">
                  {event.title}
                </h1>
                {event.description && (
                  <div className=" text-start">
                    <p>Description:</p>
                    <p> {event.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-5 p-5 text-center">
          <h1 className="text-3xl animate-pulse">No Events Found</h1>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
