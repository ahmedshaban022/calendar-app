import Callender from "@/components/Callender";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="p-6 ">
      <Callender />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
