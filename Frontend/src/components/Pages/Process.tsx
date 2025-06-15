import { Box, styled, Typography, useTheme, } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Process: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: '3.5rem', // Adjust font size as needed
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(4), // Space above the title
    position: 'relative',
    textAlign: 'center', // Center the title
    width: 'fit-content', // Make the underline only as wide as the text
    margin: '0 auto', // Center the title itself
    paddingBottom: '10px', // Space for the underline
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      bottom: '0px', // Adjust position below text, closer to the text
      transform: 'translateX(-50%)',
      width: '150px', // Shorter underline width as seen in the image
      height: '2px', // Thinner underline
      backgroundColor: '#c9b399', // Underline color
      borderRadius: '1px',
    },
  }));
  const SectionImage = styled('img')(({ theme }) => ({
  width: '100%', // Allow image to take full width of its container
  maxWidth: '550px', // Adjusted max-width for better balance, you can play with this
  height: 'auto',
  // Consider gap to be applied on the SectionContainer level, not here
  // gap: theme.spacing(3), // This property does not apply to img
  // Responsive adjustments for image when in column layout
  [theme.breakpoints.down('md')]: {
    maxWidth: '80%', // Limit image size when stacked vertically
    margin: '0 auto', // Center image when stacked
  },
}));

  interface SectionContainerProps {
    reverse?: boolean;
  }

  const SectionContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'reverse',
})<SectionContainerProps>(({ theme, reverse = false }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(6), // Increased gap between image and text for desktop
  marginBottom: theme.spacing(8),
  flexDirection: reverse ? 'row-reverse' : 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(4), // Reduced gap when stacked
  },
}));

// Inside your return:
<SectionContainer>
  <Box sx={{ flexShrink: 0, width: { xs: '100%', md: '50%' } }}> {/* Give image container explicit width */}
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'black' }}>Define</Typography>
    <SectionImage src="/pr-1.svg" alt="Define Process" />
  </Box>
  <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '50%' } }}> {/* Give text container explicit width */}
    {/* ... Typography content ... */}
  </Box>
