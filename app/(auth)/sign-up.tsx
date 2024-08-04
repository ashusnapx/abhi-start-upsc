import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Alert,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "admin" | "student",
    secretCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);

  const handleTextChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (field === "role") {
      setIsSignUpEnabled(
        value === "student" || (value === "admin" && form.secretCode === "1234")
      );
    }

    if (field === "secretCode") {
      setIsSignUpEnabled(form.role === "student" || value === "1234");
    }
  };

  const submit = async () => {
    const { name, email, password, role } = form;

    if (
      !name ||
      !email ||
      !password ||
      (role === "admin" && !isSignUpEnabled)
    ) {
      Alert.alert("Error", "Please fill all the fields correctly.");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      Alert.alert("Error", "Password must be between 8 and 16 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = await createUser(email, password, name, role);

      router.replace("/home"); // Adjust as needed
    } catch (error: any) {
      const errorMessage =
        typeof error.message === "string"
          ? error.message
          : "An unknown error occurred. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <StatusBar backgroundColor='#161622' barStyle='light-content' />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View className='flex-1 justify-center px-4 py-6'>
          <Image
            source={images.logoNew}
            resizeMode='contain'
            className='w-[140px] h-[140px] object-cover mb-5'
          />
          <Text className='text-2xl text-white font-semibold mb-6'>
            Sign Up to clear UPSC
          </Text>

          <FormField
            title='Name'
            value={form.name}
            handleTextChange={(e) => handleTextChange("name", e)}
            otherStyles='mb-4'
          />

          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e) => handleTextChange("email", e)}
            otherStyles='mb-4'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e) => handleTextChange("password", e)}
            otherStyles='mb-4'
            placeholder='Password length should be 8-16 characters'
            secureTextEntry
          />

          <FormField
            title='Role (student or admin)'
            value={form.role}
            handleTextChange={(e) => handleTextChange("role", e.toLowerCase())}
            otherStyles='mb-4'
          />

          {form.role === "admin" && (
            <TextInput
              placeholder='Enter Secret Code'
              value={form.secretCode}
              onChangeText={(e) => handleTextChange("secretCode", e)}
              secureTextEntry
              className='bg-white text-black mb-4 px-4 py-3 rounded-md'
            />
          )}

          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mb-6'
            isLoading={isSubmitting}
            disabled={!isSignUpEnabled}
          />

          <View className='flex-col justify-center items-center'>
            <Text className='text-lg text-gray-100 mb-2'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-semibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
