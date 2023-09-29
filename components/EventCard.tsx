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
  return (
    <div className="m-1 p-2 border flex justify-between">
      <p className="font-bold">{event.title}</p>
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
