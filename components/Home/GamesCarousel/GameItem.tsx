import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import { Game } from "@/models/resources/Game";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Skeleton } from "native-base";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  isLoading?: boolean;

  game?: Game;
  onPress?: (game: Game) => void;
};

export const GAME_ITEM_WIDTH = 280;
export const GAME_ITEM_HEIGHT = 200;

const GameItem = (props: Props) => {
  const { isLoading = false, game, onPress } = props;

  if (isLoading) {
    return <Skeleton h={GAME_ITEM_HEIGHT} w={GAME_ITEM_WIDTH} rounded="md" />;
  }

  if (!game) return null;

  return (
    <Box style={styles.container}>
      <LinearGradient
        colors={["#6114DF", "#F75E7E"]}
        // From bottom to top
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: GAME_ITEM_HEIGHT,
          borderRadius: 36,
          paddingLeft: 17,
          paddingRight: 17,
        }}
      >
        <Box
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.gameNameText}>
            {game.name.length > 20
              ? game.name.substring(0, 20) + "..."
              : game.name}
          </Text>
          <Box
            style={{
              width: 70,
              height: 70,
              backgroundColor: "white",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: game.logo.default.url,
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "transparent",
                borderRadius: 15,
              }}
            />
          </Box>
        </Box>
        <Box style={{ marginTop: 10 }}>
          <Text style={styles.gameDescriptionText}>
            {game.description && game.description.length > 100
              ? game.description.substring(0, 100) + "..."
              : game.description}
          </Text>
        </Box>
        <Box style={{ marginTop: 15, alignItems: "flex-end", width: "100%" }}>
          <TouchableWithoutFeedback
            onPress={() => onPress?.(game)}
            style={styles.button}
          >
            <LinearGradient
              colors={["#661BEA", "#411786"]}
              // From left to right
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 113,
                height: 42,
                borderRadius: 52,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.buttonText}>View</Text>
                <Box
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 100,
                    marginLeft: 18,
                  }}
                >
                  <LinearGradient
                    colors={["#FB3D81", "#EC4EC0"]}
                    // From top to bottom
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="arrowright" size={12} color="white" />
                  </LinearGradient>
                </Box>
              </Box>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </Box>
      </LinearGradient>
    </Box>
  );
};

export default GameItem;

const styles = StyleSheet.create({
  container: {
    width: GAME_ITEM_WIDTH,
    height: GAME_ITEM_HEIGHT,
    borderRadius: 36,
  },
  gameNameText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 21,
  },
  gameDescriptionText: {
    color: "white",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 15,
    fontStyle: "italic",
  },

  button: {
    width: 113,
    height: 42,
    borderRadius: 52,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
  },
});
