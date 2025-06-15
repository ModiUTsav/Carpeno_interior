import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Skeleton, Grid, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OurWorkSection from "./OurworkSection";
import OurVendors from "./OurVendors";
import FAQSection from "./Faq";
import ContactUs from "./ContactUs";
import ClientSection from "./client";
import Popup from "./PopUp";
import ClientReviews from "./Review";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import InteractiveDotGrid from "../Layout/MouseDotTrail";
import { useNavigate } from "react-router-dom";

const images = ["/img_1.svg", "/img_2.svg", "/main-3.svg"];

const services = [
  { title: "Turn-key Solution", imageUrl: "/o-1.svg" },
  { title: "Modular Solutions", imageUrl: "/o-2.svg" },
  { title: "Design and Consultancy", imageUrl: "/o-3.svg" },
  { title: "Office Interiors", imageUrl: "/o-4.svg" },
  { title: "Handpicked-Furniture", imageUrl: "/o-5.svg" },
  { title: "Artifacts & Decor", imageUrl: "/o-6.svg" },
  { title: "Landscape Designing", imageUrl: "/o-7.svg" },
  { title: "Exterior Designing", imageUrl: "/o-8.svg" },
  { title: "Renovation", imageUrl: "/o-9.svg" },
];

const HeroSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    rootMargin: "-50px",
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [selectedItem, setSelectedItem] = useState(0);
  const handleCarouselChange = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <div className="relative overflow-hidden md:min-h-screen" style={{ backgroundColor: '#f5f5f5' }} >
      {/* Hero Section */}
      <Box
        className="relative flex flex-col md:flex-row h-screen w-100%"
        sx={{ overflow: 'hidden' }}
      >
        {/* Left Content */}
        <Box
          className="w-full h-auto flex flex-col justify-center bg-white z-10 "
          sx={{
            // Responsive width: Full on small, half on medium and up
            width: { xs: '100%', md: '50%',lg:'40%' },
            px: { xs: 4, md: 16 , lg: 24}, // Responsive horizontal padding
            pt: { xs: 12, sm: 20, md: 15 , lg: 20}, // Add top padding to move content down on small screens if needed
            pb: { xs: 4, md: 0 , lg: 0}, // Add bottom padding for mobile
            minHeight: { xs: '50vh', md: '100vh', }, // Half height on mobile, full on desktop
            position: 'relative', // for positioning children like logofor positioning children like logo
          }}
        >
          <InteractiveDotGrid />
          {loading ? (
            <>
              <Skeleton variant="rectangular" width={150} height={30} className="mb-2" />
              <Skeleton variant="text" width="80%" height={60} className="mb-2" />
              <Skeleton variant="text" width="60%" height={50} className="mb-2" />
              <Skeleton variant="text" width="70%" height={80} className="mt-4" />
              <Box className="flex gap-4 mt-6">
                <Skeleton variant="rectangular" width={120} height={40} />
                <Skeleton variant="rectangular" width={120} height={40} />
              </Box>
            </>
          ) : (
            <>
              {/* Logo - Adjust positioning to be relative to the Box, not necessarily absolute in the whole hero */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 16, md: 32 },
                  left: { xs: 16, md: 64 },
                  cursor: 'pointer', // Indicate it's clickable
                }}
                onClick={handleClick}
              >
                <img
                  src="/logo.svg"
                  alt="Logo"
                  style={{
                    height: theme.spacing(12), // Smaller logo on mobile
                    maxWidth: theme.spacing(25), // Max width to ensure it doesn't get too large
                  }}
                />
              </Box>

              {/* Main Heading */}
              <Typography
                variant="h4" // Using h4 for better semantic meaning and responsive scaling
                component="h1" // Semantic h1 for the main heading of the page
                className="font-semibold text-gray-700 "
                sx={{
                  mt: { xs: 18, sm: 25, md: 30 }, // Adjust top margin responsively relative to container
                  fontSize: { xs: '2rem', sm: '3rem', md: '2.5rem', }, // Larger and more responsive font size
                  maxWidth: { xs: '100%', sm: '80%', md: '400px' }, // Constrain max width
                  lineHeight: { xs: 1.2, md: 1.1 },
                }}
              >
                We Have Best Solution <br /> For Your Home
              </Typography>
              <Box className="flex gap-4 mt-5">
                <Button variant="outlined" color='primary' onClick={() => navigate('/contact-us')}
                  sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
                >
                  Start Projects
                </Button>
                <Button variant="text" color="primary" onClick={() => navigate('/work')}
                  sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
                >
                  All Projects
                </Button>
              </Box>
            </>
          )}
        </Box>

        {/* Right Image Carousel */}
        <Box
          className="w-full h-full absolute md:relative "
          sx={{
            width: { xs: '100%',sm: '100%', md: '100%',lg:'100%' }, // Full width on mobile, half on desktop
            height: { xs: '50vh', md: '100vh', lg: '100vh' }, // Half screen height on mobile, full on desktop
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)'
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" />
          ) : (
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={3000}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              showArrows={true}
              className="h-full w-full"
              selectedItem={selectedItem}
              onChange={handleCarouselChange}
            >
              {images.map((src, index) => (
                <Box key={index} sx={{ width: {xs:'100%',sm:'100%',md:'160%',lg:'100%'},height:{xs:'100%',sm:'100%',md:'100%',lg:'100%'} }}>
                  <img
                    src={src}
                    alt={`slide-${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Ensures image covers the area, cropping if aspect ratios differ
                      display: 'block', // Prevents extra space below image
                    }}
                  />
                </Box>
              ))}
            </Carousel>
          )}

          {/* Header.svg - Positioned absolutely over the carousel */}
          {!loading && (
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '50%', sm: '50%', md: '50%',lg:'50%' }, // Adjust top to center or align on different screens
                left: { xs: '50%', sm: '50%', md: '-5%',lg: '-2.5%' }, // Center horizontally
                transform: 'translate(-50%, -50%)', // Center horizontally AND vertically initially
                zIndex: 15,
                width: { xs: '90%', sm: '70%', md: 'auto' }, // Responsive width
                maxWidth: { xs: '300px', sm: '400px', md: '500px' }, // Max width for larger screens
                height: 'auto',
              }}
            >
              <img
                src="/Header.svg"
                alt="Header"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Box>
          )}
        </Box>

        {/* Right-Side Fixed Navigation Box (Overlay) */}
        {!loading && (
          <Box
            sx={{
              position: 'absolute', // Changed from 'relative' to 'fixed' for true fixed positioning
              top: 0,
              right: 0,
              width: { xs: '50px', sm: '80px', md: '80px' }, // Responsive width
              height: '100vh',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 20,
              display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, // Hide on 'xs' screens, show on 'sm' and up
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingY: { xs: 1, sm: 2 },
              boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
            }}
          >
            {/* Top elements: Home and Hamburger Menu */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                marginTop: 3,
              }}
            >
              <Typography variant="body2" sx={{ writingMode: 'horizontal-lr', textOrientation: 'upright', color: 'text.secondary', fontWeight: 'bold', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                Home
              </Typography>
            </Box>

            {/* Middle Indicators */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '2px',
                    height: '15px',
                    backgroundColor: selectedItem === index ? 'primary.main' : 'text.secondary',
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                />
              ))}
            </Box>

            {/* Bottom element: Scroll Down Arrow */}
            <IconButton sx={{ color: 'text.primary', marginBottom: 2 }}   
  onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' })}>
              <ArrowDownwardIcon />
            </IconButton>
          </Box>
        )}
        <Popup />
      </Box>

      {/* Our Services Section */}
      <Box
      id = "services"
        ref={servicesRef}
        className="pt-16 pb-16"
        sx={{ backgroundColor: "white" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="container mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-black">
            Our Services
          </h2>
          <Grid
            container
            spacing={{ xs: 4, sm: 12,md: 8,lg:6 }} // More responsive spacing
            justifyContent="center"
            sx={{ px: { xs: 2, sm: 4, md: 4 } }}
          >
            {services.map((service, index) => (
              <Grid
                key={index}
                size={{ xs: 4, sm: 6, md: 4, lg: 4 }} // Crucial: must be 'item' for Grid children
                  // One-fourth width on large screens (4 columns) - if you have 9 items, 3 columns is usually better for lg
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card
                  sx={{
                    width: '100%', // Take full width of its Grid item
                    maxWidth: { xs: '300px', sm: '350px', md: '300px' }, // Example max-width to prevent cards from becoming too wide on very large screens
                    height: { xs: 200, sm: 220, md: 250 }, // Responsive height for cards
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  {loading ? (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={'160px'} // Responsive skeleton image height
                    />
                  ) : (
                    <Box sx={{
                      height: { xs: 120, sm: 140, md: 160 }, // Responsive image container height
                      overflow: "hidden"
                    }}>
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </Box>
                  )}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {loading ? (
                      <Skeleton variant="text" width="80%" />
                    ) : (
                      <Typography
                        variant="h6"
                        component="h3"
                        className="text-center"
                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
                      >
                        {service.title}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      {/* Other sections that need to be responsive */}
      <Box>
        <OurWorkSection />
      </Box>
      <Box>
        <ClientReviews />
      </Box>
      <Box>
        <OurVendors />
      </Box>
      <Box>
        <ClientSection />
      </Box>
      <Box>
        <FAQSection />
      </Box>
      <Box 
      id="contact-us">
        <ContactUs />
      </Box>
    </div>
  );
};

export default HeroSection;