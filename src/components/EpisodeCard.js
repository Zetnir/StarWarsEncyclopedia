import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const EpisodeCard = ({ title, releaseDate, openingCrawl, navigation, id }) => {
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
          id: id,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{releaseDate}</Text>
        <Text
          numberOfLines={numOfLines}
          onTextLayout={onTextLayout}
          style={styles.openingCrawl}
        >
          {openingCrawl.substring(0, 51)}...
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
    height: 200,
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

export default EpisodeCard;
