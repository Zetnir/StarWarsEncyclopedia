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
import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

const MovieScreen = ({ navigation, route }) => {
  const LOADING_COUNT = 10;

  const movieID = route.params.id;
  const image = route.params.image;
  const [fetching, setFecthing] = useState(false);
  const { data, loading, fetchMore } = useQuery(movieDetailsQuery, {
    variables: { id: movieID, first: LOADING_COUNT, after: "" },
  });

  const ref = React.useRef(null);

  useScrollToTop(ref);

  const scroolToTop = () => {
    setTimeout(() => {
      if (ref.current) ref.current.scrollTo({ screenY: 0 });
    }, 500);
  };

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
    <ScrollView showsVerticalScrollIndicator={false} ref={ref}>
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
      </View>
      <View style={styles.openingCrawlContainer}>
        <Text style={[styles.openingCrawlTitle, { marginTop: 20 }]}>
          Opening Scroll
        </Text>
        <Text style={styles.openingCrawl}>{data.film.openingCrawl}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Additional details</Text>
        <Text style={styles.stats}>
          {data.film.planetConnection.totalCount} planets
        </Text>
        <Text style={styles.stats}>
          {data.film.speciesConnection.totalCount} Different species
        </Text>
        <Text style={styles.stats}>
          {data.film.vehicleConnection.totalCount} Types of vehicles
        </Text>
      </View>
      <View>
        <Text style={styles.characterListTitle}>Characters</Text>
        <FlashList
          horizontal
          estimatedItemSize={485}
          onEndReached={loadMore}
          showsHorizontalScrollIndicator={false}
          data={data.film.characterConnection.edges}
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
                onCardTap={scroolToTop}
                id={item.node.id}
                name={item.node.name}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
      <View style={{ height: 20 }}></View>
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
  openingCrawlContainer: {
    marginHorizontal: 40,
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primaryBgColor,
  },
  openingCrawl: {
    fontSize: 18,
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
    color: COLORS.primaryTextColor,
  },
  openingCrawlTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.primaryColor,
    marginBottom: 25,
    textAlign: "center",
  },
  stats: {
    fontSize: 15,
    marginBottom: 5,
    color: COLORS.primaryTextColor,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    fontSize: 20,
    color: COLORS.disableTextColor,
  },
  statsContainer: {
    marginLeft: 20,
    marginBottom: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  characterListTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.primaryColor,
    margin: 20,
  },
});

export default MovieScreen;
