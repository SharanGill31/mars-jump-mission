import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import FloatingStars from "../components/Common/FloatingStars";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
} as const; 
const titleVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, type: "spring" } },
} as const; 

const iconVariants = {
  hidden: { rotate: -30, scale: 0.7, opacity: 0 },
  visible: { rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.8, type: "spring" } },
} as const; 
 
export default function IntroPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("marsUserName", name.trim());
      navigate("/story");
    }
  };

  return (
    <div className="min-h-screen ... relative overflow-hidden">
  <FloatingStars />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200 relative overflow-hidden">
      {/* Space themed background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-10 top-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 blur-lg" />
        <div className="absolute right-10 bottom-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-lg" />
        <div className="absolute left-1/2 top-1/3 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-lg" />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col items-center"
      >
        <motion.div variants={iconVariants} initial="hidden" animate="visible" className="mb-4">
          <FaRocket className="text-6xl text-pink-500 animate-bounce" />
        </motion.div>
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6 text-center"
        >
          Welcome to the Mars Jump Mission!
        </motion.h1>
        <form onSubmit={handleStart} className="w-full flex flex-col items-center">
          <label className="text-lg md:text-xl font-semibold text-blue-700 mb-2" htmlFor="name">
            What's your name?
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border-2 border-purple-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 p-3 text-lg md:text-xl mb-6 transition-all bg-white"
            autoFocus
            required
          />
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-2xl font-bold shadow-lg transition-all mb-2"
            disabled={!name.trim()}
          >
            🚀 Start Mission
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Get ready to jump higher on Mars!
        </div>
      </motion.div>
    </div>
    </div>
  );
}