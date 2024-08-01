import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn, account } from "@/lib/appwrite"; // Import account for session check

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession("current");
        console.table("Active session found:", session); // Log session details
        router.replace("/home"); // Redirect to home if session is active
      } catch (error) {
        router.replace("/sign-up");
        console.table("Session check error:", error); // Log session check errors
        // Here you can handle cases where the session is not found or is invalid
      }
    };

    checkSession();
  }, []);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert(
        "Error",
        "Please fill all the fields correctly, my future aspirant"
      );
      return; // Early return if validation fails
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      router.replace("/home"); // Redirect to home on successful sign-in
    } catch (error: any) {
      const errorMessage = error?.message || "An unknown error occurred";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e: any) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e: any) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
            // secureTextEntry={true}
          />

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
