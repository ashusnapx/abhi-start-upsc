import React from "react";
import { View, Text } from "react-native";

type ProfileDetailProps = {
  label: string;
  value: string;
};

const ProfileDetail = ({ label, value }: ProfileDetailProps) => {
  return (
    <View className='mb-4'>
      <Text className='text-lg font-semibold text-gray-700'>{label}:</Text>
      <Text className='text-lg text-gray-600'>{value}</Text>
    </View>
  );
};

export default ProfileDetail;
