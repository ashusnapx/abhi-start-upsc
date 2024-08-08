import { images } from "@/constants";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, Animated, Image } from "react-native";
const LoadingScreen = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <SafeAreaView className='flex-1 bg-gray-200 justify-center items-center p-4'>
      <Animated.View style={{ opacity }}>
        <Image
          source={images.logoNew}
          style={{ width: 200, height: 200 }}
          resizeMode='contain'
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
