import React, { useState } from 'react';
import { Box, TextField, Button, Typography, styled, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import ContactUsBackground from '/k1.svg';
import CU from '/cu-1.svg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OuterContactBox = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'white',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  },
}));

const ContactContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start', // Always center the content horizontally
  alignItems: 'center',
  
  minHeight: '80vh',
  width: '80%',
  backgroundImage: `url(${ContactUsBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    width: '95%',
    padding: theme.spacing(2),
    flexDirection: 'column', // Stack items vertically on smaller screens
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1),
    minHeight: 'auto',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem', // Base font size for xs and sm
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
    width: '50%', // Responsive width for the underline
    maxWidth: '100px', // Maintain max width for the underline
    height: '2px',
    backgroundColor: '#c9b399',
    borderRadius: '2px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.5rem', // Larger for medium screens
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '4.5rem', // Even larger for large screens
  },
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${CU})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  marginTop: theme.spacing(2), // Positive margin for spacing
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  color: 'black',
  width: '100%', // Take full width of its container
  maxWidth: '400px', // Limit max width for larger screens
  height: 'auto', // Allow height to be determined by content
  minHeight: '500px', // Ensure a minimum height so background image is visible
  boxShadow: theme.shadows[5],
  zIndex: 1,

  [theme.breakpoints.down('sm')]: {
    maxWidth: '350px', // Slightly smaller max width on small screens
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    minHeight: '450px', // Adjust minHeight for smaller screens if needed
  },
  [theme.breakpoints.up('xs')]: {
    maxWidth: '350px',
    minHeight: '500px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
    minHeight: '500px',
  }
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& label': { color: 'black' },
  '& input': { color: '#c9b399' },
  '& textarea': { color: '#c9b399' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#c9b399' },
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label': { color: 'black' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#c9b399' },
    '&:hover fieldset': { borderColor: theme.palette.primary.main },
    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#c9b399',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: 'red',
  },
}));

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    city: '',
    property: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    city: '',
    property: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is set in your .env file
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }
    if (!formData.mobileNo.trim() || !/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Mobile No. is required and must be 10 digits.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.property.trim()) {
      newErrors.property = 'Property selection is required.';
      isValid = false;
    } else if (!["2 BHK", "3 BHK", "4 BHK", "Other"].includes(formData.property)) {
      newErrors.property = "Invalid property type selected.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form Data:', formData);
      try {
        
        const response = await axios.post(`${API_BASE_URL}/Consultation.php`, formData);

        if (response.status === 201 || response.status === 200) {
          toast.success('Query generated successfully! We will revert back to you soon.', {
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
            mobileNo: '',
            email: '',
            city: '',
            property: '',
          });
          setErrors({
            fullName: '', mobileNo: '', email: '', city: '', property: ''
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        let errorMessage = 'Failed to generate query. Please try again later.';
        if (axios.isAxiosError(error) && error.response) {
          const phpErrorData = error.response.data;
          if (phpErrorData && phpErrorData.detail) {
            errorMessage = phpErrorData.detail;
          }
          if (phpErrorData && phpErrorData.errors) {
            const fieldErrors = Object.values(phpErrorData.errors).join(', ');
            if (fieldErrors) {
              errorMessage += ` Details: ${fieldErrors}`;
            }
          }
        }
        toast.error(errorMessage, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Please fill in all required fields correctly.', {
        position: 'top-center',
      });
    }
  };

  return (
    <OuterContactBox>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 32 }, // Responsive top padding
          left: { xs: 16, md: 64 }, // Responsive left padding
          zIndex: 10,
          cursor: 'pointer',
          width: { xs: '80px', md: '160px' }, // Responsive width for the logo
        }}
        onClick={() => navigate('/')}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          // Responsive sizing for the logo
          
        />
      </Box>

      <PageTitle>Contact-Us</PageTitle>

      <ContactContainer>
        <FormWrapper>
          <Typography variant="h5" align="center" gutterBottom>
            Plan Your Free
            <br />On-Site Consultation!
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <InputField
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <InputField
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              fullWidth
              id="mobileNo"
              name="mobileNo"
              label="Mo. No."
              variant="outlined"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              error={!!errors.mobileNo}
              helperText={errors.mobileNo}
            />
            <InputField
              fullWidth
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <InputField
              fullWidth
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              id="city"
              name="city"
              label="City"
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
              required
              error={!!errors.city}
              helperText={errors.city}
            />

            <StyledFormControl
              fullWidth
              variant="outlined"
              required
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            >
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
                error={!!errors.property}
              >
                <MenuItem value="2 BHK">2 BHK</MenuItem>
                <MenuItem value="3 BHK">3 BHK</MenuItem>
                <MenuItem value="4 BHK">4 BHK</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.property && (
                <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                  {errors.property}
                </Typography>
              )}
            </StyledFormControl>
            <SubmitButton fullWidth variant="contained" type="submit">
              Generate Query
            </SubmitButton>
          </Box>
        </FormWrapper>
      </ContactContainer>

      <Box
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          right: 0,
          width: { xs: '60px', md: '80px' },
          height: '73%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingY: 2,
          boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
          [theme.breakpoints.up('sm')]: {
            display: 'flex',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            marginTop: 3,
          }}
        >
          <Typography variant="body2" sx={{ writingMode: 'horizontal-lr', textOrientation: 'upright', color: 'text.secondary', font: 'bold' }}>
            Contact-Us
          </Typography>
        </Box>
      </Box>
    </OuterContactBox>
  );
};

export default ContactPage;