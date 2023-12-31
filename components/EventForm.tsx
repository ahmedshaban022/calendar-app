import { useEvents } from "@/context/EventsContext";
import { generateId } from "@/lib/utils";
import { event } from "@/types/calenderTypes";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    priority: "low",
    status: "ToDo",
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
      toast.success("Successfully edited !!");
      return;
    } else {
      const id = generateId();
      createEvent({ ...event, id });
      toast.success("Successfully created !!");
      setEvent({
        id: generateId(),
        date: new Date(),
        title: "",
        description: "",
        allDay: true,
        priority: "low",
        status: "ToDo",
      });
    }
  };
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //! need to refactor
    if (
      e.target.value === "low" ||
      e.target.value === "medium" ||
      e.target.value === "high" ||
      e.target.value === "urgent"
    ) {
      setEvent({ ...event, priority: e.target.value });
    }
  };
  return (
    <div className=" border p-4 my-4">
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
          <div>
            <input
              type="checkbox"
              name="allDay"
              id="allDay"
              checked={event.allDay}
              onChange={(e) => setEvent({ ...event, allDay: e.target.checked })}
            />
            <label htmlFor="allDay"> All day </label>
          </div>

          <div className="grid grid-cols-5 border border-black p-2 my-2 mx-1  text-sm">
            <label className="col-span-2" htmlFor="startDate">
              Start Date :
            </label>
            <input
              className="col-span-3"
              type={event.allDay ? "date" : "datetime-local"}
              name="date"
              id="startDate"
              onChange={(e) => {
                setEvent({
                  ...event,
                  date: new Date(e.target.value),
                  start: new Date(e.target.value),
                });
              }}
              required={!event.date}
            />
          </div>
          <div className="grid grid-cols-5 border border-black p-2 m-1  text-sm">
            <label htmlFor="endDate" className="col-span-2 ">
              End Date (optional):
            </label>
            <input
              className="col-span-3"
              id="endDate"
              type={event.allDay ? "date" : "datetime-local"}
              name="date"
              onChange={(e) => {
                setEvent({
                  ...event,
                  end: new Date(e.target.value),
                });
              }}
            />
          </div>
        </div>
        <div>
          <select
            name="priority"
            value={event?.priority}
            onChange={handleDropdownChange}
            className="w-full p-2 m-2 rounded border border-black "
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="text-orange-600 my-2">
          {errorMsg && <p>{errorMsg} </p>}
        </div>
        <button className="btn-actions bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
