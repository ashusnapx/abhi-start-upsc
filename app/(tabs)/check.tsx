import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Modal,
  TouchableOpacity,
  Dimensions, // Import Dimensions
} from "react-native";
import { WebView } from "react-native-webview";
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
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null); // State to hold the selected PDF
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [dimensions, setDimensions] = useState(Dimensions.get("window")); // State for screen dimensions
  const navigation = useNavigation();

  useEffect(() => {
    const onChange = (result: any) => {
      setDimensions(result.window);
    };

    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const fetchLoggedInUserId = async () => {
    try {
      const userDetails = await fetchUserDetails();
      setLoggedInUserId(userDetails?.$id || null);
    } catch (error) {
      //   console.error("Error fetching user details:", error);
      Alert.alert("Error", "Failed to fetch user details");
    }
  };

  const fetchChapters = async (chapterIds: string[]) => {
    try {
      const uniqueChapterIds = Array.from(new Set(chapterIds)); // Ensure unique IDs
      const chaptersResponse = await Promise.all(
        uniqueChapterIds.map((chapterId) => {
          if (chapterId.length <= 36) {
            return database.getDocument(
              appwriteConfig.databaseId,
              COLLECTIONS.chapters,
              chapterId
            );
          }
          return null; // Ensure a value is always returned
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
      //   console.error("Error fetching chapters:", error);
      setError("Error fetching chapters");
    }
  };

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

      // Extract chapter IDs from purchases
      const chapterIds = Array.from(
        new Set(
          purchases.flatMap(
            (purchase: any) =>
              purchase.chapterId.map((chapter: any) => chapter.$id) || []
          )
        )
      );

      // Fetch chapters details
      await fetchChapters(chapterIds);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      setError("Error fetching purchases");
    } finally {
      setLoading(false);
    }
  }, [loggedInUserId]);

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
      setSelectedPdf(pdfLink); // Set the selected PDF link
      setModalVisible(true); // Show the modal with the WebView
    }
  };

  const handleBuyNow = () => {
    navigation.navigate("bookmark");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    const validityDays = daysLeft(item.expiryDate);
    const hasAccess = validityDays > 0;

    return (
      <View
        style={{
          padding: 15,
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: "#f5f5f5",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
            color: "#333",
          }}
          className='mt-9 mb-5 capitalize'
        >
          Chapter:{" "}
          {item.chapterId
            .map(
              (chapter: any) => chaptersMap.get(chapter.$id)?.title || "Unknown"
            )
            .join(", ")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          Purchase ID: {item.$id}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          User:{" "}
          {item.userId
            .map((user: any) => `${user.$id} (${user.name || "Unknown"})`)
            .join(", ")}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          Validity: {validityDays} days left
        </Text>
        {hasAccess ? (
          <CustomButton
            title='View PDF'
            containerStyles={{
              backgroundColor: "#007bff",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
            handlePress={() =>
              item.chapterId.forEach((chapter: any) =>
                handleViewPDF(chaptersMap.get(chapter.$id)?.pdfLink || "")
              )
            }
          />
        ) : (
          <CustomButton
            title='Buy Now'
            containerStyles={{
              backgroundColor: "#28a745",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
            handlePress={handleBuyNow}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <FlatList
        data={purchases}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No purchases found.</Text>}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
      <Footer />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "99%",
              height: "99%",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <WebView
              source={{ uri: selectedPdf || "" }}
              style={{ width: dimensions.width, height: dimensions.height }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#f00",
                padding: 10,
                borderRadius: 20,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Check;
