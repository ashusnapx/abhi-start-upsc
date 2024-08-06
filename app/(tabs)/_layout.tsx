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

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => (
  <View className='items-center justify-center gap-y-2'>
    <Image
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className='w-6 h-6'
    />
    <Text
      className={`${focused ? "font-semibold" : "font-normal"} text-sm`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: "#FFA001",
  tabBarInactiveTintColor: "#CDCDE0",
  tabBarStyle: {
    backgroundColor: "#161622",
    borderTopWidth: 1,
    borderTopColor: "#232533",
    height: 65,
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
    { name: "bookmark", title: "Pay", icon: icons.order },
    { name: "profile", title: "Profile", icon: icons.profile },
  ];

  // Add the "Create" screen if the user is an admin
  if (userRole === "admin") {
    screens.splice(1, 0, { name: "create", title: "Create", icon: icons.plus });
  }

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
