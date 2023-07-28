import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { Box, useTheme } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { FetchNotificationsBadges } from "@/api/routes/notifications";

type Props = {
  onPressNotifications: () => void;
  onPressMessages: () => void;
};

const HomeHeader = (props: Props) => {
  const userRedux = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const tokenApi = useSelector((state: RootState) => state.user.tokenApi);
  const unreadGetStreamChannelsCount = useSelector(
    (state: RootState) => state.user.unreadGetStreamChannelsCount
  );

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data: unreadNotificationsCount,
    isLoading: unreadNotificationsCountLoading,
  } = useQuery(
    ["notificationBadge", userRedux?.id, tokenApi],
    () => FetchNotificationsBadges([userRedux?.id || 0], tokenApi),
    {
      enabled: isLoggedIn && userRedux !== null ? true : false,
      refetchOnWindowFocus: false,
      retry: 0,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <Box style={styles.container}>
      <Box style={styles.containerAvatarAndUsername}>
        <Image
          source={{
            uri: userRedux?.avatar.dynamicUrl
              .replace("{height}", "62")
              .replace("{width}", "62"),
          }}
          style={{
            width: 62,
            height: 62,
            borderRadius: 20,
          }}
        />
        <Box
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={styles.textWelcomeBack}>Welcome back</Text>
          <Text
            style={[styles.textUsername, { color: colors["secondary"][900] }]}
          >
            {userRedux?.username}
          </Text>
        </Box>
      </Box>
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.containerHeaderRightIcon,
            {
              backgroundColor: colors["secondary"][900],
              position: "relative",
            },
          ]}
        >
          {unreadNotificationsCount &&
          userRedux &&
          Object.keys(unreadNotificationsCount).includes(
            userRedux.id.toString()
          ) &&
          unreadNotificationsCount[userRedux.id].unreadCount > 0 ? (
            <Box
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                width: 5,
                height: 5,
                backgroundColor: "red",
                borderRadius: 100,
                zIndex: 20,
              }}
            />
          ) : null}
          <Feather name="bell" size={21} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.containerHeaderRightIcon,
            {
              backgroundColor: colors["secondary"][900],
              position: "relative",
            },
          ]}
        >
          {unreadGetStreamChannelsCount > 0 ? (
            <Box
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                width: 5,
                height: 5,
                backgroundColor: "red",
                borderRadius: 100,
                zIndex: 20,
              }}
            />
          ) : null}

          <MaterialCommunityIcons
            name="message-outline"
            size={21}
            color="white"
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerAvatarAndUsername: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginLeft: 10,
  },
  textWelcomeBack: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
  },
  textUsername: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 30,
  },
  containerHeaderRightIcon: {
    marginLeft: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
