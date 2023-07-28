import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  mode?: "light" | "dark";
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  disabled?: boolean;
};

const IoniconsButton = (props: Props) => {
  const { mode = "dark", iconName, onPress, disabled = false } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          opacity: disabled ? 0.5 : 1,
          backgroundColor:
            mode === "light" ? "rgba(173, 191, 255, 0.3)" : "#2A3341",
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={mode === "light" ? "black" : "white"}
      />
    </TouchableOpacity>
  );
};

export default IoniconsButton;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});
