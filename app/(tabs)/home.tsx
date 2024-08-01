import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { account } from "@/lib/appwrite";
import { Link } from "expo-router";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

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

  const handleViewCourse = (item: { title: string; imageUrl: string }) => {
    console.log(`View course for: ${item.title}`);
    navigation.navigate("Course", {
      title: item.title,
      imageUrl: item.imageUrl,
    });
  };

  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name); // Assuming 'name' is a field in your Appwrite user data
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className='bg-gray-100 p-4 rounded-md'>
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size='large' color='#FF5722' />
        </View>
      ) : (
        <>
          <Text className='text-2xl font-bold text-center mb-6 mt-5'>
            Welcome, {userName || "User"}!
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className='bg-white rounded-lg shadow-lg mb-4 p-4 flex-row items-center'>
                <Image
                  source={{ uri: item.imageUrl }}
                  className='w-32 h-32 rounded-lg'
                  resizeMode='cover'
                />
                <View className='flex-1 pl-4'>
                  <Text className='text-xl font-semibold mb-2'>
                    {item.title}
                  </Text>
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
                      onPress={() => handleViewCourse(item)}
                      className='bg-green-500 p-2 rounded-lg flex-1 ml-1'
                    >
                      <Text className='text-white text-center text-sm font-medium'>
                        <Link href='/bookmark'>Buy Now</Link>
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
