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
  <View className='bg-gray-100 rounded-xl shadow-md mb-6 p-4 flex-row items-start'>
    <Image
      source={{ uri: item.imageUrl }}
      className='w-32 h-40 rounded-lg border border-gray-300'
      resizeMode='cover'
    />
    <View className='flex-1 pl-4'>
      <Text className='text-lg font-semibold text-gray-800 mb-2'>
        {item.title}
      </Text>
      <View className='flex-col'>
        {buttonData.map(({ bgColor, text, onPress, margin }) => (
          <Pressable
            key={text}
            onPress={() => onPress(item)}
            className={`py-2 px-4 rounded-full ${bgColor} ${margin} mb-2`}
            style={{
              shadowColor: "rgba(0, 0, 0, 0.2)",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          >
            <Text className='text-white text-center text-sm font-semibold'>
              {text}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  </View>
);

export default CourseItem;
