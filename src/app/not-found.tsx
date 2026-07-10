import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div>
      <div>
        <Image
          src="/404Handler.jpg"
          alt="404 World Cup Trophy Not Found"
          fill
          className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-[#0a0f18]/40 to-transparent"></div>
    
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 mt-160">
        <Link href="/">
          <Button   
            className="bg-[#39ff14] hover:bg-[#32d711] font-[12px] font-medium px-5 py-5
            rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] transition-all duration-300"
          >
            Back to Pitchside
          </Button>
        </Link>
      </div>
    </div>
  );
}