import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { images } from "@/constants";

const Bookmark = () => {
  // Sample data for UPI IDs
  const upiIds = ["example1@upi", "example2@upi", "example3@upi"];

  return (
    <ScrollView className='flex-1 bg-black text-white p-4'>
      {/* QR Code Section */}
      <View className='mb-6 items-center'>
        <Text className='text-lg font-semibold mt-5'>Scan the QR Code</Text>
        <Image
          source={images.payment}
          className='mt-10 w-full h-[300px] rounded-md scale-125'
          resizeMode='contain'
        />
      </View>

      {/* UPI IDs Section */}
      <View className='mb-6 mt-5'>
        <Text className='text-xl font-bold mb-2 text-white'>UPI IDs</Text>
        {upiIds.map((upiId, index) => (
          <Text key={index} className='text-lg mb-1 text-white'>
            {upiId}
          </Text>
        ))}
      </View>

      {/* Rules and Regulations Section */}
      <View>
        <Text className='text-xl font-bold mb-2 p-4 text-white'>
          Rules and Regulations
        </Text>
        <Text className='text-lg mb-8 text-white p-4'>
          1. Please make sure to enter the correct UPI ID while making payments.
          {"\n"}2. Payments are non-refundable.
          {"\n"}3. Contact support if you face any issues.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Bookmark;
