import React from 'react';
import { Box, Grid } from '@mui/material';

import { motion } from 'framer-motion';

import Ganeshji from '/c1.svg';
import safal from '/c2.svg';
import satayagrah from '/c3.svg';
import sankalp from '/c4.svg';


const clientImages = [
  Ganeshji,
  safal,
  satayagrah,
  sankalp
];

const ClientSection: React.FC = () => {
 
  const chunkedImages = [];
  for (let i = 0; i < clientImages.length; i += 4) {
    chunkedImages.push(clientImages.slice(i, i+4 ));
  }

  const loopImages= [...chunkedImages, ...chunkedImages, ...chunkedImages]; // Duplicate for infinite scroll

  return (
    <Box className='py-20 pt-16 bg-white'>
      <h2 className="text-3xl font-bold text-center mb-8 text-black mt-10">
        Our Clients from following Projects
      </h2>

      <motion.div
        className="flex "
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 60, // Control scroll speed
         
          }}
      >
        
          
      {loopImages.map((group,index)=>(
        <Grid
        container
        spacing={3}
        key={index}
        size={{xs:3}}
        className="w-1/2 flex-shrink-0"
              justifyContent="center"
              alignItems="center"
        > 
        {group.map((src, idx) => (
                        <Grid size={{xs:3}} key={idx}>
                          <img
                            src={src}
                            alt={`vendor-${idx}`}
                            className="w-full max-h-20 object-contain"
                          />
                        </Grid>
                      ))}
          
        </Grid>
      ))}

      </motion.div>
      
        
      
    </Box>
  );
};

export default ClientSection;