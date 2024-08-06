import React from "react";
import { SafeAreaView, ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-200 justify-center items-center p-4'>
      <ActivityIndicator size='large' color='#4A90E2' />
    </SafeAreaView>
  );
};

export default LoadingScreen;
