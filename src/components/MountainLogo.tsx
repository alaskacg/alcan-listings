import { motion } from "framer-motion";

const MountainLogo = () => {
  return (
    <div className="w-9 h-9 relative">
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          className="fill-primary/20 stroke-primary/40"
          strokeWidth="1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Back mountain - darker/muted */}
        <motion.path
          d="M8 30 L16 16 L24 30 Z"
          className="fill-mountain-granite/60"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        {/* Front mountain - primary */}
        <motion.path
          d="M14 30 L24 12 L34 30 Z"
          className="fill-primary"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        
        {/* Snow cap on front mountain */}
        <motion.path
          d="M24 12 L21 18 L24 16 L27 18 Z"
          className="fill-white dark:fill-white/90"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        />
        
        {/* Subtle shimmer effect */}
        <motion.ellipse
          cx="26"
          cy="20"
          rx="2"
          ry="4"
          className="fill-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </svg>
    </div>
  );
};

export default MountainLogo;
