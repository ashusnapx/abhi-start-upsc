import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

const Profile = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserName(user.name); 
        setUserEmail(user.email);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-gray-100 p-4 justify-center items-center'>
        <ActivityIndicator size='large' color='#4A90E2' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-black text-white p-4'>
      <View className='flex-1 justify-center items-center'>
        <Text className='text-3xl font-bold text-white mb-4'>Profile</Text>
        <View className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
          <Text className='text-lg font-semibold text-gray-700 mb-2'>
            Name:
          </Text>
          <Text className='text-lg text-gray-600 mb-4'>
            {userName || "N/A"}
          </Text>
          <Text className='text-lg font-semibold text-gray-700 mb-2'>
            Email:
          </Text>
          <Text className='text-lg text-gray-600'>{userEmail || "N/A"}</Text>
          {/* You can add more user details here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
