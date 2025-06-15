import { Routes, Route } from 'react-router-dom';
import routes from './Routes'; // Import your routes configuration

const renderRoutes = (routes: any[]) => { // Consider using RouteObject[] for better type safety here
  return routes.map((route) => {
    // Pass route.element directly, as it's already the JSX element
    return <Route key={route.path} path={route.path} element={route.element} />;
  });
};

const RouterConfig:React.FC = () =>{
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default RouterConfig;