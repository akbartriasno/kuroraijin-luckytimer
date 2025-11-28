'use client'

import {useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import HomeScreen from "@/components/page/home-screen";
import GameScreen from "@/components/page/game-screen";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <motion.div initial={{scale: 0}} animate={{scale: 1}}>
        <div className="inline-block max-w-xl text-center justify-center mb-6 md:mb-24">
          <Image
              src={"/images/kuro-raijin-white-logo.png"}
              width={500}
              height={126}
              className={"-mt-8"}
              alt={"Kuro Raijin Logo White"}
          />
        </div>
      </motion.div>

      {
        gameStarted ? (
          <GameScreen onBack={() => setGameStarted(false)} />
        ) : (
          <HomeScreen onStart={() => setGameStarted(true)} />
        )}

    </section>
  );
}
