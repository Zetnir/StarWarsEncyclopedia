import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const EpisodeCard = ({ title, releaseDate, characters, navigation }) => {
  const NUM_OF_LINES = 5;
  const [showMore, setShowMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(0);

  const onTextLayout = useCallback((e) => {
    if (e.nativeEvent.lines.length >= NUM_OF_LINES) {
      setNumOfLines(e.nativeEvent.lines.length);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Movie", {
          title: title,
          releaseDate: releaseDate,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{releaseDate}</Text>
        <Text
          numberOfLines={numOfLines}
          onTextLayout={onTextLayout}
          style={styles.characterList}
        >
          {characters.map((character, idx) => {
            return `${character.name}${
              idx === characters.length - 1 ? "" : ", "
            }`;
          })}
        </Text>
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
    height: "100%",
    flex: 1,
    width: 300,
  },
});

export default EpisodeCard;
