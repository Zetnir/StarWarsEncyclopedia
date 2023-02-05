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
  ActivityIndicator,
} from "react-native";
import EpisodeCard from "../components/EpisodeCard";
import Loader from "../components/Loader";
import { episodeData } from "../constants";
import movieListQuery from "../queries/movieListQuery";

const EpisodeTab = ({ navigation }) => {
  const LOADING_COUNT = 10;
  const [episodeOrder, setEpisodeOrder] = useState("DESC");

  const toggleOrder = () => {
    setEpisodeOrder(episodeOrder === "ASC" ? "DESC" : "ASC");
  };

  const sortByReleaseData = (a, b) => {
    const dateA = a.replaceAll("-", "");
    const dateB = b.replaceAll("-", "");
    return episodeOrder === "DESC" ? dateA <= dateB : dateA > dateB;
  };

  const { data, loading } = useQuery(movieListQuery, {
    variables: { first: LOADING_COUNT, after: "" },
  });

  if (!data && loading) return <Loader />;

  const episodeData = [...data.allFilms.edges];

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
              icon={episodeOrder === "ASC" ? faSortAmountUp : faSortAmountDown}
            />
            <Text> Sort by Release date</Text>
          </TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={episodeData.sort((a, b) =>
              sortByReleaseData(a.node.releaseDate, b.node.releaseDate)
            )}
            keyExtractor={(item) => item.node.id}
            renderItem={({ item }) => {
              return (
                <EpisodeCard
                  title={item.node.title}
                  id={item.node.id}
                  releaseDate={item.node.releaseDate}
                  openingCrawl={item.node.openingCrawl}
                  navigation={navigation}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
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
