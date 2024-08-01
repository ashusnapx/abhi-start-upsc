import { Client, Account, ID, Databases } from "react-native-appwrite";

// Define the appwrite configuration interface
interface AppwriteConfig {
  endpoint: string;
  platform: string;
  projectId: string;
  databaseId: string;
  usersCollectionId: string;
  courseCollectionId: string;
  storageId: string;
}

// Create the appwrite configuration object
export const appwriteConfig: AppwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ashu.upsc",
  projectId: "66a9ff3c003154bc06ab",
  databaseId: "66aa0103000dc64e1194",
  usersCollectionId: "66aa0124000c0326231e",
  courseCollectionId: "66aa0156003dc4aaba6b",
  storageId: "66aa039a002d0296bdee",
};

// Initialize the client and account objects
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

// Define the function to create a user
export const createUser = async (
  email: string | undefined,
  password: string,
  name: string | undefined
) => {
  if (!email || !name) {
    console.error("Email and name are required.");
    return;
  }

  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error("Failed to create user account.");
    }
    console.log("User account created successfully:", newAccount);
    await signIn(email, password);
    const newUser: any = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
      }
    );
    console.log("User document created successfully:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("User signed in successfully:", session);
    return session;
  } catch (error) {
    if (error instanceof Error) {
      // Handle the error if it's an instance of the built-in Error class
      console.error("Error signing in:", error.message);
    } else {
      // Handle other types of errors (e.g., if the error is an object or string)
      console.error("An unknown error occurred during sign-in:", error);
    }
    throw new Error("Failed to sign in.");
  }
}

// Function to get user details
export const getUserDetails = async () => {
  try {
    // Get the current user's account information
    const currentUser = await account.get();
    const userId = currentUser.$id;

    // Fetch the user document from the database
    const userDocument = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    );

    if (!userDocument) {
      throw new Error("User document not found.");
    }

    return userDocument;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};


export { account };
