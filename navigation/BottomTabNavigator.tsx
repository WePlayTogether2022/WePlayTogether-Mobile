import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "@/types";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import TabHomeStackNavigator from "./TabHomeStackNavigator";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

type Props = {};

const BottomTabNavigator = (props: Props) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <React.Fragment>
      <BottomTab.Navigator
        initialRouteName="TabHomeStack"
        screenOptions={{
          tabBarActiveTintColor: "#EC4EC0",
          tabBarInactiveTintColor: "#C4A8FF",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors["secondary"][900],
            height: insets.bottom + 60,
          },
        }}
      >
        <BottomTab.Screen
          name="TabHomeStack"
          component={TabHomeStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
};

export default BottomTabNavigator;

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
