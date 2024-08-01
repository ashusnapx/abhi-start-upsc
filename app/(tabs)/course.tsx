import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types"; // Adjust the path as necessary

type CourseRouteProp = RouteProp<RootStackParamList, "Course">;

const Course = () => {
  const route = useRoute<CourseRouteProp>();
  const { title, imageUrl } = route.params;

  return (
    <SafeAreaView className='flex-1 bg-gray-100 p-4'>
      <View className='items-center'>
        <Text className='text-4xl font-bold mb-4'>{title}</Text>
        <Image
          source={{ uri: imageUrl }}
          className='w-64 h-64 rounded-lg'
          resizeMode='cover'
        />
      </View>
    </SafeAreaView>
  );
};

export default Course;
