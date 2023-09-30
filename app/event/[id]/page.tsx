import EventDetails from "@/components/EventDetails";
import { FC } from "react";

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
