import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { FetchGames } from "@/api/routes/games";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { Game, instanceOfGame } from "@/models/resources/Game";
import Carousel from "react-native-reanimated-carousel";
import { WindowsWidth } from "@/utils/layout";
import { useSharedValue } from "react-native-reanimated";
import GameItem from "./GameItem";
import { Box } from "native-base";
import PaginationItem from "./PaginationItem";

type Props = {
  goToGame: (game: Game) => void;
};

const GamesCarousel = (props: Props) => {
  const tokenApi = useSelector((state: RootState) => state.user.tokenApi);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const progressValue = useSharedValue<number>(0);
  const [selectedGameIndex, setSelectedGameIndex] = React.useState<number>(0);

  const { data, isLoading } = useQuery(
    ["games", "trending", tokenApi],
    () => FetchGames(tokenApi, 1, 5),
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

  const games: Game[] = React.useMemo(() => {
    if (!data) return [];
    if (!data.data) return [];
    if (!data.data.results) return [];

    return data.data.results;
  }, [data]);

  const baseOptions = {
    vertical: false,
    width: 298,
    height: 200,
    style: {
      width: WindowsWidth,
    },
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Carousel
        {...baseOptions}
        loop={false}
        autoPlay={false}
        autoPlayInterval={false ? 100 : 2000}
        data={
          isLoading ? new Array(5).fill({}).map((_, i) => ({ id: i })) : games
        }
        renderItem={({ item, index }) => {
          if (isLoading) {
            return <GameItem isLoading={true} />;
          } else if (item && instanceOfGame(item)) {
            return (
              <GameItem
                game={item}
                onPress={() => {
                  props.goToGame(item);
                }}
              />
            );
          } else {
            return <></>;
          }
        }}
        onProgressChange={(_, absoluteProgress) => {
          {
            progressValue.value = absoluteProgress;
            setSelectedGameIndex(Math.round(absoluteProgress));
          }
        }}
      />

      {games && games.length > 0 ? (
        <Box style={styles.paginationContainer}>
          {games.map((_, index) => {
            return (
              <PaginationItem
                animValue={progressValue}
                index={index}
                key={index}
                length={games.length}
                selectedIndex={selectedGameIndex}
              />
            );
          })}
        </Box>
      ) : null}
    </>
  );
};

export default GamesCarousel;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
  },
});
