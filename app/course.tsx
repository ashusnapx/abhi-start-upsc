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
    loading: chaptersLoading,
    error: chaptersError,
    fetchChapters,
  } = useFetchChapters(subjectId);

  const { purchasedChapters, loading: purchasesLoading } =
    useFetchPurchasedChapters();

  const onRefresh = () => {
    fetchChapters();
  };

  const handleViewPDF = (pdfLink: string) => {
    Linking.openURL(pdfLink);
  };

  const allChapters = chapters.map((chapter) => ({
    ...chapter,
    isPurchased: purchasedChapters.some(
      (purchased) => purchased.$id === chapter.$id
    ),
  }));

  return (
    <View className='flex-1 bg-slate-300 p-4'>
      <FlatList
        data={allChapters}
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
            isPurchased={item.isPurchased}
            onViewPDF={handleViewPDF}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            {chaptersLoading || purchasesLoading ? (
              <ActivityIndicator size='large' color='#0000ff' />
            ) : (
              <Text>No chapters available.</Text>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={chaptersLoading || purchasesLoading}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default Course;
