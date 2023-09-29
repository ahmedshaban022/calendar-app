import { useEvents } from "@/context/EventsContext";
import { event } from "@/types/calenderTypes";
import Link from "next/link";
import { FC } from "react";

interface EventCardProps {
  event: event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const { deleteEvent } = useEvents();
  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
  };
  let bgColor = "bg-white";
  switch (event.priority) {
    case "medium":
      bgColor = "bg-yellow-200";
      break;
    case "high":
      bgColor = "bg-orange-300";
      break;
    case "urgent":
      bgColor = "bg-red-300";
      break;
    default:
      bgColor = "bg-blue-200";
  }
  return (
    <div className={`m-1 p-2 border flex justify-between rounded ${bgColor}`}>
      <div>
        <p className="font-bold text-black">{event.title}</p>

        <small className="text-black">
          {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
        </small>
      </div>
      <div className="space-x-3">
        <Link href={`/event/${event.id}`}>View</Link>
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
