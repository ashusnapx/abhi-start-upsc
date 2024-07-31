import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // submit form details
  const submit = () => {};

  // loading state when user click on sign in/up button
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-screen px-4 my-6'>
          <Image
            source={images.logoNew}
            resizeMode='contain'
            className='w-[150px] h-[150px] object-cover mb-5'
          />
          <Text className='text-2xl text-white text-semibold -tracking-tighter mt-10 font-psemibold'>
            Login to clear UPSC
          </Text>

          {/* take users email */}
          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e: any) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          {/* take users password */}
          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e: any) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          {/* button for finalizing sign in/ sign up */}
          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-col justify-center pt-5 gap-2 text-center items-center'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account? Like seriously!
            </Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
