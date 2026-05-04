
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and redirect accordingly
    if (authService.isAuthenticated()) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Show a loading state while redirecting
  return (
    <div class名称="min-h-screen flex items-center justify-center bg-background">
      <div class名称="text-center">
        <div class名称="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p class名称="text-muted-foreground">加载中...</p>
      </div>
    </div>
  );
};

export default Index;