import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Container from "@/components/Container";
import { AuhtStyles } from "../AuhtStyles";
import { Box, useTheme } from "native-base";
import { textColorGray } from "@/constants/Colors";
import LoginForm from "@/components/Login/LoginForm";
import { LogInDto } from "@/models/dto/Auth";
import { RootStackScreenProps } from "@/types";
import { useMutation } from "react-query";
import { AuthLogIn } from "@/api/routes/auth";
import { storeDeviceUuid } from "@/secure-store/DeviceUuid";
import { storeAuthToken } from "@/secure-store/AuthToken";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/user/userSlice";
import { ErrorResponseType } from "@/api/client";
import Toast from "react-native-toast-message";

type Props = {};

const LogInScreen = ({ navigation }: RootStackScreenProps<"LogIn">) => {
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const emailOrUsername = React.useRef("");
  const password = React.useRef("");

  const LogInMutation = useMutation(
    (data: LogInDto) => AuthLogIn(data.emailOrUsername, data.password),
    {
      onSuccess: (data) => {
        if (data.deviceUuid) storeDeviceUuid(data.deviceUuid);
        if (data.accessToken) storeAuthToken(data.accessToken);
        dispatch(login(data));
      },
      onError: (error: ErrorResponseType) => {
        if (error && error.message) {
          if (error && error.data) {
            if (error.data.tfa !== undefined && error.data.tfa === true) {
              navigation.push("Tfa", {
                emailOrUsername: emailOrUsername.current,
                password: password.current,
              });
            } else {
              Toast.show({
                type: "error",
                text2: error.message,
              });
            }
          }
        }
      },
    }
  );

  return (
    <Container>
      <Box style={styles.container}>
        <Text
          style={[
            AuhtStyles.pageTitleText,
            {
              color: colors["secondary"][900],
            },
          ]}
        >
          Hello!
        </Text>
        <Text
          style={[
            AuhtStyles.pageSubText,
            {
              color: textColorGray,
            },
          ]}
        >
          Sign in to continue
        </Text>

        <Box style={styles.containerForm}>
          <LoginForm
            handleLogin={(data: LogInDto) => {
              emailOrUsername.current = data.emailOrUsername;
              password.current = data.password;
              LogInMutation.mutate(data);
            }}
            handlePressForgotPassword={() =>
              navigation.navigate("ForgotPassword")
            }
            isDisabled={LogInMutation.isLoading}
            isLoading={LogInMutation.isLoading}
          />
        </Box>

        <Box
          marginTop={5}
          marginBottom={5}
          alignItems="center"
          flexDirection={"row"}
        >
          <Box style={styles.containerDivider} />

          <Box marginLeft={5} marginRight={5}>
            <Text
              style={{
                color: "#BFBFBF",
                fontSize: 12,
                lineHeight: 20,
                fontWeight: "400",
              }}
            >
              or sign in with
            </Text>
          </Box>
          <Box style={styles.containerDivider} />
        </Box>
      </Box>
      <Box style={styles.containerSignUp}>
        <Text style={AuhtStyles.preLinkText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          disabled={LogInMutation.isLoading}
        >
          <Text style={AuhtStyles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </Box>
    </Container>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  containerForm: {
    marginTop: 30,
  },
  containerDivider: {
    flex: 1,
    height: 0,
    borderWidth: 0.5,
    borderColor: "#BFBFBF",
  },
  containerSignUp: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "#BFBFBF",
    borderTopWidth: 0.5,
  },
});
