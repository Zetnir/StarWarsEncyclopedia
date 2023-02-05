import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import movieDetailsQuery from "../queries/movieDetailsQuery";

const MovieScreen = ({ navigation, route }) => {
  const LOADING_COUNT = 10;

  const movieID = route.params.id;
  const [fetching, setFecthing] = useState(false);
  const { data, loading, fetchMore } = useQuery(movieDetailsQuery, {
    variables: { id: movieID, first: LOADING_COUNT, after: "" },
  });

  if (loading && !data) return <Loader />;

  const loadMore = () => {
    const pageInfo = data.film.characterConnection.pageInfo;
    if (pageInfo.hasNextPage) {
      setFecthing(true);
      // setTimeout to give a better feeling with the infinite scroller
      setTimeout(() => {
        fetchMore({
          variables: { after: pageInfo.endCursor },
        }).finally(() => setFecthing(false));
      }, 500);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data.film.title}</Text>
        <Text style={styles.releaseDate}>{data.film.releaseDate}</Text>
        <Text style={styles.openingCrawl}>{data.film.openingCrawl}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Movie informations</Text>
        <Text style={styles.stats}>
          - {data.film.planetConnection.totalCount} planets
        </Text>
        <Text style={styles.stats}>
          - {data.film.vehicleConnection.totalCount} Types of vehicles
        </Text>
        <Text style={styles.stats}>
          - {data.film.speciesConnection.totalCount} Different species
        </Text>
      </View>
      <View>
        <Text style={styles.characterListTitle}>Movie Characters</Text>
        <FlatList
          horizontal
          onEndReached={loadMore}
          showsHorizontalScrollIndicator={false}
          data={data.film.characterConnection.edges}
          contentContainerStyle={styles.characterContainer}
          style={styles.characterContainer}
          keyExtractor={(item) => item.node.id}
          ListFooterComponent={() => {
            if (fetching) {
              return (
                <View style={styles.loaderContainer}>
                  <Loader />
                </View>
              );
            }
            return null;
          }}
          renderItem={({ item }) => {
            return (
              <CharacterCard
                id={item.node.id}
                name={item.node.name}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    height: "80%",
    paddingHorizontal: 40,
  },
  titleContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20,
  },
  releaseDate: {
    fontSize: 15,
    marginBottom: 10,
  },
  openingCrawl: {
    fontSize: 18,
    marginBottom: 20,
  },
  stats: {
    fontSize: 15,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  statsContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  characterContainer: {
    height: 300,
    marginBottom: 20,
  },
  characterListTitle: {
    fontSize: 22,
    fontWeight: "600",
    margin: 20,
  },
});

export default MovieScreen;
