import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import useFetchData from "@/hooks/useFetchData";
import CourseItem from "@/components/CourseItem";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userName, subjects, loading, refreshing, setRefreshing, fetchData } =
    useFetchData();
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredSubjects(subjects);
  }, [subjects]);

  const handleViewCourse = (item: any) => {
    navigation.navigate("course", { subjectId: item.id });
  };

  const buttonData = [
    {
      bgColor: "bg-blue-500",
      text: "Free Sample",
      onPress: handleViewCourse,
      margin: "mr-2",
    },
    {
      bgColor: "bg-green-500",
      text: "Buy Now",
      onPress: () => navigation.navigate("bookmark"),
      margin: "ml-2",
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text: string) => {
    if (text.trim() === "") {
      setFilteredSubjects(subjects);
    } else {
      const lowercasedText = text.toLowerCase();
      const filtered = subjects.filter((subject) =>
        subject.title.toLowerCase().includes(lowercasedText)
      );
      setFilteredSubjects(filtered);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView className='bg-gray-900 flex-1 p-4 antialiased'>
      <View className='mb-6'>
        <Text className='text-3xl font-bold text-center text-white mt-9 mb-2 tracking-tighter capitalize'>
          Welcome, {userName || "User"}!
        </Text>
        <Text className='text-center text-gray-400'>
          Explore our latest courses and get started today.
        </Text>
      </View>
      <SearchBar
        data={subjects.map((subject) => subject.title)}
        onSearch={handleSearch}
      />
      <FlatList
        data={filteredSubjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseItem item={item} buttonData={buttonData} />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Footer />
    </SafeAreaView>
  );
};

export default Home;
