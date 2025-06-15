// src/components/Sidebar.tsx
import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Grid, // Using Grid for layout
  useTheme // Import useTheme hook
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/WorkOutline';
import BuildIcon from '@mui/icons-material/Build';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMailOutlined';

interface sidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<sidebarProps> = ({ open, onClose }) => {
  const theme = useTheme(); // Use the theme hook to access breakpoints

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: {
          // Responsive width for the drawer
          width: {
            xs: '80vw', // On extra-small screens (mobile), take 80% of viewport width
            sm: '60vw', // On small screens (tablets), take 50% of viewport width
            md: 600,    // On medium screens (desktops), take 400px fixed width
            lg: 1000,    // On large screens, take 600px
          },
          // Adjust position/margin for small screens
          mt: {
            xs: 0, // No top margin on extra-small screens (drawer takes full height)
            md: 4, // Revert to original top margin for medium screens and up
          },
          mr: {
            xs: 0, // No right margin on extra-small screens (drawer docks to edge)
            md: 4, // Revert to original right margin for medium screens and up
          },
          height: {
            xs: '100%', // Full height on extra-small screens
            md: 'auto', // Auto height for medium and up, allowing content to dictate
          },
          borderRadius: {
            xs: 0, // No border-radius on extra-small screens for full-height drawer
            md: '4px', // Revert to original border-radius for medium and up
          },
          // Ensure background is visible, especially if Backdrop is transparent
          backgroundColor: theme.palette.background.paper, // Use theme's default paper background
        },
      }}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Use correct Grid item props for responsive layout */}
        <Grid container spacing={2} alignItems="flex-start">
          {/* Left Side: Navigation */}
          <Grid size={{ xs: 12, sm: 6 }}> {/* On extra-small, take full width; on small+, take half */}
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Menu
            </Typography>
            <List>
              {[
                { text: 'Home', Icon: HomeIcon, href: '/' },
                { text: 'Work', Icon: WorkIcon, href: '/work' },
                { text: 'Process', Icon: BuildIcon, href: '/process' },
                { text: 'FAQ', Icon: QuestionAnswerIcon, href: '/faq' },
                { text: 'About Us', Icon: InfoIcon, href: 'about-us' },
                { text: 'Contact Us', Icon: ContactMailIcon, href: '/contact-us' },
              ].map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component="a" href={item.href}>
                    {item.Icon && <item.Icon sx={{ mr: 1 }} />}
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 'bold' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Right Side: Contact Information */}
          <Grid size={{ xs: 12, sm: 6 }}> {/* On extra-small, take full width; on small+, take half */}
            
            <Typography variant="h6" >Mobile:9106491977</Typography>
            <Typography variant="h6">E-Mail: sagarthakkar@carpeno.in</Typography>
            <Typography variant="h6">
              Address: 308, K158 Sindhubhavan Road, PRL Colony, Thaltej, Ahmedabad
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default Sidebar;