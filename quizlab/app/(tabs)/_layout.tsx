import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BaseColors, Gray } from "@/constants/colors";

// tab 아이콘 영역
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: BaseColors.point,
        tabBarInactiveTintColor: Gray[20],
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="workbook"
        options={{
          title: "문제집",
          tabBarIcon: ({ color }) => (
            <Feather name="folder-plus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "풀이 기록",
          tabBarIcon: ({ color }) => (
            <Feather name="edit-2" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "내 정보",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
