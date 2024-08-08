import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { fetchUserDetails } from "@/lib/appwrite";
import ProfileDetail from "@/components/ProfileDetail";
import LoadingScreen from "@/components/LoadingScreen";
import NoDataScreen from "@/components/NoDataScreen";
import Footer from "@/components/Footer";

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
        // console.error(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingScreen />;
  if (!userDetails) return <NoDataScreen />;

  return (
    <SafeAreaView className='flex-1 bg-gray-900 p-8'>
      <View className='flex-1 items-center mt-16'>
        <Text className='text-3xl font-bold text-white mb-6'>Profile</Text>
        <View className='bg-white p-6 rounded-lg shadow-md w-full max-w-lg'>
          {[
            { label: "Name", value: userDetails.name || "N/A" },
            { label: "User ID", value: userDetails.accountId || "N/A" },
            { label: "Email", value: userDetails.email || "N/A" },
            { label: "Password", value: userDetails.password || "N/A" },
            { label: "Role", value: userDetails.role || "N/A" },
          ].map(({ label, value }) => (
            <ProfileDetail key={label} label={label} value={value} />
          ))}
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default Profile;
