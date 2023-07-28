import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Spinner, useTheme } from "native-base";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  height?: number;
  width?: DimensionValue;
  maxWidth?: DimensionValue;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?:
    | "700"
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "800"
    | "900";
};

const WptButton = (props: Props) => {
  const {
    height = 50,
    width = "100%",
    fontSize = 20,
    lineHeight = 25,
    fontWeight,
  } = props;

  const colors = useTheme().colors;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: width,
          maxWidth: props.maxWidth,
          opacity: props.disabled || props.isLoading ? 0.5 : 1,
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabled || props.isLoading}
    >
      <LinearGradient
        colors={[colors["secondary"][900], colors["primary"][900]]}
        start={[0, 0]}
        end={[1, 0]}
        locations={[0, 1]}
        style={{
          width: width,
          maxWidth: props.maxWidth,
          height: height,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          opacity: 0.7,
        }}
      >
        {props.isLoading ? (
          <Spinner color="white" size={20} />
        ) : (
          <Text
            style={[
              styles.buttonLabel,
              {
                fontSize: fontSize,
                lineHeight: lineHeight,
                fontWeight: fontWeight ? fontWeight : "700",
              },
            ]}
          >
            {props.label}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default WptButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  buttonLabel: {
    color: "white",
    // fontSize: 20,
    // fontWeight: "700",
    // lineHeight: 25,
  },
});
