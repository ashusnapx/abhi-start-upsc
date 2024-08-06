import { appwriteConfig, database } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";

export const purchaseSubject = async (userId: string, subjectId: string) => {
  try {
    // Update the user's purchasedSubjects list
    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      {
        $add: { purchasedSubjects: subjectId },
      }
    );
    console.log("Subject purchased successfully");
  } catch (error) {
    console.error("Error purchasing subject:", error);
    throw error;
  }
};

// Function to handle chapter purchase
export const purchaseChapter = async (userId: string, chapterId: string) => {
  try {
    // Update the user's purchasedChapters list
    await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      {
        $add: { purchasedChapters: chapterId },
      }
    );
    console.log("Chapter purchased successfully");
  } catch (error) {
    console.error("Error purchasing chapter:", error);
    throw error;
  }
};

// Function to handle payment and unlock content
export const handlePayment = async (
  userId: string,
  contentId: string,
  contentType: "subject" | "chapter"
) => {
  try {
    // Create a new payment record
    await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.purchasesCollectionId,
      ID.unique(),
      {
        userId,
        contentId,
        contentType,
        purchaseDate: new Date().toISOString(),
        expiryDate: null, // Set expiry date if needed
      }
    );
    console.log("Payment record created successfully");

    // Unlock content
    if (contentType === "subject") {
      await purchaseSubject(userId, contentId);
    } else if (contentType === "chapter") {
      await purchaseChapter(userId, contentId);
    }
  } catch (error) {
    console.error("Error handling payment:", error);
    throw error;
  }
};
