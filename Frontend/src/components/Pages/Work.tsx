import { Box, styled, Typography, Grid, useTheme } from '@mui/material'; // Import useTheme
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

// src/data/projects.ts (or you can keep it in the component for now)
export const projectsData = [
  {
    id: 'site-1',
    name: '1101 Olive-Green ',
    thumbnail1: '/pt-5.png', // Unique thumb 1
    thumbnail2: '/pt-4.png', // Unique thumb 2
    fullImages: Array.from({ length: 18 }, (_, i) => `/pr-${i + 1}.png`),
  },
  {
    id: 'site-2',
    name: 'Atishay sky',
    thumbnail1: '/pt-1.png',
    thumbnail2: '/pt-2.png',
    fullImages: Array.from({ length: 18 }, (_, i) => `/pt-${i + 1}.png`),
  },
  {
    id: 'site-3',
    name: 'F-1402 Olive-Green ',
    thumbnail1: '/pj-1.jpg',
    thumbnail2: '/pj-2.jpg',
    fullImages: Array.from({ length: 18 }, (_, i) => `/pj-${i + 1}.jpg`),
  },
  {
    id: 'site-4',
    name: 'Sankalp-Gwala',
    thumbnail1: '/mp-1.png',
    thumbnail2: '/mp-2.png',
    fullImages: Array.from({ length: 18 }, (_, i) => `/mp-${i + 1}.png`),
  },
  {
    id: 'site-5',
    name: 'Vimala Resedency',
    thumbnail1: '/vp-1.png',
    thumbnail2: '/vp-2.png',
    fullImages: Array.from({ length: 18 }, (_, i) => `/vp-${i + 1}.png`),
  },
  {
    id: 'site-6',
    name: 'Vishakha Eliana',
    thumbnail1: '/kk-1.png',
    thumbnail2: '/kk-2.png',
    fullImages: Array.from({ length: 18 }, (_, i) => `/kk-${i + 1}.png`),
  },
  {
    id: 'site-7',
    name: 'Vishakha Lake Iska',
    thumbnail1: '/ll-1.png',
    thumbnail2: '/ll-2.png',
    fullImages: Array.from({ length: 18 }, (_, i) => `/ll-${i + 1}.png`),
  },
  {
    id: 'site-8',
    name: 'Veinza',
    thumbnail1: '/za-1.png',
    thumbnail2: '/za-2.png',
    fullImages: Array.from({ length: 13 }, (_, i) => `/za-${i + 1}.png`),
  },
  {
    id: 'site-9',
    name: 'Imperia Vista',
    thumbnail1: '/ip-1.png',
    thumbnail2: '/ip-2.png',
    fullImages: Array.from({ length: 11 }, (_, i) => `/ip-${i + 1}.png`),
  },
  {
    id: 'site-10',
    name: 'Malabar Exotica',
    thumbnail1: '/mb-1.png',
    thumbnail2: '/mb-3.png',
    fullImages: Array.from({ length: 18 }, (_, i) => `/mb-${i + 1}.png`),
  },
  {
    id: 'site-11',
    name: 'Aspira',
    thumbnail1: '/aa-4.jpg',
    thumbnail2: '/aa-5.jpg',
    fullImages: Array.from({ length: 16 }, (_, i) => `/aa-${i + 1}.jpg`),
  },
  {
    id: 'site-12',
    name: 'swarnim sentosa',
    thumbnail1: '/ss-1.png',
    thumbnail2: '/ss-3.png',
    fullImages: Array.from({ length: 16 }, (_, i) => `/ss-${i + 1}.png`),
    
  }
];

