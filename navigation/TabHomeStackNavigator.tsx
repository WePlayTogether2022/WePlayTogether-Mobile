import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/BottomTabs/TabHome/HomeScreen/HomeScreen";
import NewsScreen from "@/screens/BottomTabs/TabHome/NewsScreen/NewsScreen";
import { TabHomeParamList } from "@/types";

type Props = {};

const Stack = createNativeStackNavigator<TabHomeParamList>();

export default function TabHomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen
        // @ts-ignore
        name="News"
        component={NewsScreen}
        options={{
          headerShadowVisible: false,
          headerShown: true,
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
