import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MovieScreen = ({}) => {
  return (
    <View>
      <Text style={styles.title}>This is Movie Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
  },
});

export default MovieScreen;
