import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginScreen from "../screens/account/LoginScreen";
import RegisterScreen from "../screens/account/RegisterScreen";
import Tabs from "../screens/Home/Tabs";

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <HomeStackNavigator.Screen name="Login" component={LoginScreen} />
      <HomeStackNavigator.Screen name="Home" component={Tabs} />
      <HomeStackNavigator.Screen name="Register" component={RegisterScreen} />
    </HomeStackNavigator.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return <MyStack />;
}
