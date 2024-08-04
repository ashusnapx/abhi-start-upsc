import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { account, database, appwriteConfig } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        const accountId = user.$id;

        const userDocResponse = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal("accountId", accountId)]
        );

        if (userDocResponse.documents.length > 0) {
          setUserDetails(userDocResponse.documents[0]); // Get the first matching document
        } else {
          throw new Error("User document not found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        Alert.alert("Error", "Failed to fetch user details.");
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

  if (!userDetails) {
    return (
      <SafeAreaView className='flex-1 bg-gray-100 p-4 justify-center items-center'>
        <Text className='text-lg text-gray-600'>User details not found.</Text>
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
            {userDetails.name || "N/A"}
          </Text>

          <Text className='text-lg font-semibold text-gray-700 mb-2'>
            Email:
          </Text>
          <Text className='text-lg text-gray-600 mb-4'>
            {userDetails.email || "N/A"}
          </Text>

          <Text className='text-lg font-semibold text-gray-700 mb-2'>
            Password:
          </Text>
          <Text className='text-lg text-gray-600 mb-4'>
            {userDetails.password || "N/A"}
          </Text>

          <Text className='text-lg font-semibold text-gray-700 mb-2'>
            Role:
          </Text>
          <Text className='text-lg text-gray-600 mb-4'>
            {userDetails.role || "N/A"}
          </Text>

          {/* Add more user details if necessary */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
