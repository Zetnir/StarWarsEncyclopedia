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

const EpisodeCard = ({
  title,
  releaseDate,
  openingCrawl,
  navigation,
  id,
  image,
  itemStyle,
}) => {
  const NUM_OF_LINES = 5;
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
          image: image,
        });
      }}
    >
      <View style={itemStyle}>
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={{ uri: image }}
        />
        <View style={styles.cardInner}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Release date : {releaseDate}</Text>
          <Text
            numberOfLines={numOfLines}
            onTextLayout={onTextLayout}
            style={styles.openingCrawl}
          >
            {openingCrawl.substring(0, 51)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    color: COLORS.primaryColor,
    fontWeight: "400",
  },
  item: {
    marginHorizontal: 30,
    borderWidth: 5,
    borderColor: COLORS.primaryColor,
    marginVertical: 10,
    height: 500,
    overflow: "hidden",
  },
  date: {
    marginLeft: 30,
    color: COLORS.primaryTextColor,
  },
  openingCrawl: {
    fontSize: 16,
    margin: 20,
    height: "100%",
    flex: 1,
    width: 300,
    color: COLORS.primaryTextColor,
    fontWeight: "300",
  },
  cardInner: {
    position: "absolute",
    backgroundColor: COLORS.innerCardColor,
    bottom: 0,
    width: "100%",
    height: 170,
  },
});

export default EpisodeCard;
