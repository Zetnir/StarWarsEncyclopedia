import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const CharacterCard = ({ name, navigation, id }) => {
  const onCardPressed = () => {
    navigation.navigate("Character", {
      id: id,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onCardPressed();
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginVertical: 20,
    marginLeft: 20,
    color: "white",
  },
  item: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 200,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "lightblue",
  },
  date: {
    marginLeft: 50,
  },
  openingCrawl: {
    fontSize: 18,
    margin: 20,
    height: "100%",
    flex: 1,
    width: 300,
  },
});

export default CharacterCard;
