import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import CharacterScreen from "./src/screens/CharacterScreen";
import MovieScreen from "./src/screens/MovieScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Tab = createBottomTabNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Character" component={CharacterScreen} />
          <Tab.Screen name="Movie" component={MovieScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
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
