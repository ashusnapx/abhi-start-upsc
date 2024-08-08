import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import { images } from "@/constants";
import { Link } from "expo-router";
// import { ClipboardEventHandler } from "react";

const Bookmark = () => {
  // Sample data for UPI IDs
  const upiIds = ["7071282167@ptsbi"];

  const handleCopyToClipboard = (upiId: string) => {
    Clipboard.setString(upiId);
    Alert.alert(
      "Copied to Clipboard",
      "The UPI ID has been copied to your clipboard."
    );
  };

  const supportEmail = "abhisheknarain0987@gmail.com";

  return (
    <SafeAreaView className='flex-1 bg-gray-800 p-4'>
      {/* QR Code Section */}
      <View className='items-center mb-6 mt-5'>
        <Text className='text-2xl font-bold text-white mb-4'>
          Scan the QR Code
        </Text>
        <View className='w-full h-80 overflow-hidden rounded-lg shadow-lg'>
          <Image
            source={images.payment}
            className='w-full h-full'
            resizeMode='cover'
          />
        </View>
      </View>

      {/* UPI IDs Section */}
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <View className='mb-6'>
          <Text className='text-xl font-semibold text-white mb-3'>UPI IDs</Text>
          {upiIds.map((upiId, index) => (
            <View key={index} className='flex-row items-center mb-3'>
              <Text className='text-base text-white flex-1'>{upiId}</Text>
              <TouchableOpacity onPress={() => handleCopyToClipboard(upiId)}>
                <Text className='text-blue-400 ml-2'>Copy</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Rules and Regulations Section */}
        <View>
          <Text className='text-xl font-semibold text-white mb-3'>
            Rules and Regulations
          </Text>
          <Text className='text-base text-gray-300 mb-3'>
            1. Please make sure to enter the correct{"\n"} UPI ID while making
            payments.{"\n"}2. Payments are non-refundable.{"\n"}3. Contact
            support at{" "}
            <Link
              className='text-blue-400'
              href={`mailto:${supportEmail}?subject=App+query&body=Hello sir,&"`}
            >
              {supportEmail}
            </Link>{" "}
            for any issues.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;
