import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";

const Home = () => {
  // Sample data array with image URLs
  const data = [
    {
      id: "1",
      title: "History",
      imageUrl:
        "https://dualcreditathome.com/wp-content/uploads/2014/02/history.jpg",
    },
    {
      id: "2",
      title: "Polity",
      imageUrl:
        "https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/04/13200455/Indian-Polity.jpg",
    },
    {
      id: "3",
      title: "Geography",
      imageUrl:
        "https://geographicbook.com/wp-content/uploads/2023/06/What-is-Geography.jpg",
    },
    {
      id: "4",
      title: "Ethics",
      imageUrl:
        "https://www.scu.edu/media/mobi/blog-variants/Ethics-Blog-760x550-760x550.png",
    },
    {
      id: "5",
      title: "International Relations",
      imageUrl:
        "https://www1.wellesley.edu/sites/default/files/assets/departments/politicalscience/irlanding.png",
    },
    {
      id: "6",
      title: "Science and Tech",
      imageUrl:
        "https://media.licdn.com/dms/image/D5612AQF0Vil5fp9aXQ/article-cover_image-shrink_600_2000/0/1661499794085?e=2147483647&v=beta&t=__nCjBBVvYwEZ9YbbgB292kO5-HZO9EnJMyIsYweXOE",
    },
  ];

  // Function to handle button press
  const handleViewCourse = (title: string) => {
    console.log(`View course for: ${title}`);
    // Navigate to the course details page
  };

  return (
    <SafeAreaView className='bg-gray-100 p-4 mt-10'>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='bg-white rounded-lg shadow-md mb-4 p-4 flex-row items-center'>
            <View className='flex-1'>
              <Text className='text-xl font-semibold mb-2'>{item.title}</Text>
              <Pressable
                onPress={() => handleViewCourse(item.title)}
                className='bg-blue-500 p-2 rounded-lg'
              >
                <Text className='text-white text-center text-lg font-medium'>
                  View Course
                </Text>
              </Pressable>
            </View>
            <Image
              source={{ uri: item.imageUrl }}
              className='w-32 h-32 rounded-lg ml-4'
              resizeMode='cover'
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
