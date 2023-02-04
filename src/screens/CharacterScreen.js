import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CharacterScreen = ({}) => {
  return (
    <View>
      <Text style={styles.title}>This is Character Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
  },
});

export default CharacterScreen;
