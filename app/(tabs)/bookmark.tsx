import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { images } from "@/constants";

const Bookmark = () => {
  // Sample data for UPI IDs
  const upiIds = ["example1@upi", "example2@upi", "example3@upi"];

  return (
    <ScrollView className='flex-1 bg-gray-100 p-4'>
      {/* QR Code Section */}
      <View className='mb-6 items-center'>
        <Image
          source={images.payment}
          className='mt-10 w-80 h-96 rounded-md'
          resizeMode='cover'
        />
        <Text className='text-lg font-semibold mt-2'>Scan the QR Code</Text>
      </View>

      {/* UPI IDs Section */}
      <View className='mb-6'>
        <Text className='text-xl font-bold mb-2'>UPI IDs</Text>
        {upiIds.map((upiId, index) => (
          <Text key={index} className='text-lg mb-1'>
            {upiId}
          </Text>
        ))}
      </View>

      {/* Rules and Regulations Section */}
      <View>
        <Text className='text-xl font-bold mb-2'>Rules and Regulations</Text>
        <Text className='text-lg mb-8'>
          1. Please make sure to enter the correct UPI ID while making payments.
          {"\n"}2. Payments are non-refundable.
          {"\n"}3. Contact support if you face any issues.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Bookmark;
