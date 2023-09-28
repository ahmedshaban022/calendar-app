import { useEvents } from "@/context/EventsContext";
import { event } from "@/types/calenderTyps";
import { FC, useEffect, useState } from "react";

interface EventFormProps {
  ExitedEvent?: event;
}

const EventForm: FC<EventFormProps> = ({ ExitedEvent }) => {
  const [event, setEvent] = useState<event>({
    id: "",
    title: "",
    date: new Date(),
    description: "",
    allDay: true,
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    if (ExitedEvent) {
      setEvent(ExitedEvent);
    }
  }, [ExitedEvent]);

  const { createEvent, editEvent } = useEvents();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!event || !event.title) {
      setErrorMsg("Title is required");
      return;
    }
    setErrorMsg("");
    if (ExitedEvent) {
      editEvent({ ...event });
      return;
    } else {
      const id = Math.random().toString(36).substring(2);
      createEvent({ ...event, id });
    }
  };
  return (
    <div className="w-[60rem] border p-4 my-4">
      <form onSubmit={handleSubmit} className="flex flex-col p-4">
        <input
          type="text"
          name="title"
          value={event?.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          placeholder="Title"
          className="w-full p-2 m-2 rounded border border-black "
        />
        <textarea
          name="description"
          value={event?.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 m-2 rounded border border-black  "
        />
        <div className=" m-2  p-2 space-x-2 text-lg text-center">
          <input
            type={event.allDay ? "date" : "datetime-local"}
            name="date"
            onChange={(e) => {
              setEvent({ ...event, date: new Date(e.target.value) });
            }}
            required
          />

          <input
            type="checkbox"
            name="allDay"
            id="allDay"
            checked={event.allDay}
            onChange={(e) => setEvent({ ...event, allDay: e.target.checked })}
          />
          <label htmlFor="allDay">All Day </label>
        </div>
        <div className="text-orange-600 my-2">
          {errorMsg && <p>{errorMsg} </p>}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
