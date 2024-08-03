import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  ListRenderItem,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { account } from "@/lib/appwrite";
import { useNavigation } from "expo-router";

// Define the CourseData type
interface CourseData {
  id: string;
  title: string;
  imageUrl: string;
}

// Define the static course data
const COURSES: CourseData[] = [
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
    title: "ScienceTech",
    imageUrl:
      "https://media.licdn.com/dms/image/D5612AQF0Vil5fp9aXQ/article-cover_image-shrink_600_2000/0/1661499794085?e=2147483647&v=beta&t=__nCjBBVvYwEZ9YbbgB292kO5-HZO9EnJMyIsYweXOE",
  },
];

// The main Home component
const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // State to store user's name and loading state
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user data from Appwrite on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle course selection
  // Correctly navigate to "Course" with parameters if "Course" is the correct screen name
  const handleViewCourse = (item: CourseData) => {
    navigation.navigate("course", {
      title: item.title,
      imageUrl: item.imageUrl,
    });
  };

  // Render each course item
  const renderItem: ListRenderItem<CourseData> = ({ item }) => (
    <View className='bg-white rounded-lg shadow-lg mb-4 p-4 flex-row items-center text-center'>
      <Image
        source={{ uri: item.imageUrl }}
        className='w-32 h-32 rounded-lg'
        resizeMode='cover'
      />
      <View className='flex-1 pl-4'>
        <Text className='text-xl font-semibold mb-2'>{item.title}</Text>
        <View className='flex-row justify-between'>
          <Pressable
            onPress={() => handleViewCourse(item)}
            className='bg-red-500 p-2 rounded-lg flex-1 mr-1'
          >
            <Text className='text-white text-center text-sm font-medium'>
              Free Sample
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("bookmark")}
            className='bg-green-500 p-2 rounded-lg flex-1 ml-1'
          >
            <Text className='text-white text-sm font-medium'>Buy Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='bg-black p-4 pb-32 rounded-md'>
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#FF5722' />
        </View>
      ) : (
        <>
          <Text className='text-2xl font-bold text-center mb-2 mt-8 border rounded-md text-white'>
            Welcome, {userName || "User"}!
          </Text>
          <FlatList
            data={COURSES}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </>
      )}
      <Text className='mt-2 text-center text-sm font-psemibold tracking-tighter text-white'>
        App developed by @ashusnapx + @mischevious_baka
      </Text>
    </SafeAreaView>
  );
};

export default Home;
