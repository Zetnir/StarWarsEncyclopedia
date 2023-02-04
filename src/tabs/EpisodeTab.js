import { gql, useQuery } from "@apollo/client";
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
import filmListQuery from "../queries/filmListQuery";

const EpisodeTab = ({ navigation }) => {
  const [episodeOrder, setEpisodeOrder] = useState("DESC");

  const toggleOrder = () => {
    setEpisodeOrder(episodeOrder === "ASC" ? "DESC" : "ASC");
  };

  const sortByReleaseData = (a, b) => {
    const dateA = a.replaceAll("-", "");
    const dateB = b.replaceAll("-", "");
    return episodeOrder === "DESC" ? dateA <= dateB : dateA > dateB;
  };

  const { error, data, loading } = useQuery(filmListQuery);
  if (data && !loading) {
    const episodeData = [...data.allFilms.films];

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <FontAwesomeIcon style={styles.stars} icon={faStarHalfStroke} />
          <Text style={styles.title}>Star wars movies</Text>
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
                icon={
                  episodeOrder === "ASC" ? faSortAmountUp : faSortAmountDown
                }
              />
              <Text> Sort by Release date</Text>
            </TouchableOpacity>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={episodeData.sort((a, b) =>
                sortByReleaseData(a.releaseDate, b.releaseDate)
              )}
              contentContainerStyle={styles.episodeList}
              style={styles.episodeList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <EpisodeCard
                    title={item.title}
                    releaseDate={item.releaseDate}
                    characters={item.characterConnection.characters}
                    navigation={navigation}
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
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
    height: "95%",
  },
  itemText: {
    color: "black",
  },
  episodeContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  episodeList: {
    height: "100%",
  },
  centeredContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  sortButton: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "lightblue",
    width: 200,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default EpisodeTab;
