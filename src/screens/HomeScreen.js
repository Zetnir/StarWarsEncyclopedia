import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import EpisodeTab from "../tabs/EpisodeTab";
import CharacterLinkTab from "../tabs/CharacterLinkTab";
import HomeTabNavigation from "../navigations/HomeTabNavigator";

const HomeScreen = ({ navigation }) => {
  return <HomeTabNavigation />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
  },
});

export default HomeScreen;
