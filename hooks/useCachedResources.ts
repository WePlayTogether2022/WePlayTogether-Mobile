import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken, removeAuthToken } from "@/secure-store/AuthToken";
import { AuthLogInAuthToken, LoginResponse } from "@/api/routes/auth";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [data, setData] = useState<LoginResponse | undefined>(undefined);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const authToken = await getAuthToken();
        if (authToken) {
          try {
            const data = await AuthLogInAuthToken(authToken);
            if (data) setData(data);
          } catch (e) {
            await removeAuthToken();
          }
        }

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {
    isLoadingComplete: isLoadingComplete,
    data: data,
  };
}
