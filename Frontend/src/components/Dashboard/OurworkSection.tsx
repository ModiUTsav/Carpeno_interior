import React, { useState, useEffect, useRef } from 'react';
import { Box,  Grid, Card, Skeleton, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// Import your downloaded video files
import video1 from '/work1.mp4'; // Replace with your actual paths
import video2 from '/work2.mp4';
import video3 from '/work3.mp4';
import video4 from '/work4.mp4';
import video5 from '/work5.mp4';
import video6 from '/work6.mp4';
import {  styled } from '@mui/system';

const PlayIconOverlay = styled(Box)(() => ({
   position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
    zIndex: 1, // Ensure it's above the video
    transition: 'opacity 0.3s ease-in-out', 
    
}));

const workItems = [
    { type: 'video', src: video1, xs: 4, sm: 6, md: 4, lg: 3, height: '260px', width:'350px', margin:'0px,2px', gap: '0px' }, // Example: Standard size
    { type: 'video', src: video2, xs: 4, sm: 6, md: 4, lg: 4, height: '260px', width:'450px', margin: '0px', gap: '0px' }, // Example: Standard size
    { type: 'video', src: video3, xs: 4, sm: 12, md: 4, lg: 3, height: '260px', width:'350px', margin: '0px', gap: '0px' }, // Example: Standard size

    // Large featured item for the second row, spanning more columns
    { type: 'video', src: video4, xs: 4, sm: 12, md: 4, lg: 3.7, height: '260px', width:'400px', margin: '0px', gap: '0px' }, // This will be the larger item
    { type: 'video', src: video5, xs: 4, sm: 6, md: 4, lg: 2.5, height: '260px', width:'300px', margin:'10px,5px,5px,10px', gap: '0px' }, // Smaller item next to the large one
    { type: 'video', src: video6, xs: 4, sm: 6, md: 4, lg: 4, height: '260px', width:'500px', margin: '0px', gap: '0px' }, // Another smaller item
] as const;


const OurWorkSection: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [servicesRef, servicesInView] = useInView({
        triggerOnce: true,
        rootMargin: "-50px",
      });
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box ref={servicesRef} className="pt-16 pb-16" sx={{ backgroundColor: 'white' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="container mx-auto"
            >
                <h2 className="text-3xl font-bold text-center mb-8 text-black">
                    Our Work
                </h2>
                <Grid container spacing={4}  justifyContent="center"  >
                    {workItems.map((item, index) => (
                        <Grid  size={{xs:item.xs, sm:item.sm,md:item.md,lg:item.lg}}  key={index}> {/* Adjust grid breakpoints for responsiveness */}
                            <WorkItem item={item} loading={loading}  />
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
            
        </Box>
    );
};

interface WorkItemProps {
     item: { type: 'video'; src: string; xs: number; sm: number; md: number; lg: number; height: string , width:string, margin:string , gap:string};
    loading: boolean;
}

const WorkItem: React.FC<WorkItemProps> = ({ item, loading }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Failed to play video:", error);
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (item.type === 'video' && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Card
            sx={{
               width: '90%', // Card takes full width of its Grid item
                height: item.height, // Use the height defined in workItems
                margin: item.margin,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                overflow: 'hidden', // To contain the video within the card
                position: 'relative', // For absolute positioning of play icon overlay
                borderRadius: '8px', // Slightly rounded corners like the image
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                gap: item.gap,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
                <>
                    <video
                        ref={videoRef}
                        src={item.src}
                        className="w-full h-full object-cover" // Ensure video fills the card
                        muted
                        loop
                        playsInline // Recommended for mobile autoplay
                    />
                     <PlayIconOverlay sx={{ opacity: isHovering ? 0 : 1 }}>
                        <IconButton sx={{ color: '#ff5858' }} aria-label="play video">
                            <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                    </PlayIconOverlay>
                </>
            )}
        </Card>
    );
};


export default OurWorkSection;