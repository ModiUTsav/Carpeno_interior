// src/components/ProjectDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { projectsData } from '../Pages/Work'; // Adjust path as needed

const DetailImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  // Responsive hover effect: only scale on larger screens
  // On smaller screens, a subtle visual cue or no transform might be better
  '@media (hover: hover) and (pointer: fine)': { // Apply hover only on devices that support it
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)', // Slightly less aggressive scale
    },
  },
});

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Project not found!</Typography>
        <Button variant="contained" onClick={() => navigate('/work')} sx={{ mt: 2 }}>
          Back to Projects
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: 2, sm: 4, md: 8 }, // Responsive padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px', mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/work')}
          variant="outlined"
          sx={{
            mb: { xs: 2, sm: 4 }, // Responsive bottom margin
            color: '#c9b399',
            borderColor: '#c9b399',
            fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
            padding: { xs: '6px 12px', sm: '8px 16px' } // Responsive padding
          }}
        >
          Back to Projects
        </Button>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
            mb: { xs: 3, sm: 4 } // Responsive bottom margin
          }}
        >
          {project.name}
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}> {/* Responsive spacing between grid items */}
          {project.fullImages.map((imageUrl, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}  // On medium screens (desktops), take one-third width (3 images per row)
              key={index}
            >
              <DetailImage src={imageUrl} alt={`${project.name} image ${index + 1}`} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProjectDetail;