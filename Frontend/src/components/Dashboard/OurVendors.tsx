import React from 'react';
import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';

import hettichLogo from '/v-1.svg';
import elleyeLogo from '/v-2.svg';
import rrKabelLogo from '/v-3.svg';
import euroLogo from '/v-4.svg';
import kurlonLogo from '/v-5.svg';
import libraLogo from '/v-6.svg';
import havellsLogo from '/v-7.svg';
import eurobondLogo from '/v-8.svg';
import tesaLogo from '/v-9.svg';
import dutainLogo from '/v-10.svg';
import basfLogo from '/v-11.svg';
import lanxssLogo from '/v-12.svg';
import saintLogo from '/v-13.svg';
import modiguardLogo from '/v-14.svg';
import atombergLogo from '/v-15.svg';
import orientLogo from '/v-16.svg';
import philipsLogo from '/v-17.svg';
import reposeLogo from '/v-18.svg';

const vendorImages = [
  hettichLogo,
  elleyeLogo,
  rrKabelLogo,
  euroLogo,
  kurlonLogo,
  libraLogo,
  havellsLogo,
  eurobondLogo,
  tesaLogo,
  dutainLogo,
  basfLogo,
  lanxssLogo,
  saintLogo,
  modiguardLogo,
  atombergLogo,
  orientLogo,
  philipsLogo,
  reposeLogo,
];


const imageChunks = [];
// Split into chunks of 9 images (3x3 grid)
for(let i=0; i<vendorImages.length; i+=9){
  imageChunks.push(vendorImages.slice(i, i+9));

}


// Duplicate for infinite scroll
const loopChunks = [...imageChunks, ...imageChunks];

const OurVendors: React.FC = () => {
  return (
    <Box className="py-16  bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Our Vendors</h2>

      <Box className="w-auto overflow-hidden">
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
          {loopChunks.map((group, index) => (
            <Grid
              container
              spacing={3}
              key={index}
              className="w-1/2 flex-shrink-0"
              justifyContent="center"
              alignItems="center"
            >
              {group.map((src, idx) => (
                <Grid size={{xs:4}} key={idx}>
                  <img
                    src={src}
                    alt={`vendor-${idx}`}
                    className="w-1/2 max-h-20 object-contain"
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default OurVendors;
