// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f8f8f8', // Light grey background
                padding: { xs: '24px', sm: '32px', md: '48px' }, // Responsive padding
                display: 'grid',
                // Responsive Grid Layout
                gridTemplateColumns: {
                    xs: '1fr', // On extra-small screens, one column
                    sm: '1fr 1fr', // On small screens, two columns
                    md: '2fr 1fr 2fr 1fr', // On medium screens and up, use original 4-column layout
                },
                gap: { xs: '24px', sm: '16px', md: '12px' }, // Responsive gap between items
                alignItems: 'center',
                textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
                justifyItems: { xs: 'center', md: 'stretch' }, // Center items on small screens
            }}
        >
            {/* Logo */}
            <Box sx={{ justifySelf: { xs: 'center', md: 'start' } }}> {/* Center on mobile, start on desktop */}
                <img
                    src="/logo.svg"
                    alt="Carpeno Interiors"
                    style={{
                        height: 'auto', // Auto height to maintain aspect ratio
                        width: '100%', // Take full width of its container on small screens
                        maxWidth: '200px', // Max width for the logo
                    }}
                />
            </Box>

            {/* Navigation Links */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'start' }, // Center buttons on mobile, start on desktop
                    gap: '10px',
                    // Occupy full width on smaller screens, then adjust grid column for larger screens
                    gridColumn: { xs: '1 / -1', md: 'auto',lg: 'auto' }, // Full width on xs, auto on md+
                    order: { xs: 2, md: 1 }, // Change order: navigation comes after logo on mobile
                }}
            >
                <Button color="inherit" sx={{ fontWeight: 'light', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#c9b399', padding: '8px 12px' }} href='/'>Home</Button>
                <Button color="inherit" sx={{ fontWeight: 'light', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#c9b399', padding: '8px 12px' }} href='/work'>Work</Button>
                <Button color="inherit" sx={{ fontWeight: 'light', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#c9b399', padding: '8px 12px' }} href='/process'>Process</Button>
                <Button color="inherit" sx={{ fontWeight: 'light', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#c9b399', padding: '8px 12px' }} href='/faq'>FAQ</Button>
                <Button color="inherit" sx={{ fontWeight: 'light', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#c9b399', padding: '8px 12px' }} href='/about-us'>About Us</Button>
                <Button color="inherit" sx={{ fontWeight: 'light', fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#c9b399', padding: '8px 12px' }} href='contact-us'>Contact Us</Button>
            </Box>

            {/* Address */}
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    textAlign: { xs: 'center', md: 'right' }, // Center on mobile, right-align on desktop
                    gridColumn: { xs: '1 / -1', sm: '2 / 3', md: 'auto' }, // Full width on xs, second column on sm, auto on md+
                    order: { xs: 3, sm: 3, md: 4 }, // Order change
                }}
            >
                Address :- 308, K158 Sindhubhavan Road, PRL Colony, Thaltej, Ahmedabad
            </Typography>

            {/* Follow Us On */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: { xs: 'center', md: 'flex-end' }, // Center icons on mobile, end on desktop
                    gridColumn: { xs: '1 / -1', sm: '1 / 2', md: 'auto' }, // Full width on xs, first column on sm, auto on md+
                    order: { xs: 4, sm: 4, md: 3 }, // Order change
                }}
            >
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Follow us On</Typography>
                <IconButton color="inherit" aria-label="Instagram" onClick={() => window.open('https://www.instagram.com/officialcarpeno?igsh=MTMyZ3dmeW9wNHZvdQ==', '_blank')}>
                    <InstagramIcon sx={{ color: 'black', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />
                </IconButton>
                <IconButton color="inherit" aria-label="Facebook" onClick={() => window.open('https://www.facebook.com/officialcarpeno/', '_blank')}>
                    <FacebookIcon sx={{ color: 'black', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn" onClick={() => window.open('https://www.threads.com/@officialcarpeno', '_blank')}>
                    <img
                        src="/threads.png"
                        alt="Threads"
                        style={{ height: '24px', width: 'auto', backgroundColor: 'black', borderRadius: '4px' }} // Added styling for Threads icon
                    />
                </IconButton>
            </Box>

            {/* Copyright */}
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    gridColumn: '1 / -1', // Always span full width
                    textAlign: 'center',
                    marginTop: { xs: '16px', md: '24px' }, // Responsive top margin
                    order: { xs: 5, md: 4 }, // Ensure copyright is always last
                }}
            >
                © All Copyright to Carpeno interiors pvt. ltd.
            </Typography>
        </Box>
    );
};

export default Footer;