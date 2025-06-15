import React, { useState } from 'react';
import { Box, TextField, Button, Typography, styled } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported once in your app

// Assuming you have your background image
import ContactUsBackground from '/cf-1.svg';
import { useNavigate } from 'react-router-dom';

// --- Styled Components (no changes needed here, just for context) ---
const ContactContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: '50vh',
  backgroundImage: `url(${ContactUsBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(3),
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  color: '#c9b399',
  width: '400px',
  marginRight: theme.spacing(6),
  boxShadow: theme.shadows[3],
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& label': {
    color: '#c9b399',
  },
  '& input': {
    color: '#c9b399',
  },
  '& textarea': {
    color: '#c9b399',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c9b399',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#c9b399',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// --- React Component ---
const ContactUs: React.FC = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile_no: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    mobile_no: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the specific error when the user starts typing in that field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is set in your .env file
    e.preventDefault();
    let isValid = true;
    const newErrors: typeof errors = { // Use typeof errors for robust typing
      name: '', // Reset all errors at the start of validation
      mobile_no: '',
      email: '',
      message: '',
    };

    // --- Validation Logic ---
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.mobile_no.trim()) {
      newErrors.mobile_no = 'Mobile No. is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile_no.trim())) { // Example: Basic 10-digit mobile number validation
        newErrors.mobile_no = 'Mobile No. must be 10 digits';
        isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) { // Use .trim() for email regex
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors); // Update the errors state

    // --- API Submission Logic ---
    if (isValid) {
      console.log('Form Data to be sent:', formData);
      

      try {
        // Define your API endpoint
        // IMPORTANT: Replace this with your actual backend URL.
        // During local development, it might be 'http://localhost:5000/api/contact-us'
        // On deployment, it would be 'https://yourdomain.com/api/contact-us'
         // Update this to your actual API endpoint

        const response = await axios.post(`${API_BASE_URL}/ContactUs.php`, formData);

        // Axios automatically throws an error for 4xx/5xx responses, so we only handle success here
        if (response.status === 200 || response.status === 201) { // 200 OK or 201 Created
          console.log('Form submitted successfully:', response.data);
          toast.success('Your query has been successfully submitted! We will revert back to you soon.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFormData({ name: '', mobile_no: '', email: '', message: '' }); // Reset form fields
          setErrors({ name: '', mobile_no: '', email: '', message: '' }); // Clear errors after successful submission
        }
      } catch (error) {
        // Axios error handling:
        // error.response: The response sent from the server (e.g., 400, 500)
        // error.request: The request that was made but no response was received
        // error.message: Something else happened in setting up the request that triggered an Error
        if (axios.isAxiosError(error) && error.response) {
          // Server responded with a status other than 2xx
          console.error('API Error Response:', error.response.status, error.response.data);
          const errorMessage = error.response.data?.message || 'Server error occurred.';
          toast.error(`Failed to submit: ${errorMessage}`, {
            position: 'top-center',
          });
        } else if (axios.isAxiosError(error) && error.request) {
          // Request was made but no response was received (e.g., network error, CORS issue, backend down)
          console.error('Network Error:', error.request);
          toast.error('Network error. Could not connect to the server. Please try again later.', {
            position: 'top-center',
          });
        } else {
          // Something else happened
          console.error('Unexpected Error:', error);
          navigate('/error'); // Redirect to a generic error page
        }
      }
    } else {
      // Validation failed on the frontend
      toast.error('Please fill in all required fields correctly.', {
        position: 'top-center',
      });
    }
  };

  return (
    <ContactContainer>
      <FormWrapper>
        <Typography variant="h5" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <InputField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <InputField
            fullWidth
            id="mobile"
            name="mobile_no"
            label="Mo. No."
            variant="outlined"
            value={formData.mobile_no}
            onChange={handleChange}
            required
            error={!!errors.mobile_no}
            helperText={errors.mobile_no}
          />
          <InputField
            fullWidth
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
            multiline
            rows={4}
            id="message"
            name="message"
            label="Message"
            variant="outlined"
            value={formData.message}
            onChange={handleChange}
            required
            error={!!errors.message}
            helperText={errors.message}
          />
          <SubmitButton fullWidth variant="contained" type="submit">
            Submit
          </SubmitButton>
        </Box>
      </FormWrapper>
    </ContactContainer>
  );
};

export default ContactUs;