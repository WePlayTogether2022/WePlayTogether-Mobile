import { RootStackParamList } from "@/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import { LoginResponse } from "@/api/routes/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { login } from "@/redux/features/user/userSlice";
import LogInScreen from "@/screens/Root/LogInScreen/LogInScreen";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  data?: LoginResponse;
};

const RootNavigation = ({ data }: Props) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const showRoot = React.useMemo(() => {
    if (isLoggedIn) {
      return true;
    } else if (!isLoggedIn && data) {
      return true;
    } else {
      return false;
    }
  }, [isLoggedIn, data]);

  React.useEffect(() => {
    if (!isLoggedIn && data) {
      dispatch(login(data));
    }
  }, [isLoggedIn, data]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}
    >
      {showRoot ? (
        <Stack.Group>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="LogIn" component={LogInScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
