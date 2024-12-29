"use client";
import { signIn, useSession } from "next-auth/react";
import { BackgroundBeams } from "./background-beams";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpinner";
import { opacityAnimation5, appearUpAnimationFast } from "@/packages/features/animations/gsap-animations";

export default function LandingHero() {
  const [loading, setLoading] = useState(false)
  const { status } = useSession()
  const isSignedIn = status === "authenticated" ? true : false
  const router = useRouter()

  useEffect(() => {
    appearUpAnimationFast()
    opacityAnimation5()
  }, [])


  return (
    <div className="h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased ">
      <div className="max-w-full  p-4">
        <h1 className="relative z-10 text-2xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold opacityAnimation-5 opacity-0" id="landing-title"
        >
          Unleash the power of AI
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10  appearUpAnimation-fast opacity-0 translate-y-10" >
          Generate stunning visuals, write flawless code, and chat with smart intelligence – all for free!
        </p>
      </div>

      <Button
        className="relative z-50 gap-4 flex bg-[#2a2a2a] hover:bg-transparent text-white appearUpAnimation-fast opacity-0 translate-y-10"
        id="get-started"
        onClick={() => {
          setLoading(true)
          if (isSignedIn) {
            router.push("/dashboard")
          } else {
            setLoading(true)
            signIn(undefined, { callbackUrl: '/dashboard' });
          }
        }}
      >
        {isSignedIn ? "Visit Dashboard" : "Get Started"} {loading ? <LoadingSpinner className="border-white" /> : <ArrowRight />}
      </Button>

      <BackgroundBeams />


    </div>
  );
}
