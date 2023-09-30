import { useEvents } from "@/context/EventsContext";
import { event } from "@/types/calenderTypes";
import Link from "next/link";
import { FC, useEffect } from "react";
import Priority from "./Priority";

interface EventCardProps {
  event: event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const { deleteEvent, completeEvent } = useEvents();
  const handleCompleteEvent = (id: string) => {
    completeEvent(id);
  };
  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
  };

  return (
    <div
      className={`m-1 p-2 border flex justify-between rounded ${
        event.status === "Completed" ? "bg-green-200" : "bg-blue-100"
      } hover:shadow-xl transition`}
    >
      <div className="">
        <p className="my-1 p-1 font-bold text-black">
          <Link
            href={`/event/${event.id}`}
            className="btn-actions hover:text-blue-500 transition"
          >
            {event.title}
          </Link>
        </p>

        <div className=" !text-xs ">
          <Priority priority={event.priority} />
          {/* <small className="text-black">{event.status}</small> */}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-center ">
        {event.status !== "Completed" ? (
          <button
            className="btn-actions py-1 px-2 text-Green-900 bg-green-600 text-white  rounded "
            onClick={() => handleCompleteEvent(event.id)}
          >
            Complete
          </button>
        ) : (
          <span className="text-green-600">Completed</span>
        )}
        <button
          className="btn-actions py-1 px-2 text-white bg-red-500  rounded "
          onClick={() => handleDeleteEvent(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
