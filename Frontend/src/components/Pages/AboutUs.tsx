import React from 'react';
import { Box, Typography, styled, useTheme } from '@mui/material';

// --- Assets ---
import CarpEnoLogoLarge from '/logo.svg';
import { useNavigate } from 'react-router-dom';

// --- Styled Components for the About Us Page Content ---

const MainContentArea = styled(Box)(({ theme }) => ({
  // The padding-top here should account for your fixed header's height
  // If your Layout component already adds global padding-top, you might remove this.
  paddingTop: '80px', // Example: Adjust based on your header's actual height
  minHeight: '100vh', // Ensures the page takes at least full viewport height
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundImage: "white", // Or `url(${DottedBackground})` if you use an image
  backgroundRepeat: 'repeat',
  backgroundSize: '20px 20px',
  backgroundColor: '#f5f5f5',
  // Use responsive padding for consistency
  paddingY: { xs: theme.spacing(5), md: theme.spacing(12) }, // Adjusted vertical padding
  paddingX: { xs: theme.spacing(3), md: theme.spacing(4) },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(6),
  marginTop: theme.spacing(4),
  position: 'relative',
  textTransform: 'uppercase',
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
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '4.5rem',
  },
}));

const ContentSectionWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  padding: theme.spacing(2, 2), // Consistent horizontal padding for all screens
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0), // Adjust if you want less padding on larger screens
  },
}));

const AboutUsContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  gap: theme.spacing(8),
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(4), // Reduced gap when stacked
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    paddingRight: 0,
    marginBottom: theme.spacing(4),
  },
}));

const LargeLogoSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    order: -1, // Puts the logo above text on small screens if desired, or remove
    marginBottom: theme.spacing(4), // Add spacing below logo when stacked
  },
}));

const LargeLogo = styled('img')({
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  opacity: 1.2,
});

const BulletPointList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: '0 auto', // Center the list horizontally
  maxWidth: '600px', // Limit width for readability
  // Adjust horizontal padding for smaller screens
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const BulletPointItem = styled('li')({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '8px',
});

const BulletIcon = styled(Typography)<{ color?: string }>(({ theme, color }) => ({
  marginRight: theme.spacing(1.5),
  fontSize: '1.2rem',
  lineHeight: 1,
  color: color || theme.palette.text.primary,
}));


const AboutUsPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MainContentArea>
      {/* Top Left Logo - Positioned Absolute */}
      <Box
        className="absolute top-4 md:top-8 left-4 md:left-16 z-30"
        sx={{
          height: { xs: '60px', sm: '80px', md: '60px' },
          width: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={()=>navigate('/')}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            height: '100%',
            width: 'auto',
            display: 'block',
          }}
        />
      </Box>

      <PageTitle variant="h3">ABOUT US</PageTitle>

      {/* Main Content (Text and Large Logo) */}
      <AboutUsContentContainer>
        <TextSection>
          <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, marginBottom: theme.spacing(4) }}>
            At Carpeno Interiors, we believe that a well-designed space is not just seen — it's felt. Founded with
            the purpose of making interior design more accessible yet premium, we bring decades of combined
            executive experience into every corner, color, and contour we touch.
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8 }}>
            Our leadership comes with years of hands-on industry insight, project management finesse, and deep
            material knowledge — ensuring that every project flows smoothly, from blueprint to final brushstroke.
            Whether you're building your first home or elevating your forever space, Carpeno delivers with its
            signature 3Ds Process – Define, Design, Deliver. Every phase is powered by practical know-how,
            creative precision, and a team that understands how materials behave, age, and come alive in real
            spaces.
          </Typography>
        </TextSection>

        <LargeLogoSection>
          <LargeLogo src={CarpEnoLogoLarge} alt="Large Carpeno Logo" />
        </LargeLogoSection>
      </AboutUsContentContainer>

      {/* "What Makes Us Different" Section */}
      <ContentSectionWrapper sx={{ mt: theme.spacing(3) }}>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          sx={{ fontWeight: 'semibold', marginBottom: theme.spacing(4), color: "black", textAlign: 'center' }}
        >
          What Makes Us Different:
        </Typography>
        <BulletPointList> {/* Removed hardcoded marginLeft */}
          <BulletPointItem>
            <BulletIcon color={theme.palette.error.main}>&bull;</BulletIcon>
            <Typography variant="body1" color="text.primary">
             🎯 Led by seasoned professionals with real site experience
            </Typography>
          </BulletPointItem>
          <BulletPointItem>
            <BulletIcon color={theme.palette.error.main}>&bull;</BulletIcon>
            <Typography variant="body1" color="text.primary">
             🧱 Strong command over materials, textures & execution flow
            </Typography>
          </BulletPointItem>
          <BulletPointItem>
            <BulletIcon color={theme.palette.error.main}>&bull;</BulletIcon>
            <Typography variant="body1" color="text.primary">
             🧰 Meticulous design paired with solid backend processes
            </Typography>
          </BulletPointItem>
          <BulletPointItem>
            <BulletIcon color={theme.palette.error.main}>&bull;</BulletIcon>
            <Typography variant="body1" color="text.primary">
             ⏳ Timely project delivery without compromising quality
            </Typography>
          </BulletPointItem>
        </BulletPointList>
      </ContentSectionWrapper>

      {/* Motto */}
      <ContentSectionWrapper sx={{ mt: theme.spacing(1), mb: theme.spacing(8) }}>
        {/* Adjusted color and fontWeight to be part of sx prop for Typography */}
        <Typography variant="h6" align="center" fontStyle="italic" sx={{ lineHeight: 1.8, color: "#c9b399", fontWeight: "bold" }}>
          We don’t just style spaces — we engineer emotions, turning aspirations into experiences. At Carpeno,
          design runs in our veins, and detail drives our delivery.
        </Typography>
      </ContentSectionWrapper>

      {/* "Why Choose Carpeno?" Section */}
      <ContentSectionWrapper>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          sx={{ fontWeight: 'semibold', marginBottom: theme.spacing(4), color: "black", textAlign: 'center' }}
        >
          Why Choose Carpeno?
        </Typography>
        <BulletPointList> {/* Removed hardcoded marginLeft */}
          <BulletPointItem>
            <BulletIcon color={theme.palette.success.main}>&#10003;</BulletIcon>
            <Typography variant="body1" color="text.primary">
              Transparent pricing with tailored packages
            </Typography>
          </BulletPointItem>
          <BulletPointItem>
            <BulletIcon color={theme.palette.success.main}>&#10003;</BulletIcon>
            <Typography variant="body1" color="text.primary">
              Dedicated designers and project managers
            </Typography>
          </BulletPointItem>
          <BulletPointItem>
            <BulletIcon color={theme.palette.success.main}>&#10003;</BulletIcon>
            <Typography variant="body1" color="text.primary">
              3D visualization before execution
            </Typography>
          </BulletPointItem>
          <BulletPointItem>
            <BulletIcon color={theme.palette.success.main}>&#10003;</BulletIcon>
            <Typography variant="body1" color="text.primary">
              Timely delivery with regular updates
            </Typography>
          </BulletPointItem>
        </BulletPointList>
      </ContentSectionWrapper>

      {/* Fixed Right Sidebar for Navigation/Indicator */}
      <Box
        sx={{
          position: 'absolute', // Positioned relative to the parent Box
                                  top: 0,
                                  right: 0,
                                  width: { xs: '50px', sm:'50px',md: '50px' }, // Fixed width (adjust as needed)
                                  height: '100%', // Full height of the parent
                                  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
                                  zIndex: 20, // Higher than carousel, lower than main content
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
          }, // Softer shadow
        }}
      >
        <Typography
          variant="body2"
          sx={{
            writingMode: 'horizonatal-lr', // Vertical text
            textOrientation: 'upright',
            color: 'text.secondary',
            fontWeight: 'bold',
            marginTop: 3,
             // Rotate to read top-to-bottom
          }}
        >
          About Us
        </Typography>
      </Box>
    </MainContentArea>
  );
};

export default AboutUsPage;