const Work: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // Access the Material-UI theme for breakpoints

  const PageTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4),
    position: 'relative',
    textAlign: 'center',
    width: 'fit-content',
    margin: '0 auto',
    fontSize: '2rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      bottom: '-10px',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '2px',
      backgroundColor: '#c9b399',
      borderRadius: '2px',
    },
  }));

  const ProjectCard = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[1],
    cursor: 'pointer', // Indicate that it's clickable
    '& img': {
      width: '100%',
      height: 'auto',
      marginBottom: theme.spacing(1),
    },
    '& .project-name': {
      fontWeight: 'bold',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: { xs: '1rem', sm: '1.25rem' }, // Responsive font size for project name
      color: '#c9b399',
    },
    // Responsive hover effect: only scale on larger screens
    '@media (hover: hover) and (pointer: fine)': {
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)', // Slightly less aggressive scale for cards
      },
    },
  }));

  const handleCardClick = (projectId: string) => {
    navigate(`/work/${projectId}`); // Navigate to the detail page
  };


  return (
    <Box
      className="relative w-full min-h-screen flex flex-col items-center bg-white"
      sx={{paddingY: { xs: 15, md: 5 }, paddingX:{xs: 5, md: 5}}}
    >
      {/* Header - Logo */}
       <Box className="absolute" sx={{ top: { xs: 16, sm: 16,md: 32 }, left: { xs: 16, sm: 16,md: 64 } }}  onClick={()=>navigate('/')}>
                      <img
                          
                        src="/logo.svg"
                        alt="Logo"
                        className="w-auto"
                        style={{  height: theme.spacing(12), maxWidth:theme.spacing(50) }} // Adjust logo size for responsiveness
                      />
                    </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: { xs: '80px', sm: '80px', md: '120px' }, // Responsive top padding
          paddingBottom: { xs: 4, sm: 4, md: 8 }, // Responsive bottom padding
          width: '100%',
          maxWidth: '1200px',
          px: { xs: 2, sm: 3, md: 8 }, // Horizontal padding for the main content
        }}
      >
        <PageTitle>Projects</PageTitle>

        {/* Project Grid */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }} // Responsive spacing
          sx={{ mt: { xs: 4, sm: 6, md: 8 }, width: '100%' }} // Responsive top margin
        >
          {projectsData.map((project) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 6 }} // One-third width on large screens (3 projects per row)
              key={project.id}
            >
              <ProjectCard onClick={() => handleCardClick(project.id)}>
                <Typography variant="h6" className="project-name">
                  {project.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'center' }}>
                  <img
                    src={project.thumbnail1}
                    alt={`${project.name} thumbnail 1`}
                    style={{
                      maxWidth: '48%',
                      height: 'auto',
                      objectFit: 'cover', // Ensures images cover the area without distortion
                      borderRadius: theme.shape.borderRadius, // Match card border radius
                    }}
                  />
                  <img
                    src={project.thumbnail2}
                    alt={`${project.name} thumbnail 2`}
                    style={{
                      maxWidth: '48%',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: theme.shape.borderRadius,
                    }}
                  />
                </Box>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Fixed Right Sidebar for "Projects" text */}
       <Box
                                    sx={{
                                        position: 'absolute', // Positioned relative to the parent Box
                                        top: 0,
                                        right: 0,
                                        width: { xs: '60px',sm: '80px' ,md: '100px' }, // Fixed width (adjust as needed)
                                        height: '100%', // Full height of the parent
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
                                        zIndex: 20, // Higher than carousel, lower than main content
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between', // Distribute items vertically
                                        paddingY: 2, // Vertical padding
                                        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                                         // Optional subtle shadow
                                    [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
          [theme.breakpoints.up('sm')]: {
            display: 'flex',
          },
                                        }}
                                >
                                    {/* Top elements: Home and Hamburger Menu */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 4, // Space between elements
                                            marginTop: 3, // Adjust top margin
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ writingMode: 'horizontal-lr', textOrientation: 'upright', color: 'text.secondary', font: 'bold' }}>
                                            Project
                                        </Typography>
                                        
                                    </Box>
                                    </Box>
    </Box>
  );
};

export default Work;