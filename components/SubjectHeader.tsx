import React from "react";
import { View, Text, Image } from "react-native";

interface SubjectHeaderProps {
  subjectName: string;
  subjectImage: string;
  subjectPrice: number;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({
  subjectName,
  subjectImage,
  subjectPrice,
}) => (
  <View className='mb-4'>
    {subjectImage && (
      <Image
        source={{ uri: subjectImage }}
        className='w-full h-40 rounded-lg'
        resizeMode='cover'
      />
    )}
    <Text className='text-2xl font-bold mt-2'>{subjectName}</Text>
    <Text className='text-lg mt-1'>Price: ₹{subjectPrice}</Text>
  </View>
);

export default SubjectHeader;
