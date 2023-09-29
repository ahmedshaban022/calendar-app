"use client";
import CustomDialog from "@/components/Dialog";
import EventForm from "@/components/EventForm";
import { useEvents } from "@/context/EventsContext";
import { event } from "@/types/calenderTypes";
import { CalendarClock } from "lucide-react";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {
  params: { id: string };
}

const Page: FC<pageProps> = ({ params }) => {
  const [event, setEvent] = useState<event | null | "loading">("loading");
  const { getEventDetails, deleteEvent, completeEvent } = useEvents();

  useEffect(() => {
    if (params.id) {
      const existedEvent = getEventDetails(params.id);
      if (existedEvent) {
        setEvent(existedEvent);
      } else {
        setEvent(null);
      }
    }
  }, [params, getEventDetails]);

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
              event.status === "Completed" ? "bg-green-200" : "bg-gray-100"
            } max-w-[600px]  m-auto p-5 rounded-md min-h-[300px]`}
          >
            <div className="flex justify-between my-2 ">
              <div className="flex space-x-2">
                <div className="btn-actions border-2 border-blue-600 bg-blue-400 rounded text-white px-3 py-1 ">
                  <CustomDialog title="Edit Event" triggerString="Edit">
                    <EventForm ExitedEvent={event} />
                  </CustomDialog>
                </div>
                {event.status !== "Completed" && (
                  <button
                    className="btn-actions py-1 px-2 text-white rounded  border bg-green-500 border-green-600 "
                    onClick={handleCompleteEvent}
                  >
                    Complete
                  </button>
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
            <div className="my-4 flex  justify-center font-semibold text-2xl drop-shadow-2xl shadow shadow-white ">
              <CalendarClock />
              <p> {formatDate(event.date)}</p>
            </div>

            <div>
              <div className="p-2 flex justify-between  ">
                <span>{event.allDay ? "All Day Event" : "Hourly Event "}</span>

                <span className="text-teal-700 text-md">
                  {event.priority.charAt(0).toUpperCase() +
                    event.priority.slice(1)}
                </span>
              </div>

              <div className="text-center">
                <h1 className="text-3xl my-3"> {event.title}</h1>
                {event.description && (
                  <p className="text-lg"> {event.description}</p>
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

export default Page;

function formatDate(date: Date) {
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let ampm: number | string = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour "0" should be "12"
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getDate() +
    "/" +
    new Intl.DateTimeFormat("en", { month: "short" }).format(date) +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
}