</SectionContainer>
  
  return (
    <Box
      className="relative w-full min-h-screen flex flex-col items-center bg-white"
      sx={{ overflowX: 'hidden' , paddingY: { xs: 15, md: 5 }, paddingX:{xs: 7, md: 5} }} // Overall vertical padding for the page content
      
       // Prevent horizontal scroll due to absolute positioning
    >
      {/* Header - Logo */}
      <Box className="absolute top-4 md:top-8 left-4 md:left-16 z-30 "  onClick={()=>navigate('/')}>
        <img
          src="/logo.svg" // Make sure this path is correct
          alt="Logo"
          className="h-30 md:h-13 w-auto" // Adjust h-25 if it's too large, h-13 might be too small
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
          paddingTop: '100px', // Adjust this to push content down from the top bar
          paddingBottom: '40px', // Some space at the bottom before layout's footer
          width: '100%',
          maxWidth: '1200px', // Max width for the content for better readability
          px: { xs: 2, sm: 4, md: 8 }, // Horizontal padding for the main content
        }}
      >
        <PageTitle>Process</PageTitle>
        <Typography variant="h5" sx={{ fontWeight: 'bold',mt: 2, mb: 8, color: 'text.secondary', textAlign: 'center' }}>
          3'D Formula
        </Typography>

        {/* Define Section */}
        {/* Image on left, text on right for desktop */}
        <SectionContainer>
          <Box sx={{ flexShrink: 0 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'black' }}>Define</Typography>

            <SectionImage src="/pr-1.svg" alt="Define Process" />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ flexGrow: 1, color: 'GrayText', textAlign: { xs: 'center', md: 'left' } }}>
              We begin by deeply understanding your vision, lifestyle, and space needs. This stage is all about listening and exploring — your preferences, budget, and purpose of the space. Whether it’s a cozy home or a stylish office, we define the essence of your project before putting pen to paper.
              <br /><br />
              <Typography component="span" sx={{ fontWeight: 'bold', color: 'black' }}>&#10003; What this stage includes:</Typography>
              <Box component="ul" sx={{ listStyleType: 'disc', pl: 2, mt: 1, color: 'GrayText' }}>
                <li style={{ marginLeft: '1.5em' }}>Site visit & measurement</li>
                <li style={{ marginLeft: '1.5em' }}>Client consultation & requirement gathering</li>
                <li style={{ marginLeft: '1.5em' }}>Style preferences & mood board inputs</li>
                <li style={{ marginLeft: '1.5em' }}>Budget alignment & timeline discussion</li>
              </Box>
            </Typography>
          </Box>
        </SectionContainer>

        {/* Design Section */}
       
        <SectionContainer reverse> {/* Use reverse prop for row-reverse */}
          <Box sx={{ flexShrink: 0 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'black' }}>Design</Typography>
            <SectionImage src="/pr-2.svg" alt="Design Process" />
          </Box>
          <Box sx={{ flexGrow: 1 }}>

            <Typography variant="body1" sx={{ flexGrow: 1, color: 'GrayText', textAlign: { xs: 'center', md: 'left' } }}>
              Once we have clarity, our designers work their magic. We develop 3D visual layout options, material samples, and color schemes — everything tailored to your taste. The design isn’t just about looking good; it’s about how you feel and function in the space.
              <br /><br />
              <Typography component="span" sx={{ fontWeight: 'bold', color: 'black',pl: 2, mt: 1, }}>💡 What we do here:</Typography>
              <Box component="ul" sx={{ listStyleType: 'disc', pl: 2, mt: 1, color: 'GrayText', textAlign: { xs: 'center', sm: 'center',md: 'left' } }}>
                <li style={{ marginLeft: '1.5em' }}>2D space planning and layout</li>
                <li style={{ marginLeft: '1.5em' }}>3D renders and material board</li>
                <li style={{ marginLeft: '1.5em' }}>Revisions based on feedback</li>
                <li style={{ marginLeft: '1.5em' }}>Final design approval with execution-ready drawings</li>
              </Box>
            </Typography>
          </Box>
        </SectionContainer>

        {/* Deliver Section */}
        {/* Image on left, text on right for desktop */}
        <SectionContainer> {/* No reverse prop for standard row */}
          <Box sx={{ flexShrink: 0 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: { xs: 'center', md: 'left' }, color: 'black' }}>Deliver</Typography>
            <SectionImage src="/pr-3.svg" alt="Deliver Process" />
          </Box>
          <Box sx={{ flexGrow: 2 }}>

            <Typography variant="body1" sx={{ flexGrow: 1, color: 'GrayText', textAlign: { xs: 'center', md: 'left' } }}>
              With designs approved, we get to work on the ground. Our execution team, vendors, and project managers come together to ensure quality craftsmanship, timely delivery, and smooth coordination. We keep you in the loop throughout — because a great design deserves an even better delivery.
              <br /><br />
              <Typography component="span" sx={{ fontWeight: 'bold', color: 'black' }}>  ✒️ How we bring this step to life:</Typography>
              <Box component="ul" sx={{ listStyleType: 'disc', pl: 2, mt: 1, color: 'GrayText' }}>
                <li style={{ marginLeft: '1.5em' }}>On-site execution with project supervision</li>
                <li style={{ marginLeft: '1.5em' }}>Quality control of materials and workmanship</li>
                <li style={{ marginLeft: '1.5em' }}>Final handover and client walkthrough</li>
                <li style={{ marginLeft: '1.5em' }}>Post-completion support and feedback</li>
              </Box>
            </Typography>
          </Box>
        </SectionContainer>
      </Box>

      {/* Fixed Right Sidebar */}
      
      <Box
                                    sx={{
                                        position: 'absolute', // Positioned relative to the parent Box
                                        top: 0,
                                        right: 0,
                                        width: { xs: '30px',sm: '50px' ,md: '80px' }, // Fixed width (adjust as needed)
                                        height: '100%', // Full height of the parent
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
                                        zIndex: {xs: 20, md: 10}, // Higher than carousel, lower than main content
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between', // Distribute items vertically
                                        paddingY: 2, // Vertical padding
                                        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
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
                                        <Typography variant="body2" sx={{ writingMode: {xs: 'vertical-rl', sm: 'horizontal-lr', md: 'horizontal-lr'}, textOrientation: 'upright', color: 'text.secondary', font: 'bold' }}>
                                            Process
                                        </Typography>
                                        
                                    </Box>
                                    </Box>
    </Box>
  );
};

export default Process;