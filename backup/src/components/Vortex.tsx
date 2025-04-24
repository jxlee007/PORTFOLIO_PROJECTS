import React from 'react';
import { motion } from 'framer-motion';

const Vortex = (props) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='your-class-name'
        >
            {props.children}
        </motion.div>
    );
};

export default Vortex; 