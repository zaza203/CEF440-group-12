import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ConfirmCode from "./ConfirmCode";
import NewPassword from "./NewPassword";

const Stack = createStackNavigator();

const AuthLayout = () => {
  return (
    <>
      <Stack.Navigator options={{ headerShow: true }} initialRouteName="login">
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
          component={Login}
        />

        <Stack.Screen
          name="forgotPassword"
          options={{ headerShown: false }}
          component={ForgotPassword}
        />

        <Stack.Screen
          name="confirmCode"
          options={{ headerShown: false }}
          component={ConfirmCode}
        />

        <Stack.Screen
          name="newPassword"
          options={{ headerShown: false }}
          component={NewPassword}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthLayout;
