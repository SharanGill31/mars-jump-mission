import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import IntroPage from "./pages/IntroPage";
import StoryPage from "./pages/StoryPage";
import Gravity from "./pages/Gravity"; 
import GamePage from "./pages/GamePage";
import SummaryPage from "./pages/SummaryPage";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
} as const;

const pageTransition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
} as const;

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              <IntroPage />
            </motion.div>
          }
        />
        <Route
          path="/story"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              <StoryPage />
            </motion.div>
          }
        />
        <Route
          path="/gravity"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              <Gravity />
            </motion.div>
          }
        />
        <Route
          path="/game"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              <GamePage />
            </motion.div>
          }
        />
        <Route
          path="/summary"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="h-full"
            >
              <SummaryPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-200 via-orange-100 to-yellow-100 px-2">
        <div className="w-full max-w-md md:max-w-2xl bg-white rounded-xl shadow-lg p-4 md:p-8 my-8">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}