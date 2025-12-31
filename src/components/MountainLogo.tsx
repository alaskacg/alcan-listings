import { motion } from "framer-motion";

const MountainLogo = () => {
  return (
    <div className="w-9 h-9 relative">
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with rotating glow */}
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          className="fill-primary/20 stroke-primary/40"
          strokeWidth="1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: 1,
          }}
          transition={{ 
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.5 }
          }}
        />
        
        {/* Rotating outer ring */}
        <motion.circle
          cx="20"
          cy="20"
          r="19"
          fill="none"
          className="stroke-primary/30"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: "center" }}
        />
        
        {/* Back mountain - darker/muted with subtle float */}
        <motion.path
          d="M8 30 L16 16 L24 30 Z"
          className="fill-mountain-granite/60"
          initial={{ y: 10, opacity: 0 }}
          animate={{ 
            y: [0, -1, 0],
            opacity: 1 
          }}
          transition={{ 
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            },
            opacity: { duration: 0.6, delay: 0.2 }
          }}
        />
        
        {/* Front mountain - primary with gentle hover */}
        <motion.path
          d="M14 30 L24 12 L34 30 Z"
          className="fill-primary"
          initial={{ y: 10, opacity: 0 }}
          animate={{ 
            y: [0, -1.5, 0],
            opacity: 1 
          }}
          transition={{ 
            y: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: { duration: 0.6, delay: 0.4 }
          }}
        />
        
        {/* Snow cap on front mountain with shimmer */}
        <motion.path
          d="M24 12 L21 18 L24 16 L27 18 Z"
          className="fill-white dark:fill-white/90"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [1, 0.8, 1],
            scale: 1 
          }}
          transition={{ 
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: { duration: 0.4, delay: 0.7 }
          }}
        />
        
        {/* Shimmer effect traveling across */}
        <motion.ellipse
          cx="26"
          cy="20"
          rx="2"
          ry="4"
          className="fill-white/40"
          initial={{ opacity: 0, x: -8 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            x: [-8, 8, -8]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary shimmer */}
        <motion.circle
          cx="18"
          cy="24"
          r="1.5"
          className="fill-mountain-gold/50"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 4,
            delay: 2
          }}
        />
      </svg>
    </div>
  );
};

export default MountainLogo;
