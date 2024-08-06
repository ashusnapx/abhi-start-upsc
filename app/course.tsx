import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import ChapterItem from "@/components/ChapterItem";
import SubjectHeader from "@/components/SubjectHeader";
import { useFetchSubject } from "@/hooks/useFetchSubject";
import { useFetchChapters } from "@/hooks/useFetchChapters";
import { useFetchPurchasedChapters } from "@/hooks/useFetchPurchasedChapters";

const Course = () => {
  const route = useRoute();
  const { subjectId } = route.params as { subjectId: string };

  const {
    subjectName,
    subjectImage,
    subjectPrice,
    error: subjectError,
  } = useFetchSubject(subjectId);
  const {
    chapters,
    loading,
    error: chaptersError,
    fetchChapters,
  } = useFetchChapters(subjectId);
  const purchasedChapterIds = useFetchPurchasedChapters();

  const onRefresh = () => {
    fetchChapters();
  };

  const handleViewPDF = (pdfLink: string) => {
    Linking.openURL(pdfLink);
  };

  return (
    <View className='flex-1 bg-gray-100 p-4'>
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={
          <SubjectHeader
            subjectName={subjectName || "Subject"}
            subjectImage={subjectImage || ""}
            subjectPrice={subjectPrice || 0}
          />
        }
        renderItem={({ item }) => (
          <ChapterItem
            chapter={item}
            isPurchased={purchasedChapterIds.includes(item.$id)}
            onViewPDF={handleViewPDF}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            {loading ? (
              <ActivityIndicator size='large' color='#0000ff' />
            ) : (
              <Text>No chapters available.</Text>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Course;
