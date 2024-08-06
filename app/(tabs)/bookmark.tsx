import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import { images } from "@/constants";
import { Link } from "expo-router";

const Bookmark = () => {
  // Sample data for UPI IDs
  const upiIds = ["7071282167@ptsbi"];

  const handleCopyToClipboard = (upiId: string) => {
    Clipboard.setString(upiId);
    Alert.alert(
      "Copied to Clipboard",
      "The UPI ID has been copied to your clipboard."
    );
  };

  const supportEmail = "abhisheknarain0987@gmail.com";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1f2937", padding: 16 }}>
      {/* QR Code Section */}
      <View style={{ alignItems: "center", marginBottom: 24 }} className='mt-5'>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: 16,
          }}
        >
          Scan the QR Code
        </Text>
        <Image
          source={images.payment}
          style={{
            width: "100%",
            height: 256,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
          resizeMode='contain'
        />
      </View>

      {/* UPI IDs Section */}
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: 12,
            }}
          >
            UPI IDs
          </Text>
          {upiIds.map((upiId, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 16, color: "#ffffff", flex: 1 }}>
                {upiId}
              </Text>
              <TouchableOpacity onPress={() => handleCopyToClipboard(upiId)}>
                <Text style={{ color: "#4f9deb", marginLeft: 10 }}>Copy</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Rules and Regulations Section */}
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: 12,
            }}
          >
            Rules and Regulations
          </Text>
          <Text
            style={{ fontSize: 16, color: "#d1d5db", marginBottom: 12 }}
            className='text-left text-lg tracking-wide'
          >
            1. Please make sure to enter the correct{"\n"}    UPI ID while making
            payments.
            {"\n"}2. Payments are non-refundable.
            {"\n"}3. Contact support at{" "}
            <Link
              className='text-blue-500'
              href={`mailto:${supportEmail}?subject=App+query&body=Hello sir,&"`}
            >
              {supportEmail}
            </Link>{" "}
            for any issues.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;
