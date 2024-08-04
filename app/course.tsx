import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { database, appwriteConfig } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

// Define TypeScript interface for Chapter and Subject
interface Chapter {
  $id: string;
  title: string;
  importantFor: string;
  pdfLink: string;
  price: number;
  pyqYear: string;
  subjectId: string;
}

interface Subject {
  $id: string;
  title: string;
  subjectImageLink: string;
  price: number;
  chapterId: string[];
}

const Course = () => {
  const route = useRoute();
  const { subjectId } = route.params as { subjectId: string }; // Extract subjectId from route params

  console.log("Received subjectId:", subjectId); // Debugging line

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [subjectImage, setSubjectImage] = useState<string | null>(null);
  const [subjectPrice, setSubjectPrice] = useState<number | null>(null);

  const fetchSubject = useCallback(async () => {
    try {
      if (!subjectId) {
        setError("No subject selected");
        return;
      }

      console.log("Fetching subject with ID:", subjectId);

      // Fetch the subject document by ID
      const subjectResponse = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId,
        subjectId
      );

      console.log("Subject response:", subjectResponse);

      if (subjectResponse) {
        setSubjectName(subjectResponse.title || "Subject");
        setSubjectImage(subjectResponse.subjectImageLink || "");
        setSubjectPrice(subjectResponse.price || 0);
      } else {
        setError("Subject not found");
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
      setError("Failed to load subject");
    }
  }, [subjectId]);

  const fetchChapters = useCallback(async () => {
    try {
      if (!subjectId) {
        setError("No subject selected");
        return;
      }

      console.log("Fetching chapters for subject ID:", subjectId);

      // Fetch chapters related to the subject
      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chapterCollectionId,
        [Query.equal("subjectId", subjectId)]
      );

      console.log("Chapters response:", response);

      const documents = response.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title || "",
        importantFor: doc.importantFor || "",
        pdfLink: doc.pdfLink || "",
        price: doc.price || 0,
        pyqYear: doc.pyqYear || "",
        subjectId: doc.subjectId || "",
      })) as Chapter[];

      if (documents.length === 0) {
        setError("No chapters found for this subject");
      } else {
        setChapters(documents);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setError("Failed to load chapters");
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    fetchSubject();
    fetchChapters();
  }, [fetchSubject, fetchChapters]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchChapters().finally(() => setRefreshing(false));
  };

  const handleViewPDF = (pdfLink: string) => {
    Linking.openURL(pdfLink);
  };

  const renderItem = ({ item }: { item: Chapter }) => (
    <View className='p-4 bg-white rounded-lg shadow-md mb-4'>
      <Text className='text-xl font-semibold mb-2'>{item.title}</Text>
      <Text className='text-gray-600 mb-2'>
        Important For: {item.importantFor}
      </Text>
      <Text className='text-gray-600 mb-2'>PYQ Year: {item.pyqYear}</Text>
      <Text className='text-gray-600 mb-2'>Price: ₹{item.price}</Text>
      <TouchableOpacity onPress={() => handleViewPDF(item.pdfLink)}>
        <Text className='text-blue-500'>View PDF</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className='flex-1 bg-gray-100 p-4'>
      {loading ? (
        <ActivityIndicator size='large' color='#4CAF50' />
      ) : error ? (
        <Text className='text-red-500'>{error}</Text>
      ) : (
        <>
          <View className='mb-4'>
            {subjectImage && (
              <Image
                source={{ uri: subjectImage }}
                className='w-full h-40 rounded-lg'
                resizeMode='cover'
              />
            )}
            <Text className='text-2xl font-bold mt-2'>{subjectName}</Text>
            <Text className='text-lg mt-1'>Price: ₹{subjectPrice}</Text>
          </View>
          <FlatList
            data={chapters}
            keyExtractor={(item) => item.$id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      )}
    </View>
  );
};

export default Course;
