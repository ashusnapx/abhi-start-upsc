import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const NoDataScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-200 justify-center items-center p-4'>
      <Text className='text-lg text-gray-600'>User details not found.</Text>
    </SafeAreaView>
  );
};

export default NoDataScreen;
