import {
  Client,
  Account,
  Databases,
  ID,
  AppwriteException,
  Query,
} from "react-native-appwrite";

// Define the appwrite configuration interface
interface AppwriteConfig {
  endpoint: string;
  platform: string;
  projectId: string;
  databaseId: string;
  usersCollectionId: string;
  subjectCollectionId: string;
  chapterCollectionId: string;
  purchasesCollectionId: string;
  storageId: string;
}

// Create the appwrite configuration object
export const appwriteConfig: AppwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ashu.upsc",
  projectId: "66a9ff3c003154bc06ab",
  databaseId: "66aa0103000dc64e1194",
  usersCollectionId: "66aef9a8000c3a7b2ce4",
  subjectCollectionId: "66aefa6000108853cf04",
  chapterCollectionId: "66aefac7000c44fc0585",
  purchasesCollectionId: "66aefb4a0036e03da96a",
  storageId: "66aa039a002d0296bdee",
};

// Initialize the client, account, and database objects
let client: Client;
let account: Account;
let database: Databases;

const initializeAppwriteClient = (): void => {
  client = new Client();
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

  account = new Account(client);
  database = new Databases(client);
};

// Call the function to initialize the client
initializeAppwriteClient();

// Function to create a user
export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: "admin" | "student"
) => {
  try {
    // Step 1: Create the user account
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new AppwriteException("Failed to create user account.");
    }
    console.log("User account created successfully:", newAccount);

    // Step 2: Authenticate the user immediately after account creation
    await signIn(email, password);

    // Step 3: Create a user document in the database with all required fields
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        password, // Include the password here if needed
        role,
        isActive: true,
        subscriptionEnd: null,
        purchasedSubjects: [],
        purchasedChapters: [],
      }
    );
    console.log("User document created successfully:", newUser);
    return newUser;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Error creating user account:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Function to sign in a user
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("User signed in successfully:", session);
    return session;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Error signing in:", error.message);
    } else {
      console.error("Unexpected error during sign-in:", error);
    }
    throw new Error("Failed to sign in.");
  }
}

export const fetchUserDetails = async (): Promise<any> => {
  try {
    const user = await account.get();
    const accountId = user.$id;

    const userDocResponse = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", accountId)]
    );

    if (userDocResponse.documents.length > 0) {
      return userDocResponse.documents[0]; // Get the first matching document
    } else {
      throw new Error("User document not found.");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    // Make sure the error thrown has a message property
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
};

export { account, database };
