import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ChapterItemProps {
  chapter: {
    $id: string;
    title: string;
    importantFor: string;
    pdfLink: string;
    price: number;
    pyqYear: string;
  };
  isPurchased: boolean;
  onViewPDF: (pdfLink: string) => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  isPurchased,
  onViewPDF,
}) => (
  <View className='p-4 bg-white rounded-lg shadow-md mb-4'>
    <Text className='text-xl font-semibold mb-2'>{chapter.title}</Text>
    <Text className='text-gray-600 mb-2'>
      Important For: {chapter.importantFor}
    </Text>
    <Text className='text-gray-600 mb-2'>PYQ Year: {chapter.pyqYear}</Text>
    <Text className='text-gray-600 mb-2'>Price: ₹{chapter.price}</Text>
    {isPurchased ? (
      <TouchableOpacity onPress={() => onViewPDF(chapter.pdfLink)}>
        <Text className='text-blue-500'>View PDF</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Text className='text-blue-500'>Buy Now</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default ChapterItem;
