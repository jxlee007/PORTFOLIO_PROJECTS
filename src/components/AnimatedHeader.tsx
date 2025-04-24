import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHeader = ({ children }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ color: 'black', fontSize: '4rem' , marginBottom: '1rem' , fontWeight: 'bold' }}
    >
      {children}
    </motion.h1>
  );
};

export default AnimatedHeader;
