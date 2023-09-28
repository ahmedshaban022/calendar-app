import Calendar from "@/components/Calendar";
import EventsContextProvider from "@/context/EventsContext";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="p-6 ">
      <EventsContextProvider>
        <Calendar />
        <Toaster position="top-center" reverseOrder={false} />
      </EventsContextProvider>
    </main>
  );
}
