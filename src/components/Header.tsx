import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-8 px-4 relative overflow-hidden"
    >
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center items-center gap-4 mb-4"
        >
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            ההיסטוריה של היקום
          </h1>
          <Globe className="w-8 h-8 text-blue-400" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-blue-100 mb-4"
        >
          מסע מרתק מהמפץ הגדול ועד מהפכת הבינה המלאכותית
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center items-center gap-2 text-purple-200"
        >
          <Clock className="w-5 h-5" />
          <span className="text-lg">13.7 מיליארד שנות התפתחות במבט אחד</span>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
