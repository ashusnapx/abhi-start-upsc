import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        {/* sign in screen */}
        <Stack.Screen name='sign-in' options={{ headerShown: false }} />

        {/* sign up screen */}
        <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      </Stack>

      {/* status bar */}
      <StatusBar backgroundColor='#161622' style='dark' />
    </>
  );
};

export default AuthLayout;
