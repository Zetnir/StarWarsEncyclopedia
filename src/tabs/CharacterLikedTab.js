import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CharacterLikedTab = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Character Link Tab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CharacterLikedTab;
