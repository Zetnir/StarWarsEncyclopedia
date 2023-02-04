//@flow

import {
  faSortAmountDown,
  faSortAmountUp,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import EpisodeCard from "../components/EpisodeCard";
import { episodeData } from "../constants";

const data = episodeData;

const EpisodeTab = ({}) => {
  const [episodeOrder, setEpisodeOrder] = useState("DESC");

  const toggleOrder = () => {
    setEpisodeOrder(episodeOrder === "ASC" ? "DESC" : "ASC");
  };

  const sortByReleaseData = (a, b) => {
    const dateA = a.replaceAll("-", "");
    const dateB = b.replaceAll("-", "");
    return episodeOrder === "DESC" ? dateA <= dateB : dateA > dateB;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesomeIcon style={styles.stars} icon={faStarHalfStroke} />
        <Text style={styles.title}>Star wars movies </Text>
        <FontAwesomeIcon style={styles.stars} icon={faStarHalfStroke} />
      </View>
      <View style={styles.centeredContainer}>
        <View style={styles.episodeContainer}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => {
              toggleOrder();
            }}
          >
            <FontAwesomeIcon
              icon={episodeOrder === "ASC" ? faSortAmountUp : faSortAmountDown}
            />
            <Text> Sort by Release date</Text>
          </TouchableOpacity>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.sort((a, b) =>
              sortByReleaseData(a.releaseDate, b.releaseDate)
            )}
            contentContainerStyle={{ height: 400 }}
            style={{ height: 400 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <EpisodeCard
                  title={item.title}
                  releaseDate={item.releaseDate}
                  imageUrl={item.image_url}
                  characters={item.characters}
                />
              );
            }}
          />
        </View>
      </View>
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
  stars: {
    color: "lightblue",
  },
  container: {
    height: "100%",
  },
  itemText: {
    color: "black",
  },
  episodeContainer: {
    flex: 1,
    flexDirection: "column",
    height: 450,
  },
  centeredContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  sortButton: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "lightblue",
    width: 200,
    padding: 10,
    borderRadius: 10,
  },
});

export default EpisodeTab;
