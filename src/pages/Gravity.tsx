import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa";
import FloatingStars from "../components/Common/FloatingStars";

const MIN_WEIGHT = 20;
const MAX_WEIGHT = 100;
const EARTH_GRAVITY = 1;
const MARS_GRAVITY = 2.6;
// 120 is the safety ceiling. Max possible jump is ~104cm.
const MAX_JUMP_LIMIT = 120; 

function calcJumpHeight(weight: number, gravity: number) {
  const base = Math.max(10, 50 - weight / 2);
  return Math.round(base * gravity * 10) / 10;
}

export default function GravityPage() {
  const [weight, setWeight] = useState(40);
  const [planet, setPlanet] = useState<"earth" | "mars">("earth");
  const navigate = useNavigate();

  const earthJump = calcJumpHeight(weight, EARTH_GRAVITY);
  const marsJump = calcJumpHeight(weight, MARS_GRAVITY);

  // Mathematical cap to ensure percentage never exceeds 100%
  const getWidth = (jump: number) => {
    const percentage = (jump / MAX_JUMP_LIMIT) * 100;
    return Math.min(percentage, 100); 
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
    setPlanet("earth");
    setTimeout(() => setPlanet("mars"), 100);
  };

  return (
    <div className="min-h-screen ... relative overflow-hidden">
  <FloatingStars />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 p-4">
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center border border-white">
        
        <h1 className="text-2xl font-black text-purple-700 mb-2">Gravity Experiment</h1>
        <p className="text-xs text-blue-600 mb-8 text-center px-4 leading-tight">
          Adjust your weight to see how high you can jump!
        </p>

        {/* Slider Section */}
        <div className="w-full mb-10 px-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weight</span>
            <span className="text-xl font-black text-pink-600">{weight} kg</span>
          </div>
          <input
            type="range"
            min={MIN_WEIGHT}
            max={MAX_WEIGHT}
            value={weight}
            onChange={handleSlider}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

        {/* Comparison Section - THE FIX IS HERE */}
        <div className="w-full grid grid-cols-2 gap-8 mb-8">
          
          {/* Earth Column - min-w-0 stops flex-grow */}
          <div className="flex flex-col items-center min-w-0 overflow-hidden">
            <span className="font-black text-blue-600 text-xs uppercase mb-6">Earth</span>
            
            <div className="h-20 flex items-end mb-4">
              <motion.div
                animate={{ y: planet === "earth" ? [0, -earthJump * 0.5, 0] : 0 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <FaUserAstronaut className="text-5xl text-blue-500" />
              </motion.div>
            </div>
            
            {/* Earth Bar */}
            <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden relative">
              <motion.div
                animate={{ width: `${getWidth(earthJump)}%` }}
                className="h-full bg-blue-500 rounded-full"
                transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              />
            </div>
            <span className="mt-3 text-[10px] font-black text-blue-800 uppercase text-center truncate w-full">
              Jump: {earthJump}cm
            </span>
          </div>

          {/* Mars Column - min-w-0 stops flex-grow */}
          <div className="flex flex-col items-center min-w-0 overflow-hidden">
            <span className="font-black text-red-600 text-xs uppercase mb-6">Mars</span>
            
            <div className="h-20 flex items-end mb-4">
              <motion.div
                animate={{ y: planet === "mars" ? [0, -marsJump * 0.5, 0] : 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <FaUserAstronaut className="text-5xl text-pink-500" />
              </motion.div>
            </div>

            {/* Mars Bar - THE CRITICAL BOX */}
            <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden relative">
              <motion.div
                animate={{ width: `${getWidth(marsJump)}%` }}
                className="h-full bg-pink-500 rounded-full"
                transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              />
            </div>
            <span className="mt-3 text-[10px] font-black text-pink-800 uppercase text-center truncate w-full">
              Jump: {marsJump}cm
            </span>
          </div>

        </div>

        <div className="w-full bg-pink-50 rounded-2xl p-4 mb-6 border border-pink-100">
          <p className="text-[11px] md:text-xs text-pink-600 font-bold text-center">
            On Mars, you jump much higher because gravity is 62% weaker!
          </p>
        </div>

        <button
          onClick={() => navigate("/game")}
          className="w-full py-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-lg font-black shadow-xl shadow-pink-100 active:scale-95 transition-all"
        >
          🚀 Play the Rocket Game
        </button>
      </div>
    </div>
    </div>
  );
}