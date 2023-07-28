import useCachedResources from "@/hooks/useCachedResources";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { theme } from "@/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "@/navigation";
import { Provider } from "react-redux";
import { store } from "@/redux/app/store";
import { QueryClientProvider, QueryClient } from "react-query";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function App() {
  const { isLoadingComplete, data } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <RootNavigation data={data} />
                <StatusBar style="auto" />
                <Toast />
              </QueryClientProvider>
            </Provider>
          </NativeBaseProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
