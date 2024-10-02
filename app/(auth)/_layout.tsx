import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const AuthLayout = () => {
  return (
    <>
      {/* Stack for managing authentication routes */}
      <Stack>
        {/* Sign In Screen */}
        <Stack.Screen 
          name="sign-in"
          options={{ 
            headerShown: false, // Hides the header for the sign-in screen
          }}
        />
        
        {/* Sign Up Screen */}
        <Stack.Screen 
          name="sign-up"
          options={{ 
            headerShown: false, // Hides the header for the sign-up screen
          }}
        />
      </Stack>

      {/* Status Bar Styling */}
      <StatusBar style="light" />
    </>
  );
};

export default AuthLayout;
