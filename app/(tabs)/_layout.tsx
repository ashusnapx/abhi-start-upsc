import React from "react";
import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

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
      className={`${focused ? "font-psemibold" : "font-pregular"} text-sm`}
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

const screens: ScreenProps[] = [
  { name: "home", title: "Home", icon: icons.home },
  { name: "bookmark", title: "Bookmark", icon: icons.order },
  { name: "profile", title: "Profile", icon: icons.profile },
];

const TabsLayout = () => (
  <Tabs screenOptions={screenOptions}>
    {screens.map(({ name, title, icon }) => (
      <Tabs.Screen
        key={name}
        name={name}
        options={{
          title,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={icon} color={color} name={title} focused={focused} />
          ),
        }}
      />
    ))}
  </Tabs>
);

export default TabsLayout;
