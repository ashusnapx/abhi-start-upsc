import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const Footer = () => (
  <View className='absolute bottom-0 left-0 right-0 py-2 bg-gray-800'>
    <Text className='text-center font-psemibold tracking-tighter text-sm text-gray-400'>
      App developed by{" "}
      <Link className="text-blue-400" href='https://ashusnapx.vercel.app/'>@ashusnapx</Link>{" "}
    </Text>
  </View>
);

export default Footer;
