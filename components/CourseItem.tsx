import React from "react";
import { View, Text, Pressable, Image } from "react-native";

interface CourseItemProps {
  item: {
    id: string;
    title: string;
    imageUrl: string;
  };
  buttonData: {
    bgColor: string;
    text: string;
    onPress: (item: any) => void;
    margin: string;
  }[];
}

const CourseItem = ({ item, buttonData }: CourseItemProps) => (
  <View className='bg-white rounded-lg shadow-lg mb-4 p-4 flex-row items-center'>
    <Image
      source={{ uri: item.imageUrl }}
      className='w-36 h-36 rounded-lg'
      resizeMode='cover'
    />
    <View className='flex-1 pl-4'>
      <Text className='text-xl font-semibold text-gray-800 mb-2'>
        {item.title}
      </Text>
      <View className='flex-row justify-between'>
        {buttonData.map(({ bgColor, text, onPress, margin }) => (
          <Pressable
            key={text}
            onPress={() => onPress(item)}
            className={`${bgColor} p-3 rounded-md flex-1 ${margin}`}
          >
            <Text className='text-white text-center text-sm font-medium'>
              {text}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  </View>
);

export default CourseItem;
