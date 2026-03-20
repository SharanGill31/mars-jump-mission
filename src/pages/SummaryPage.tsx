import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAstronaut, FaRocket } from "react-icons/fa";
import FloatingStars from "../components/Common/FloatingStars";

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("marsUserName") || "Explorer";

  return (
    <div className="min-h-screen ... relative overflow-hidden">
  <FloatingStars />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Space themed background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-10 top-10 w-24 h-24 bg-yellow-200 rounded-full opacity-30 blur-lg" />
        <div className="absolute right-10 bottom-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-lg" />
        <div className="absolute left-1/2 top-1/3 w-16 h-16 bg-pink-300 rounded-full opacity-20 blur-lg" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-6 md:p-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-4 flex gap-4"
        >
          <FaUserAstronaut className="text-5xl text-blue-500" />
          <FaRocket className="text-5xl text-pink-500" />
        </motion.div>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 text-center"
          style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
        >
          Great job, {userName}!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-700 mb-6 text-center"
          style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
        >
          You learned that gravity is weaker on Mars!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-xl p-4 mb-6 flex flex-col items-center border-2 border-yellow-300"
        >
          <span className="text-xl font-extrabold text-pink-600 mb-2" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>Learning Summary:</span>
          <ul className="text-lg text-purple-700 list-disc pl-6" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}>
            <li>Gravity is weaker on Mars than Earth 🌌</li>
            <li>You can jump much higher on Mars 🚀</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-6 flex gap-2 text-4xl"
        >
          <span role="img" aria-label="stars">🎉</span>
          <span role="img" aria-label="planet">🪐</span>
          <span role="img" aria-label="rocket">🚀</span>
          <span role="img" aria-label="confetti">✨</span>
        </motion.div>
        {/* Confetti celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none"
        >
          <span className="text-5xl">🎉✨🌟</span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.08, backgroundColor: '#f87171' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-xl bg-gradient-to-br from-pink-500 via-yellow-300 to-purple-400 hover:bg-pink-600 text-white text-2xl font-extrabold shadow-lg transition-all mt-2"
          style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }}
        >
          Restart Mission
        </motion.button>
      </motion.div>
    </div>
    </div>
  );
};

export default SummaryPage;
