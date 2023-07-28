import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import Container from "@/components/Container";
import { FlashList } from "@shopify/flash-list";
import { FetchHomeNewsArticles } from "@/api/routes/news_articles";
import { useQuery } from "react-query";
import NewsItem, { NewsItemHeight } from "@/components/Home/NewsItem";
import { TabHomeScreenProps } from "@/types";
import { Box, useTheme } from "native-base";
import { setNewsArticle } from "@/redux/features/news/newsSlice";
import HomeHeader from "@/components/Home/HomeHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GamesCarousel from "../../../../components/Home/GamesCarousel/GamesCarousel";

type Props = {};

const HomeScreen = ({ navigation }: TabHomeScreenProps<"Home">) => {
  const userRedux = useSelector((state: RootState) => state.user.user);
  const tokenApi = useSelector((state: RootState) => state.user.tokenApi);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const news = useSelector((state: RootState) => state.news.news);

  const dispatch = useDispatch();

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data: newsArticles,
    isLoading: newsArticlesLoading,
    isError: newsArticlesError,
  } = useQuery(
    ["newsArticles", "trending", tokenApi],
    () => FetchHomeNewsArticles(tokenApi),
    {
      enabled: isLoggedIn,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (news) {
      navigation.navigate("News");
    }
  }, [news]);

  return (
    <Container safeAreaBottom={false}>
      <FlashList
        ListHeaderComponent={() => {
          return (
            <Box style={{ paddingHorizontal: 10 }}>
              <HomeHeader
                onPressNotifications={() => {}}
                onPressMessages={() => {}}
              />
              <Box
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                  marginTop: 27,
                }}
              >
                <Text
                  style={{
                    ...styles.textSectionTitle,
                    color: colors["secondary"][900],
                  }}
                >
                  Trending Games
                </Text>
                <Box
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                  }}
                >
                  <LinearGradient
                    colors={[colors["secondary"][900], "#96C0E8"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 100,
                    }}
                  />
                </Box>
              </Box>
              <GamesCarousel
                goToGame={(game) => {
                  console.log(game);
                }}
              />

              <Box
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                  marginTop: 27,
                }}
              >
                <Text
                  style={{
                    ...styles.textSectionTitle,
                    color: colors["secondary"][900],
                  }}
                >
                  Recent News
                </Text>
                <Box
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                  }}
                >
                  <LinearGradient
                    colors={[colors["secondary"][900], "#96C0E8"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 100,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        }}
        data={
          newsArticles && newsArticles.data
            ? newsArticles.data
            : newsArticlesLoading
            ? new Array(10).fill({})
            : []
        }
        renderItem={({ item }) => {
          if (newsArticlesLoading) {
            return (
              <Box style={{ paddingHorizontal: 10 }}>
                <NewsItem isLoading={true} />;
              </Box>
            );
          } else {
            return (
              <Box style={{ paddingHorizontal: 10 }}>
                <NewsItem
                  news={item}
                  onPress={() => {
                    dispatch(setNewsArticle(item));
                  }}
                />
              </Box>
            );
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={NewsItemHeight}
        scrollEnabled={newsArticlesLoading ? false : true}
      />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textSectionTitle: {
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 33,
  },
});
