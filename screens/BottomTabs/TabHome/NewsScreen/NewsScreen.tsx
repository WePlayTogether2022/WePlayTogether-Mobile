import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from "react-native";
import React from "react";
import { TabHomeScreenProps } from "@/types";
import Container from "@/components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { windowWidth } from "@/constants/Layout";
import { setNewsArticle } from "@/redux/features/news/newsSlice";
import { Box, Text } from "native-base";
import GoBackButton from "@/components/GoBackButton";
import IoniconsButton from "@/components/IoniconsButton";
import * as Linking from "expo-linking";

type Props = {};

const NewsScreen = ({ navigation, route }: TabHomeScreenProps<"Home">) => {
  const news = useSelector((state: RootState) => state.news.news);

  const dispatch = useDispatch();

  const [showTitleInNavigationHeader, setShowTitleInNavigationHeader] =
    React.useState(false);

  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (news) {
        dispatch(setNewsArticle(null));
      }
    });
  }, [navigation, dispatch, news]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        if (showTitleInNavigationHeader && news) {
          return (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "black",
              }}
            >
              {news.title.length > 30
                ? news.title.substring(0, 30) + "..."
                : news.title}
            </Text>
          );
        } else {
          return "";
        }
      },
      headerLeft: () => <GoBackButton onPress={() => navigation.goBack()} />,
      headerRight: () => {
        if (!news) return null;
        return (
          <IoniconsButton
            iconName="link"
            onPress={() => Linking.openURL(news.url)}
          />
        );
      },
    });
  }, [navigation, showTitleInNavigationHeader]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // > 125 => show title
    if (event.nativeEvent.contentOffset.y > 125) {
      setShowTitleInNavigationHeader(true);
    } else {
      setShowTitleInNavigationHeader(false);
    }
  };

  const text =
    "Geweldig pand op geweldige locatie!\n\nDat mag je daadwerkelijk zo stellen...\n\nOp loopafstand van de Nachtegaalstraat en de Biltstraat tref je dit werkelijk bijzondere pand aan.";

  if (!news) return null;

  return (
    <Container safeAreaTop={false} safeAreaBottom={false}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Box style={styles.headerContainer}>
          <Text
            // sharedTransitionTag={`title_${news.title}`}
            // sharedTransitionStyle={transition}
            style={{ fontSize: 12, fontWeight: "bold", marginVertical: 10 }}
          >
            {news.title}
          </Text>
        </Box>
        <View
          // sharedTransitionTag={`container_${news.urlToImage}`}
          // sharedTransitionStyle={transition}
          style={styles.detailImage}
        >
          <Image
            // sharedTransitionTag={`image_${news.urlToImage}`}
            // sharedTransitionStyle={transition}
            resizeMode="cover"
            source={{ uri: news.urlToImage }}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <Box pt={5} paddingX={2}>
          <Text fontSize={13} color="gray.500" textAlign="justify">
            {news.content?.replaceAll("\\n", "\n").replaceAll("\\", "")}
          </Text>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 30,
  },
  detailImage: {
    width: windowWidth,
    maxWidth: 400,
    height: 200,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
