import { Keyboard, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  mode?: "light" | "dark";
  children?: React.ReactNode;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
  safeAreaLeft?: boolean;
  safeAreaRight?: boolean;
  dismissKeyboardEnabled?: boolean;
};

const Container = (props: Props) => {
  const {
    mode = "light",
    safeAreaTop = true,
    safeAreaBottom = true,
    safeAreaLeft = true,
    safeAreaRight = true,
    dismissKeyboardEnabled = true,
  } = props;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: mode === "light" ? "#fff" : "#000",
          paddingTop: safeAreaTop ? insets.top : 0,
          paddingBottom: safeAreaBottom ? insets.bottom : 0,
          paddingLeft: safeAreaLeft ? insets.left : 0,
          paddingRight: safeAreaRight ? insets.right : 0,
        },
      ]}
      onTouchStart={() => {
        if (dismissKeyboardEnabled) {
          Keyboard.dismiss();
        }
      }}
    >
      {props.children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
