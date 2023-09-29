import { useEvents } from "@/context/EventsContext";
import { getBgColorBasedOnPriority } from "@/lib/utils";
import { event } from "@/types/calenderTypes";
import Link from "next/link";
import { FC } from "react";

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
  let bgColor =
    event.status === "Completed"
      ? "bg-green-200"
      : getBgColorBasedOnPriority(event.priority);

  return (
    <div
      className={`m-1 p-2 border flex justify-between rounded ${bgColor} hover:scale-105 transition`}
    >
      <div>
        <p className="font-bold text-black">
          <Link href={`/event/${event.id}`}>{event.title}</Link>
        </p>

        <div className="space-x-3">
          <small className="text-black">
            {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
          </small>
          <small className="text-black">{event.status}</small>
        </div>
      </div>
      <div className="space-x-3">
        {event.status !== "Completed" && (
          <button
            className="py-1 px-2 text-Green-900 "
            onClick={() => handleCompleteEvent(event.id)}
          >
            Complete
          </button>
        )}
        <button
          className="py-1 px-2 text-red-900 "
          onClick={() => handleDeleteEvent(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
