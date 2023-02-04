import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const EpisodeCard = ({ title, releaseDate, characters, imageUrl }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{releaseDate}</Text>
        <Text
          style={styles.characterList}
          numberOfLines={7}
          ellipsizeMode={"middle"}
        >
          {characters.map((character) => {
            return `${character.name}, `;
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
    color: "white",
  },
  item: {
    height: 400,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    overflow: "hidden",
    backgroundColor: "lightblue",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  date: {
    marginLeft: 50,
  },
  characterList: {
    fontSize: 20,
    margin: 20,
    flex: 1,
    width: 250,
  },
});

export default EpisodeCard;
