import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {  styled,  } from '@mui/system';

import PopUpBg from '/PopUp.svg'; // Ensure the path to your image is correct
import { toast } from 'react-toastify';
import axios from 'axios';

const PopupContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'flex-end', // Center content horizontally
  alignItems: 'center', // Center content vertically
  zIndex: 400,
  backgroundImage: `url(${PopUpBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // Responsive sizing for the entire popup area
  width: '100%', // Default width for very small screens
  maxWidth: '450px', // Max width for the popup on smaller desktops
  height: '80%',
  minHeight: '400px', // Ensure a minimum height for the background
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden', // Hide overflow from background image if it exceeds bounds

  [theme.breakpoints.up('xs')]: {
    maxWidth: '750px',
    width: '80%',
    height: '30%', // Larger max width for tablets
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '700px',
    width: '90%', 
    height: '68%', // Even larger max width for desktops
  },
}));

const PopupWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(226, 221, 220, 0.8)',
  padding: theme.spacing(4), // Default padding
  borderRadius: theme.shape.borderRadius,
  color: '#c9b399',
  width: '60%', // Take full width of its container (PopupContainer)
  maxHeight: '70vh',
  overflowY: 'auto',
  boxShadow: '0px 4px 12px rgba(226, 221, 220, 0.89)',
  position: 'relative', // For close button positioning

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2), // Reduce padding on small screens
  },
}));

const CloseButton = styled(Button)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  minWidth: 'auto',
  padding: '4px',
  color: '#ea0e0e',
  '&:hover': {
    color: '#a88b6d',
    backgroundColor: 'transparent',
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label': {
    color: 'black',
  },
  '& input': {
    color: '#333',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c9b399',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary, // Corrected
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary, // Corrected
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c9b399',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary, // Corrected
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary, // Corrected
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#c9b399',
  color: theme.palette.common, // Corrected
  '&:hover': {
    backgroundColor: '#a88b6d',
  },
}));

const Popup: React.FC = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is set in your .env file
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    city: '',
    property: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    try {
      if (!formData.fullName || !formData.email || !formData.mobileNo || !formData.city || !formData.property) {
        throw new Error('Please fill in all fields');
      }
      const response = await axios.post(`${API_BASE_URL}/Consultation.php`, formData);

      if (response.status === 201 || response.status === 200) {
        toast.success('Consultation booked successfully!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          fullName: '',
          email: '',
          mobileNo: '',
          city: '',
          property: '',
        });
        setIsVisible(false); // Hide the popup after successful submission

      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to book consultation. Please try again later.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  if (!isVisible) {
    return null; // Don't render anything if isVisible is false
  }

  return (
    <PopupContainer>
      <PopupWrapper>
        <CloseButton onClick={() => handleClose()} aria-label="Close">
          <CloseIcon />
        </CloseButton>
        <Typography variant="h6" gutterBottom color="#333">
          Plan Your Free
        </Typography>
        <Typography variant="h5" gutterBottom color="#333">
          On-Site Consultation!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <StyledTextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            label="Mobile No."
            variant="outlined"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            label="City"
            variant="outlined"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <StyledFormControl fullWidth variant="outlined" required>
            <InputLabel id="select-your-property-label" style={{ color: '#0a0909' }}>
              Select Your Property
            </InputLabel>
            <Select
              labelId="select-your-property-label"
              id="property"
              name="property"
              value={formData.property}
              onChange={handleChange}
              label="Select Your Property"
              style={{ color: '#333' }}
            >
              <MenuItem value="">

              </MenuItem>
              <MenuItem value="2 BHK">2 BHK</MenuItem>
              <MenuItem value="3 BHK">3 BHK</MenuItem>
              <MenuItem value="4 BHK">4 BHK</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledButton fullWidth variant="contained" type="submit">
            Book Consultation
          </StyledButton>
        </Box>
      </PopupWrapper>
    </PopupContainer>
  );
};

export default Popup;