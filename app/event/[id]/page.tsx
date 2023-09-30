"use client";
import CustomDialog from "@/components/Dialog";
import EventDetails from "@/components/EventDetails";
import EventForm from "@/components/EventForm";
import Priority from "@/components/Priority";
import { useEvents } from "@/context/EventsContext";
import { formatDate } from "@/lib/utils";
import { event } from "@/types/calenderTypes";
import { CalendarClock } from "lucide-react";
import Link from "next/link";
// import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {
  params: { id: string };
}

const Page: FC<pageProps> = ({ params }) => {
  return (
    <div>
      <EventDetails id={params.id} />;
    </div>
  );
};
export default Page;
