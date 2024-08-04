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
import { COURSES } from "@/constants/constant";

// Define the CourseData type
interface CourseData {
  id: string;
  title: string;
  imageUrl: string;
}

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
  const handleViewCourse = (item: CourseData) => {
    navigation.navigate("course", {
      title: item.title,
      imageUrl: item.imageUrl,
    });
  };

  const buttonData = [
    {
      bgColor: "bg-blue-500",
      text: "Free Sample",
      onPress: (item: CourseData) => handleViewCourse(item),
      margin: "mr-2",
    },
    {
      bgColor: "bg-green-500",
      text: "Buy Now",
      onPress: () => navigation.navigate("bookmark"),
      margin: "ml-2",
    },
  ];

  // Render each course item
  const renderItem: ListRenderItem<CourseData> = ({ item }) => (
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

  return (
    <SafeAreaView className='bg-gray-900 flex-1 p-4'>
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#4CAF50' />
        </View>
      ) : (
        <>
          <View className='mb-6'>
            <Text className='text-3xl font-bold text-center text-white mt-9 mb-2'>
              Welcome, {userName || "User"}!
            </Text>
            <Text className='text-center text-gray-400'>
              Explore our latest courses and get started today.
            </Text>
          </View>
          <FlatList
            data={COURSES}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <View className='absolute bottom-0 left-0 right-0 py-2 bg-gray-800'>
            <Text className='text-center text-sm text-gray-400'>
              App developed by @ashusnapx 
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
