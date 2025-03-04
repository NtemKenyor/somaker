import Image from "next/image";
import Navbar from "./components/navbar";
import Hero from "./hero";

export default function Home() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,_#195B41,_black_60%)] w-full overflow-hidden min-h-screen">
        <Navbar />
        <Hero />
        
      </div>
  );
}
