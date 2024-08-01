import React from "react";
import { View, Text, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

const chaptersData: Record<
  string,
  Array<{ id: string; name: string; importantFor: string; pyq: string }>
> = {
  History: [
    {
      id: "1",
      name: "Ancient India",
      importantFor: "Prelims",
      pyq: "2019, 2021",
    },
    {
      id: "2",
      name: "Medieval India",
      importantFor: "Mains",
      pyq: "2018, 2020",
    },
  ],
  Polity: [
    {
      id: "1",
      name: "Fundamentals of Indian Constitution",
      importantFor: "Prelims",
      pyq: "2019, 2022",
    },
    {
      id: "2",
      name: "State Governments",
      importantFor: "Mains",
      pyq: "2017, 2021",
    },
  ],
  // Add other subjects and chapters as needed
};

const Course = () => {
  const route = useRoute();
  const { title: course } = route.params as { title?: string }; // Use correct parameter name

  const chapters = course ? chaptersData[course] || [] : [];

  return (
    <View className='flex-1 p-4 bg-gray-100 mt-9'>
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
          </View>
        )}
      />
    </View>
  );
};

export default Course;
