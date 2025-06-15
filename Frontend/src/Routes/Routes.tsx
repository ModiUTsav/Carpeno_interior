// src/routes.tsx

import type { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Dashboard/HeroSection';
import Work from '../components/Pages/Work';
import Process from '../components/Pages/Process';
import FaqPage from '../components/Pages/FaqPage'
import ContactPage from '../components/Pages/ContactPage';
import AboutUsPage from '../components/Pages/AboutUs';
import ProjectDetail from '../components/Pages/ProjectsDetails';
import ErrorPage from '../components/Pages/ErrorPage';

const routes: RouteObject[] = [
    {
        path: "/",
        element:  <Layout><HeroSection /></Layout>,  // Pass HeroSection as a child prop
    },
    {
        path: "/work",
         element:  <Layout><Work /></Layout>, // Pass Work as a child prop
    },
    {
        path:"/work/:projectId",
        element:   <Layout><ProjectDetail /></Layout>,
    }
    ,
    {
      path:"/process",
      element:  <Layout><Process/></Layout>, // Pass Process as a child prop
    }
    ,{
        path:"/faq",
        element: <Layout><FaqPage/></Layout>
    },
    {
        path: 'contact-us',
        element: <Layout><ContactPage/></Layout>
    },
     {
         path: 'about-us',
        element: <Layout><AboutUsPage/></Layout>
     }
     ,
     {
        path: 'errorPage',
        element: <ErrorPage/>
     },
    
    // Add other routes wrapped with the Layout
];

export default routes;