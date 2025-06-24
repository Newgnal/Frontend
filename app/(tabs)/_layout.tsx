import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import CommunityIcon from "@/assets/images/community.svg";
import HomeIcon from "@/assets/images/home.svg";
import NewsroomIcon from "@/assets/images/newsroom.svg";
import SettingIcon from "@/assets/images/setting.svg";
import SimulateIcon from "@/assets/images/simulate.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="newsroom"
        options={{
          title: "내 뉴스룸",
          tabBarIcon: ({ focused }) => (
            <NewsroomIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "커뮤니티",
          tabBarIcon: ({ focused }) => (
            <CommunityIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              fill="none"
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="simulate"
        options={{
          title: "모의투자",
          tabBarIcon: ({ focused }) => (
            <SimulateIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              fill="none"
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "설정",
          tabBarIcon: ({ focused }) => (
            <SettingIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              fill="none"
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />
    </Tabs>
  );
}
