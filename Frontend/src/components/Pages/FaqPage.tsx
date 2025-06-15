import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, styled, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const faqData = [
  {
    question: '1. What is the process for working with your interior design team?',
    answer: 'Our process begins with a consultation to understand your vision, lifestyle, and budget. After that, we create a customized design plan that includes mood boards, layout options, and material suggestions. Once approved, we handle everything from sourcing to installation, ensuring a smooth, turnkey experience.',
  },
  {
    question: '2. How much does interior design typically cost?',
    answer: 'Costs vary based on the size and scope of your project. We offer flexible packages—from single-room makeovers to full-home renovations. After our initial consultation, we provide a clear estimate that includes design fees, furnishings, and labor so you know exactly what to expect.',
  },
  {
    question: '3. Can you work with my existing furniture or do I need to buy everything new?',
    answer: 'Absolutely! We can incorporate your existing furniture and decor into the new design if they align with your vision. Our goal is to enhance your space while maximizing what you already love and own.',
  },
  {
    question: '4. How long does an interior design project usually take?',
    answer: ' The timeline depends on the size and complexity of the project. A single room might take 2–4 weeks, while full-home renovations can take several months. We provide a detailed timeline after the design is approved to keep everything on track.'
  },
  {
    question: '5.  Do you offer virtual or remote interior design services?',
    answer: "Yes, we offer virtual design consultations and full-service remote design packages. Whether you're across the country or prefer a contactless process, we can deliver creative solutions and detailed design plans digitally."
  },
  {
    question: "6. What styles do you specialize in?",
    answer: "Our team is experienced in a wide range of styles, including modern, minimalist, traditional, bohemian, industrial, and more. We tailor every project to reflect your personal taste and functional needs, rather than forcing a single design style."
  },
  {
    question: "7. Can you help with renovations and contractor coordination?",
    answer: "Yes! We often collaborate with contractors, architects, and builders to ensure the design is executed perfectly. We can manage timelines, material selection, and communication to ensure your project runs smoothly from start to finish."
  }
  // Add more FAQ items here
];
const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem', // Adjust font size as needed
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(7), // Space below the title
  marginTop: theme.spacing(1), // Space above the title
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: '-10px', // Adjust position below text
    transform: 'translateX(-50%)',
    width: '100px', // Underline width
    height: '2px', // Underline thickness
    backgroundColor: '#c9b399', // Underline color
    borderRadius: '2px',
  },
}));
const FAQPage: React.FC = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box className=" w-full " sx={{ position:'relative',backgroundColor:'white', minHeight: '100vh', // Ensures it takes at least full viewport height
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center content horizontally
                paddingY: { xs: 15, md: 28 }, // Overall vertical padding for the page content
                paddingX: { xs: 3, md: 4 }  }}>
        <div className="absolute top-4 md:top-8 left-4 md:left-16"   onClick={()=>navigate('/')}>
                                <img
                                    src="/logo.svg"
                                    alt="Logo"
                                    className="h-25 md:h-13 w-auto"
                                />
                            </div>
      <PageTitle>
        FAQ
      </PageTitle>
      <Typography variant="h2" align="center" gutterBottom sx={{  color: '#333', fontSize: '1.5rem' }}>
        QUESTION AND YOUR QUERY
      </Typography>
      
      <Box maxWidth="800px" mx="auto" px={2}>
        {faqData.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography fontWeight="bold">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
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
                                  boxShadow: '-2px 0 5px rgba(0,0,0,0.1)', // Optional subtle shadow
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
                                      FAQ
                                  </Typography>
                                  
                              </Box>
                              </Box>
    </Box>
  );
};

export default FAQPage;