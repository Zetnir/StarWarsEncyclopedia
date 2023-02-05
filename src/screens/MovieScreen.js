import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import { COLORS } from "../constants";
import movieDetailsQuery from "../queries/movieDetailsQuery";

const MovieScreen = ({ navigation, route }) => {
  const LOADING_COUNT = 10;

  const movieID = route.params.id;
  const image = route.params.image;
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
        <Image
          style={{
            width: 300,
            height: 450,
            marginBottom: 10,
            borderWidth: 5,
            borderColor: COLORS.primaryColor,
          }}
          resizeMode="cover"
          source={{ uri: image }}
        />
        <Text style={styles.releaseDate}>
          Release date : {data.film.releaseDate}
        </Text>
        <Text style={[styles.openingCrawl, { marginTop: 20 }]}>
          Opening Scroll :
        </Text>
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
        <Text style={styles.characterListTitle}>Characters</Text>
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
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    color: COLORS.primaryColor,
    marginBottom: 20,
  },
  releaseDate: {
    fontSize: 15,
    marginBottom: 10,
    color: COLORS.primaryTextColor,
  },
  openingCrawl: {
    fontSize: 18,
    marginBottom: 20,
    color: COLORS.primaryTextColor,
  },
  stats: {
    fontSize: 15,
    color: COLORS.primaryTextColor,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: COLORS.primaryColor,
  },
  statsContainer: {
    marginLeft: 20,
    marginBottom: 10,
  },
  characterContainer: {
    height: 200,
    marginBottom: 0,
  },
  characterListTitle: {
    fontSize: 22,
    fontWeight: "600",
    margin: 20,
    color: COLORS.primaryColor,
  },
});

export default MovieScreen;
