import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import FloatingStars from "../components/Common/FloatingStars";

const options = [
  { label: "Earth", value: "earth" },
  { label: "Mars", value: "mars" },
];

const rocketVariants: Variants = {
  idle: {
    y: 0,
    scale: 1,
    rotate: [0, 5, -5, 0],
    transition: { 
      duration: 1, 
      repeat: Infinity, 
      repeatType: "loop" as const 
    },
  },
  bounce: {
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    transition: { 
      duration: 0.6, 
      type: "spring" as const 
    },
  },
  launch: {
    y: -250,
    scale: 1.2,
    rotate: 0,
    transition: { 
      duration: 1, 
      type: "spring" as const 
    },
  },
};

const confettiVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hidden: { opacity: 0, scale: 0 },
};

export default function GamePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "fail" | "launch" | "bounce">("idle");
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    setSelected(value);
    if (value === "mars") {
      setStatus("bounce");
      setTimeout(() => setStatus("launch"), 600);
      setTimeout(() => setStatus("success"), 1800);
    } else {
      setStatus("fail");
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setStatus("idle");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative overflow-hidden">
      <FloatingStars />
      <div className="relative z-10 w-full max-w-sm bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-2xl font-extrabold text-purple-700 mb-4 text-center"
        >
          Where can you jump higher?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-blue-700 mb-6 text-center"
        >
          Choose the planet:
        </motion.p>
        
        {/* Rocket animation */}
        <div className="flex flex-col items-center mb-6 h-48 relative w-full">
          <motion.div
            animate={status === "launch" ? "launch" : status === "bounce" ? "bounce" : "idle"}
            variants={rocketVariants}
            className="flex items-center justify-center"
          >
            <FaRocket className="text-7xl md:text-8xl text-pink-500 drop-shadow-lg" />
          </motion.div>
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={confettiVariants}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center"
              >
                <span className="text-4xl md:text-5xl">🎉✨🌟</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Option buttons */}
        <div className="w-full flex flex-row gap-6 mb-4 justify-center">
          {options.map(opt => (
            <motion.button
              key={opt.value}
              disabled={status === "launch" || status === "success" || status === "bounce"}
              onClick={() => handleSelect(opt.value)}
              whileHover={{ scale: 1.12, boxShadow: "0 0 16px #a78bfa" }}
              whileTap={{ scale: 0.95, rotate: -5 }}
              className={`w-32 h-20 rounded-2xl text-2xl font-extrabold shadow-lg transition-all border-4 border-purple-300 focus:outline-none outline-none ${
                selected === opt.value
                  ? "bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300 text-white scale-105 border-yellow-300"
                  : "bg-gradient-to-br from-pink-500 via-purple-400 to-yellow-200 hover:bg-pink-600 text-white"
              } ${status === "launch" || status === "success" || status === "bounce" ? "opacity-60 cursor-not-allowed" : ""}`}
              style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {status === "fail" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-xl text-red-500 font-extrabold mb-2">Oops! Try Again!</span>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#f87171' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                className="mt-2 px-6 py-2 rounded-xl bg-red-400 hover:bg-red-500 text-white text-lg font-bold shadow-md transition-all"
                style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="text-xl text-green-600 font-extrabold mb-2"
              style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
            >
              Great job! The rocket launched!
            </motion.div>
          )}
        </AnimatePresence>

        {status === "success" && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            onClick={() => navigate("/summary")}
            className="w-full py-4 rounded-xl bg-gradient-to-br from-green-400 via-yellow-300 to-pink-400 hover:bg-green-600 text-white text-2xl font-extrabold shadow-lg transition-all mt-4"
            style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
          >
            Next
          </motion.button>
        )}
      </div>
    </div>
  );
}