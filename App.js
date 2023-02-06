import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import HomeScreen from "./src/screens/HomeScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import MovieScreen from "./src/screens/MovieScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { COLORS } from "./src/constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const Stack = createNativeStackNavigator();

// Initialize Apollo Client
const cache = new InMemoryCache({
  typePolicies: {
    Film: {
      fields: {
        characterConnection: relayStylePagination(),
      },
    },
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primaryColor,
    background: COLORS.secondaryBgColor,
  },
};

const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: cache,
});

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: COLORS.secondaryBgColor },
              headerTitleStyle: { color: COLORS.disableTextColor },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation, route }) => ({
                headerTitle: (props) => {
                  return (
                    <FontAwesomeIcon
                      icon={faHome}
                      color={COLORS.primaryTextColor}
                    />
                  );
                },
              })}
            />
            <Stack.Screen
              name="Character"
              component={CharacterScreen}
              options={({ navigation, route }) => ({
                headerRight: (props) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        size={20}
                        style={{ marginRight: 10 }}
                        color={COLORS.primaryColor}
                      />
                    </TouchableOpacity>
                  );
                },
                headerStyle: {
                  height: 1,
                  backgroundColor: COLORS.secondaryBgColor,
                },
              })}
            />
            <Stack.Screen
              name="Movie"
              component={MovieScreen}
              options={({ navigation, route }) => ({
                headerRight: (props) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        size={20}
                        style={{ marginRight: 10 }}
                        color={COLORS.primaryColor}
                      />
                    </TouchableOpacity>
                  );
                },
                headerStyle: {
                  height: 1,
                  backgroundColor: COLORS.secondaryBgColor,
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent("StarWarsEncyclopedia", () => App);
