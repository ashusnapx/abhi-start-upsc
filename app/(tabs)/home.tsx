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
      bgColor: "bg-red-500",
      text: "Free Sample",
      onPress: (item: CourseData) => handleViewCourse(item),
      margin: "mr-1",
    },
    {
      bgColor: "bg-green-500",
      text: "Buy Now",
      onPress: () => navigation.navigate("bookmark"),
      margin: "ml-1",
    },
  ];

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
          {buttonData.map(({ bgColor, text, onPress, margin }) => (
            <Pressable
              key={text}
              onPress={() => onPress(item)}
              className={`${bgColor} p-2 rounded-lg flex-1 ${margin}`}
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
