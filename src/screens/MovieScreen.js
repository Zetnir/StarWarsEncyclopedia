import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MovieScreen = ({ navigation, route }) => {
  console.log(route);
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{route.params.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default MovieScreen;
