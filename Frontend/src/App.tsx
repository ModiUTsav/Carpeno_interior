// App.js

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react"; // 1. Import Suspense
import { Box, CircularProgress, Typography } from "@mui/material";

// A simple loader/skeleton for the initial app load
const InitialLoader = () => {
  return (
    <Box
      sx={{
        width: '1600px',
        
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff', // A clean white background
      }}
    >
      {/* The Material-UI Spinner */}
      <CircularProgress color='success' />

      {/* Optional: Add text below the spinner */}
      <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
        Loading...
      </Typography>
    </Box>
  );
};

// Your lazy-loaded router configuration
const RouterConfig = lazy(() => import("./Routes/RoutesConfig"));

function App() {
  return (
    <Router>
      {/* 2. Wrap the lazy component in Suspense and provide a fallback */}
      <Suspense fallback={<InitialLoader />}>
        <RouterConfig />
      </Suspense>
    </Router>
  );
}

export default App;