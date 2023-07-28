import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { NewsArticle } from "@/models/project/NewsArticle";
import { HStack, Skeleton, VStack, Text, Box } from "native-base";
import Animated from "react-native-reanimated";

type Props = {
  news?: NewsArticle;
  onPress?: () => void;
  isLoading?: boolean;
};

export const NewsItemHeight = 100;

const NewsItem = (props: Props) => {
  const { news, onPress, isLoading = false } = props;

  const fromDateToString = (date: Date): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  if (isLoading) {
    return (
      <HStack w="100%" h="100" maxW="400" space={4}>
        <Skeleton
          flex="1"
          h="70"
          w="70"
          rounded="md"
          startColor="coolGray.100"
        />
        <VStack flex="3" space="4">
          <Skeleton.Text />
        </VStack>
      </HStack>
    );
  }

  if (!news) return null;

  return (
    <HStack w="100%" h={NewsItemHeight} maxW="400" space={4}>
      <Animated.View
        sharedTransitionTag={`container_${news?.urlToImage}`}
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: news?.urlToImage }}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 10,
          }}
        />
      </Animated.View>
      <VStack flex="3" space="4">
        <Animated.Text
          sharedTransitionTag={`title_${news?.title}`}
          style={{
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {news?.title}
        </Animated.Text>
        <Box style={styles.containerBottom}>
          <Text style={styles.textPublishedAt}>
            {news && news.publishedAt
              ? fromDateToString(new Date(news.publishedAt))
              : null}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.textReadMore}>Read more</Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </HStack>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  containerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textPublishedAt: {
    color: "#BFBFBF",
    fontSize: 8,
    lineHeight: 20,
    fontWeight: "400",
  },
  textReadMore: {
    fontSize: 8,
    lineHeight: 20,
    fontWeight: "400",
    color: "#326da8",
  },
});
