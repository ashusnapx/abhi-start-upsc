import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { images } from "@/constants";

const Bookmark = () => {
  // Sample data for UPI IDs
  const upiIds = ["example1@upi", "example2@upi", "example3@upi"];

  return (
    <ScrollView className=' bg-gray-900 text-white p-4'>
      {/* QR Code Section */}
      <View className='mt-5 mb-8 items-center'>
        <Text className='text-2xl font-bold mb-4 text-white'>
          Scan the QR Code
        </Text>
        <Image
          source={images.payment}
          className='w-full h-64 rounded-lg shadow-lg'
          resizeMode='contain'
        />
      </View>

      {/* UPI IDs Section */}
      <View className='mb-8'>
        <Text className='text-xl font-semibold mb-3 text-white'>UPI IDs</Text>
        {upiIds.map((upiId, index) => (
          <Text key={index} className='text-lg mb-2 text-white'>
            {upiId}
          </Text>
        ))}
      </View>

      {/* Rules and Regulations Section */}
      <View>
        <Text className='text-xl font-semibold mb-3 text-white'>
          Rules and Regulations
        </Text>
        <View className='bg-gray-800 mb-8 p-4 rounded-lg'>
          <Text className='text-lg text-white'>
            1. Please make sure to enter the correct UPI ID while making
            payments.
            {"\n"}2. Payments are non-refundable.
            {"\n"}3. Contact support if you face any issues.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Bookmark;
