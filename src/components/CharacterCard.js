import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants";

const CharacterCard = ({ name, navigation, id, onCardTap }) => {
  const onCardPressed = () => {
    onCardTap();
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
    fontSize: 25,
    marginVertical: 20,
    marginHorizontal: 10,
    color: "white",
  },
  item: {
    borderRadius: 10,
    margin: 10,
    height: 120,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.primaryBgColor,
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
