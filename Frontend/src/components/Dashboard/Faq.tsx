import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  // Add more FAQ items here
];

const FAQSection: React.FC = () => {
  return (
    <Box className="py-16 px-4" sx={{ backgroundColor: 'white' }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontSize: '2.5rem' }}>
        FAQ
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
    </Box>
  );
};

export default FAQSection;