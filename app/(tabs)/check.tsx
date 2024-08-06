import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { fetchUserDetails } from "@/lib/appwrite";
import Footer from "@/components/Footer";
import CustomButton from "@/components/CustomButton";
import { useNavigation } from "expo-router";
import { database, appwriteConfig } from "@/lib/appwrite";

// Define your collection IDs here
const COLLECTIONS = {
  purchases: "66aefb4a0036e03da96a",
  chapters: "66aefac7000c44fc0585",
  users: "66aef9a8000c3a7b2ce4", // users collection ID
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const daysLeft = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff >= 0 ? daysDiff : 0; // Ensure non-negative days left
};

const Check = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [chaptersMap, setChaptersMap] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const navigation = useNavigation();

  const fetchLoggedInUserId = async () => {
    try {
      const userDetails = await fetchUserDetails();
      setLoggedInUserId(userDetails?.$id || null);
    } catch (error) {
      console.error("Error fetching user details:", error);
      Alert.alert("Error", "Failed to fetch user details");
    }
  };

  const fetchChapters = useCallback(async (chapterIds: string[]) => {
    try {
      const uniqueChapterIds = Array.from(new Set(chapterIds));
      const chaptersResponse = await Promise.all(
        uniqueChapterIds.map((chapterId) => {
          if (chapterId.length <= 36) {
            return database.getDocument(
              appwriteConfig.databaseId,
              COLLECTIONS.chapters,
              chapterId
            );
          }
          return null;
        })
      );
      const chapters = chaptersResponse.reduce((map, chapter) => {
        if (chapter) {
          map.set(chapter.$id, chapter);
        }
        return map;
      }, new Map<string, any>());
      setChaptersMap(chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setError("Error fetching chapters");
    }
  }, []);

  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        COLLECTIONS.purchases
      );

      const purchases = response.documents;
      setPurchases(
        purchases.filter(
          (purchase) =>
            loggedInUserId &&
            purchase.userId.some((user: any) => user.$id === loggedInUserId)
        )
      );

      const chapterIds = Array.from(
        new Set(
          purchases.flatMap(
            (purchase: any) =>
              purchase.chapterId.map((chapter: any) => chapter.$id) || []
          )
        )
      );

      await fetchChapters(chapterIds);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      setError("Error fetching purchases");
    } finally {
      setLoading(false);
    }
  }, [loggedInUserId, fetchChapters]);

  useEffect(() => {
    fetchLoggedInUserId();
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      fetchPurchases();
    }
  }, [loggedInUserId, fetchPurchases]);

  const onRefresh = useCallback(() => {
    if (loggedInUserId) {
      fetchPurchases();
    }
  }, [loggedInUserId, fetchPurchases]);

  const handleViewPDF = (pdfLink: string) => {
    if (pdfLink) {
      Linking.openURL(pdfLink);
    }
  };

  const handleBuyNow = () => {
    navigation.navigate("bookmark");
  };

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    const validityDays = daysLeft(item.expiryDate);
    const hasAccess = validityDays > 0;

    return (
      <View className='p-4 mb-4 rounded-lg bg-slate-400 shadow mt-12'>
        <Text className='text-2xl font-bold mb-2 text-gray-800 font-psemibold tracking-tighter capitalize'>
          Chapter:{" "}
          {item.chapterId
            .map(
              (chapter: any) => chaptersMap.get(chapter.$id)?.title || "Unknown"
            )
            .join(", ")}
        </Text>
        <Text className='text-base mb-1'>Purchase ID: {item.$id}</Text>
        <Text className='text-base mb-1'>
          User:{" "}
          {item.userId
            .map((user: any) => `${user.$id} (${user.name || "Unknown"})`)
            .join(", ")}
        </Text>
        <Text className='text-base mb-2 font-pmedium'>
          Validity: {validityDays} days left
        </Text>
        {hasAccess ? (
          <CustomButton
            title='View PDF'
            containerStyles=' p-2 rounded text-white text-center'
            handlePress={() =>
              item.chapterId.forEach((chapter: any) =>
                handleViewPDF(chaptersMap.get(chapter.$id)?.pdfLink || "")
              )
            }
          />
        ) : (
          <CustomButton
            title='Buy Now'
            containerStyles='bg-green-500 p-2 rounded text-white text-center'
            handlePress={handleBuyNow}
          />
        )}
      </View>
    );
  };

  return (
    <View className='flex-1 p-4 bg-white'>
      <FlatList
        data={purchases}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No purchases found.</Text>}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
      <Text className='mb-1' />
      <Footer />
    </View>
  );
};

export default Check;
