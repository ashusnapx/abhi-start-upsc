import React from "react";
import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { chaptersData } from "@/constants/constant";

const Course = () => {
  const route = useRoute();
  const { title: course } = route.params as { title?: string };

  const chapters = course ? chaptersData[course] || [] : [];

  const handlePdfLink = (pdfLink: string) => {
    Linking.openURL(pdfLink);
  };

  return (
    <View className='flex-1 p-4'>
      <Text className='text-2xl font-bold mb-4'>
        {course ? `${course} - Chapters` : "No Course Selected"}
      </Text>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='bg-white p-4 mb-3 rounded-lg shadow-md'>
            <Text className='text-lg font-semibold'>{item.name}</Text>
            <Text className='text-sm text-gray-600'>
              Important for: {item.importantFor}
            </Text>
            <Text className='text-sm text-gray-600'>
              PYQ Questions Asked: {item.pyq}
            </Text>
            <TouchableOpacity
              onPress={() => handlePdfLink(item.pdfLink)}
              className='bg-blue-500 p-2 rounded-lg mt-2'
            >
              <Text className='text-white text-center text-sm font-medium'>
                View PDF
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Course;
