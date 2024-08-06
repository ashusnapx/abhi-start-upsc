import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { fetchUserDetails } from "@/lib/appwrite";

// Define the properties for the TabIcon component
interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

// Define the properties for the screens in the tab layout
interface ScreenProps {
  name: string;
  title: string;
  icon: any;
}

// TabIcon component to render each tab icon
const TabIcon = ({ icon, color, name, focused }: TabIconProps) => (
  <View className='items-center justify-center gap-y-2'>
    <Image
      source={icon}
      resizeMode='contain'
      style={{ tintColor: color }}
      className='w-7 h-7'
    />
    <Text
      className={`${focused ? "font-bold" : "font-medium"} text-sm`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

// Screen options for the tabs
const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: "#FFA001",
  tabBarInactiveTintColor: "#CDCDE0",
  tabBarStyle: {
    backgroundColor: "#161622",
    borderTopWidth: 0.5,
    borderTopColor: "#232533",
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
};

const TabsLayout = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUserRole(userDetails.role);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getUserRole();
  }, []);

  // Define the screens array
  const screens: ScreenProps[] = [
    { name: "home", title: "Home", icon: icons.home },
    { name: "create", title: "Create", icon: icons.plus },
    { name: "bookmark", title: "Pay", icon: icons.order },
    { name: "profile", title: "Profile", icon: icons.profile },
  ];

  return (
    <Tabs screenOptions={screenOptions}>
      {screens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icon}
                color={color}
                name={title}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
