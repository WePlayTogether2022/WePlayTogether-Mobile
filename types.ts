import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
/* ------------------------------------------------------ ROOT ------------------------------------------------------ */
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  LogIn: undefined;
  ForgotPassword: undefined;
  Tfa: {
    emailOrUsername: string;
    password: string;
  };
  SignUp: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

/* ------------------------------------------------------ BOTTOM TABS ------------------------------------------------------ */
export type RootTabParamList = {
  TabHomeStack: NavigatorScreenParams<TabHomeParamList> | undefined;
  TabSearchStack: undefined;
  TabAdd: undefined;
  TabEvents: undefined;
  TabMyUserProfileStack: undefined;
};
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/* ------------------------------------------------------ HOME STACK ------------------------------------------------------ */
export type TabHomeParamList = {
  Home: undefined;
  News: undefined;
  Notifications: undefined;
};

export type TabHomeScreenProps<Screen extends keyof TabHomeParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TabHomeParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
