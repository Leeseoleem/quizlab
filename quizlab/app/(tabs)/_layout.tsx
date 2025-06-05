import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";

import TabBarBackground from "@/components/ui/TabBarBackground";
import { MainColors, GrayColors } from "@/constants/Colors";

export default function TabLayout() {
  // 현재 기기의 Safe Area 여백(insets) 값
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: MainColors.primary,
        tabBarInactiveTintColor: GrayColors.gray20,

        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: {
          position: "relative",
          height: insets.bottom + 70,
          paddingTop: 8,
          backgroundColor: GrayColors.white,
          borderColor: GrayColors.gray20,
          elevation: 4, // Android 그림자
          shadowOpacity: 0.05, // iOS 그림자
        },

        tabBarLabelStyle: {
          fontFamily: "Gmarket-Medium",
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Octicons size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="problem"
        options={{
          title: "문제집",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="folder-plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "기록",
          tabBarIcon: ({ color }) => (
            <Octicons size={24} name="pencil" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "통계",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="bar-chart-2" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "내 정보",
          tabBarIcon: ({ color }) => (
            <Octicons size={24} name="person-fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
