
import { Box, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from '@mui/system'; // Import styled from @mui/system

// Styled component for the review card to add the border and Google icon
const ReviewCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  border: '1px solid #e0e0e0', // Light grey border
  borderRadius: '8px',
  boxShadow: 'none', // Remove default card shadow if desired
  textAlign: 'center',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '350px', // Adjust as needed to ensure consistent height
  '&:hover': {
    borderColor: '#4285F4', // Google blue border on hover, similar to the highlighted card
  },
}));

const GoogleIcon = styled('img')({
  position: 'absolute',
  top: '15px',
  right: '15px',
  width: '24px', // Adjust size as needed
  height: '24px',
});

// Sample data for client reviews
const clientReviewsData = [
  {
    id: 1,
    name: 'Susan Smith',
    title: 'Content Creator',
    avatar: '/r1.png', // Replace with actual image path
    review: "It's great work done by them. i am very happy with the work done by them. It's great work done by them. i am very happy with the work done by them.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Troy Kyles',
    title: 'Developer',
    avatar: '/r2.png', // Replace with actual image path
    review: "short time but the great result i got,very creative and innovative work done by them..",
    rating: 4.5,
  },
  {
    id: 3,
    name: 'scarlett Evans',
    title: 'HouseWife',
    avatar: '/r3.png', // Replace with actual image path
    review: "sufficient work and very resonable price.",
    rating: 5,
  },
  
];

const settings = {
  centerMode: true,
  centerPadding: '60px', // This creates the effect of seeing parts of the next/previous slides
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  infinite: true,
  arrows: true, // You might need to style these arrows for better visibility
  dots: true,
  responsive: [
    {
      breakpoint: 1200, // For smaller desktops/laptops
      settings: {
        slidesToShow: 2,
        centerMode: false, // You might want to disable center mode for fewer slides
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 768, // For tablets
      settings: {
        slidesToShow: 1,
        centerMode: false,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 480, // For mobile phones
      settings: {
        slidesToShow: 1,
        centerMode: false,
        centerPadding: '0px',
      },
    },
  ],
};

const ClientReviews = () => {
  return (
    <Box className="py-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Client Reviews</h2>
      <div className="max-w-screen-lg mx-auto px-4">
        <Slider {...settings}>
          {clientReviewsData.map((review) => (
            <div key={review.id} className="px-4"> {/* px-4 provides spacing between cards */}
              <ReviewCard>
                <GoogleIcon src="/google.svg" alt="Reviews On Google" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                  <Avatar src={review.avatar} alt={review.name} sx={{ width: 80, height: 80, mb: 2 }} />
                  <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {review.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#4CAF50' }}> {/* Green color for title */}
                    {review.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, color: 'text.primary', textAlign: 'center' }}>
                    "{review.review}"
                  </Typography>
                </CardContent>
                <Rating name={`read-only-rating-${review.id}`} value={review.rating} readOnly sx={{ mt: 2 }} />
              </ReviewCard>
            </div>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default ClientReviews;