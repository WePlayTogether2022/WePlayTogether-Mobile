import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { LogInDto } from "@/models/dto/Auth";
import { Box, FormControl, Input } from "native-base";
import { inputIconColorpink, textLabelColor } from "@/constants/Colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuhtStyles } from "@/screens/Root/AuhtStyles";
import WptButton from "../WptButton";

type Props = {
  handleLogin: (values: LogInDto) => void;
  handlePressForgotPassword: () => void;

  isDisabled: boolean;
  isLoading: boolean;
};

const LoginForm = (props: Props) => {
  const { handleLogin, handlePressForgotPassword, isDisabled, isLoading } =
    props;

  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "ufo",
      password: "Mammaps4!",
    } as LogInDto,
    validationSchema: yup.object().shape({
      emailOrUsername: yup.string().required("Email or Username is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <FormControl>
        <FormControl.Label color={textLabelColor}>
          Email or Username
        </FormControl.Label>
        <Input
          variant={"filled"}
          style={{
            height: 55,
          }}
          value={formik.values.emailOrUsername}
          onChangeText={(text) => formik.setFieldValue("emailOrUsername", text)}
          rounded={50}
          InputLeftElement={
            <Box marginLeft={5}>
              <AntDesign name="mail" size={21} color={inputIconColorpink} />
            </Box>
          }
          isDisabled={isDisabled}
        />
      </FormControl>
      <FormControl marginTop={2}>
        <FormControl.Label color={textLabelColor}>Password</FormControl.Label>
        <Input
          variant={"filled"}
          style={{
            height: 55,
          }}
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          rounded={50}
          InputLeftElement={
            <Box marginLeft={5}>
              <AntDesign name="lock" size={21} color={inputIconColorpink} />
            </Box>
          }
          InputRightElement={
            <Box marginRight={5}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Entypo
                  name={showPassword ? "eye-with-line" : "eye"}
                  size={21}
                  color={inputIconColorpink}
                />
              </TouchableOpacity>
            </Box>
          }
          isDisabled={isDisabled}
        />
      </FormControl>
      <Box marginTop={2} alignItems="flex-end">
        <TouchableOpacity
          onPress={handlePressForgotPassword}
          disabled={isDisabled}
        >
          <Text style={AuhtStyles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </Box>
      <Box marginTop={5} alignItems={"center"}>
        <WptButton
          label="Sign In"
          onPress={() => {
            formik.handleSubmit();
            Keyboard.dismiss();
          }}
          disabled={isDisabled || isLoading}
          isLoading={isLoading}
          maxWidth={315}
        />
      </Box>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
