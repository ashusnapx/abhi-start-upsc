import React from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  onBuyNow: (chapterId: string) => void;
}

const ChapterItem = ({
  chapter,
  isPurchased,
  onViewPDF,
  onBuyNow,
}: ChapterItemProps) => {
  const navigation = useNavigation();

  const handleBuyNow = async () => {
    try {
      const paytmUrl = `paytmmp://pay?pa=9352478931@ptaxis&pn=Ashutosh&mc=yourMerchantCode&tid=uniqueTransactionId&tr=uniqueTransactionRefNo&tn=PaymentForChapter&am=${chapter.price}&cu=INR&url=yourCallbackUrl`;
      const phonePeUrl = `phonepe://pay?amount=${chapter.price}&name=YourName&phone=yourPhoneNumber&orderId=uniqueOrderId&description=PaymentForChapter&callbackUrl=yourCallbackUrl`;

      const canOpenPaytm = await Linking.canOpenURL(paytmUrl);
      const canOpenPhonePe = await Linking.canOpenURL(phonePeUrl);

      if (canOpenPaytm) {
        await Linking.openURL(paytmUrl);
      } else if (canOpenPhonePe) {
        await Linking.openURL(phonePeUrl);
      } else {
        navigation.navigate("bookmark");
      }
    } catch (error) {
      // console.error("Error opening payment app: ", error);
      navigation.navigate("bookmark");
    }
  };

  return (
    <View className='p-4 bg-white rounded-lg shadow-md mb-4'>
      <Text className='text-xl font-semibold mb-2 tracking-tighter capitalize'>
        {chapter.title}
      </Text>
      <Text className='text-gray-600 mb-2'>
        Important For: {chapter.importantFor}
      </Text>
      <Text className='text-gray-600 mb-2'>PYQ Year: {chapter.pyqYear}</Text>
      <Text className='text-gray-600 mb-2'>PDF Price: ₹{chapter.price}</Text>
      <Text className='text-gray-600 mb-2'>Validity: 1 Month</Text>
      {isPurchased ? (
        <TouchableOpacity onPress={() => onViewPDF(chapter.pdfLink)}>
          <Text className='text-blue-500'>View PDF</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleBuyNow}>
          <Text className='text-blue-500'>Buy Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChapterItem;
