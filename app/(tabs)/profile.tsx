import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "@/lib/appwrite";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const details = await fetchUserDetails();
        setUserDetails(details);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        console.error(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-gray-200 justify-center items-center p-4'>
        <ActivityIndicator size='large' color='#4A90E2' />
      </SafeAreaView>
    );
  }

  if (!userDetails) {
    return (
      <SafeAreaView className='flex-1 bg-gray-200 justify-center items-center p-4'>
        <Text className='text-lg text-gray-600'>User details not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-900 p-8'>
      <View className='flex-1 items-center mt-16'>
        <Text className='text-3xl font-bold text-white mb-6'>Profile</Text>
        <View className='bg-white p-6 rounded-lg shadow-md w-full max-w-lg'>
          {[
            { label: "Name", value: userDetails.name || "N/A" },
            { label: "Email", value: userDetails.email || "N/A" },
            { label: "Password", value: userDetails.password || "N/A" },
            { label: "Role", value: userDetails.role || "N/A" },
            { label: "Founder", value: "@mischevious_baka" },
          ].map(({ label, value }) => (
            <View key={label} className='mb-4'>
              <Text className='text-lg font-semibold text-gray-700'>
                {label}:
              </Text>
              <Text className='text-lg text-gray-600'>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
