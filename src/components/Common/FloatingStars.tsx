import { motion } from "framer-motion";

const stars = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 90}%`,
  top: `${Math.random() * 90}%`,
  size: `${8 + Math.random() * 12}px`,
  delay: Math.random() * 2,
}));

export default function FloatingStars() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0.7, y: 0 }}
          animate={{ opacity: [0.7, 1, 0.7], y: [0, -20, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
          style={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
        >
          <span className="block w-full h-full text-yellow-300 text-opacity-80" style={{ fontSize: star.size }}>
            ★
          </span>
        </motion.div>
      ))}
    </div>
  );
}