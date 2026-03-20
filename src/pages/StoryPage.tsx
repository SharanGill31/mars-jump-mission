import { useNavigate } from "react-router-dom";
import { motion, type Variants} from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa";
import FloatingStars from "../components/Common/FloatingStars";

const planetVariants: Variants = {
  hidden: { scale: 0.7, opacity: 0, y: 40 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.2, 
      duration: 0.7, 
      type: "spring" 
    },
  }),
};

export default function StoryPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("marsUserName") || "Explorer";

  return (
    <div className="min-h-screen ... relative overflow-hidden">
  <FloatingStars />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Space themed background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute left-10 top-10 w-24 h-24 bg-green-200 rounded-full opacity-30 blur-lg" />
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
          className="mb-4"
        >
          <FaUserAstronaut className="text-5xl text-blue-500" />
        </motion.div>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-4 text-center"
        >
          Hi {userName}! 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-700 mb-6 text-center"
        >
          Welcome to Mars! Did you know that Mars has much weaker gravity than Earth? That means you can jump much higher here!
        </motion.p>
        <div className="flex justify-center items-end gap-8 mb-6 w-full">
          <motion.div
            custom={0}
            variants={planetVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Earth */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-blue-300 border-4 border-blue-700 flex items-center justify-center shadow-lg"
            >
              <span className="text-3xl">🌍</span>
            </motion.div>
            <span className="mt-2 text-blue-700 font-bold text-lg">Earth</span>
          </motion.div>
          <motion.div
            custom={1}
            variants={planetVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Mars */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 via-orange-300 to-yellow-200 border-4 border-red-700 flex items-center justify-center shadow-lg"
            >
              <span className="text-3xl">🪐</span>
            </motion.div>
            <span className="mt-2 text-red-700 font-bold text-lg">Mars</span>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-md md:text-lg text-pink-600 mb-4 text-center"
        >
          On Mars, you can jump almost <span className="font-bold">three times higher</span> than on Earth!
        </motion.p>
        <button
          onClick={() => navigate("/gravity")}
          className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-2xl font-bold shadow-lg transition-all mt-2"
        >
          🛰️ Start Gravity Experiment
        </button>
      </motion.div>
    </div>
    </div>
  );
}