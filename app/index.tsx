import { ThemedText } from "@/components/ThemedText";
import { Link, router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='flex items-center justify-center h-full'>
          <Image
            source={images.logoNew}
            className='w-[150px] h-[150px] object-cover mb-5'
            resizeMode='contain'
          />
          <ThemedText className='text-2xl text-center px-4 tracking-tighter text-slate-200'>
            Memorize <Text className='text-secondary italic'>facts</Text> in
            much more easy way!
          </ThemedText>

          <CustomButton
            title='Continue with an email'
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-[300px] mt-10'
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' barStyle='dark-content'/>
    </SafeAreaView>
  );
}

/*
initial renders:
<View className='flex items-center justify-center h-screen'>
      <ThemedText className='text-2xl text-center px-4 tracking-tighter text-black'>
        Memorize <Text className='text-red-500 italic'>facts</Text> in much more
        easy way!
      </ThemedText>
      <Link
        href='/home'
        className='bg-slate-600 border px-5 py-3 mt-6 rounded-full cursor-pointer text-sm'
      >
        <Text className="text-white">Enter into Abhishek's world</Text>
      </Link>
    </View>
*/
