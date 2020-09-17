import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Activity from "./Components/Activity";
import MainPage from "./Pages/MainPage";
import AddActivityPage from "./Pages/AddActivityPage";
import TimeSelector from "./Components/TimeSelector";
import SearchPage from "./Pages/SearchPage";
import ActivityDetailPage from "./Pages/ActivityDetailPage";
import activities from "./activities";
import LogInPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";

import { fetch_all, seach } from "./fetchActivities";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{
            headerLeft: null,
          }}
        />
        <Stack.Screen name="Add" component={AddActivityPage} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Detail" component={ActivityDetailPage} />
        <Stack.Screen
          name="Login"
          component={LogInPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
