import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div class名称="min-h-screen flex items-center justify-center bg-gray-100">
      <div class名称="text-center">
        <h1 class名称="text-4xl font-bold mb-4">404</h1>
        <p class名称="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" class名称="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
