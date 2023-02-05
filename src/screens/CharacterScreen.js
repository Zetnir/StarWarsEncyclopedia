import { useQuery } from "@apollo/client";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { COLORS } from "../constants";
import characterDetailsQuery from "../queries/characterDetailsQuery";
import {
  addCharacter,
  removeCharacter,
} from "../store/reducers/CharacterLikedReducers";
import store from "../store/store";

const CharacterScreen = ({ navigation, route }) => {
  const characterID = route.params.id;
  const [liked, setLiked] = useState(
    store.getState().characterLikedReducer.value !== []
      ? store
          .getState()
          .characterLikedReducer.value.find(
            (character) => character.id === characterID
          ) !== undefined
      : false
  );

  const characterLiked = useSelector(
    (state) => state.characterLikedReducer.value
  );
  const dispatch = useDispatch();

  const onCharacterLiked = (id) => {
    dispatch(addCharacter({ id: id, name: data.person.name }));
  };

  const onCharacterUnliked = (id) => {
    dispatch(removeCharacter({ id: id, name: data.person.name }));
  };

  const { data, loading } = useQuery(characterDetailsQuery, {
    variables: { id: characterID },
  });

  const onMoviePressed = (id) => {
    navigation.navigate("Movie", {
      id: id,
    });
  };

  const onLikePressed = () => {
    if (!liked) onCharacterLiked(characterID);
    else onCharacterUnliked(characterID);

    setLiked(!liked);

    offset.value = withSpring(2, { stiffness: 250 }, (finished) => {
      if (finished) {
        offset.value = withSpring(0, {
          damping: 30,
          stiffness: 200,
          mass: 0.5,
          overshootClamping: false,
        });
      }
    });
  };

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: offset.value }],
    };
  });

  if (loading && !data) return <Loader />;

  const movieList = data.person.filmConnection.edges;

  return (
    <TapGestureHandler numberOfTaps={2} onActivated={() => onLikePressed()}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.person.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}> Character Informations</Text>
          <Text style={styles.stats}>
            Mass : {`${data.person.mass ? data.person.mass + "kg" : "unknown"}`}
          </Text>
          <Text style={styles.stats}>
            Height :{" "}
            {`${data.person.height ? data.person.height + "cm" : "unknown"}`}
          </Text>
          <Text style={styles.stats}>Birth Year : {data.person.birthYear}</Text>
          <Text style={styles.stats}>
            Home planet : {data.person.homeworld.name}
          </Text>
          <View>
            <Text style={styles.movieListTitle}>Appear in</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={movieList}
              keyExtractor={(item) => item.node.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onMoviePressed(item.node.id);
                    }}
                    style={{ width: 300 }}
                  >
                    <Text style={styles.movieLink}>- {item.node.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View pointerEvents="box-none" style={styles.animationContainer}>
            <Animated.View style={[styles.animatedLike, animatedStyles]}>
              <FontAwesomeIcon
                icon={liked ? faHeartFilled : faHeart}
                size={60}
                color={COLORS.primaryColor}
              />
            </Animated.View>
          </View>
        </View>
        <View style={styles.likeButton}>
          <TouchableOpacity
            onPress={() => {
              onLikePressed();
            }}
          >
            <FontAwesomeIcon
              size={30}
              icon={liked ? faHeartFilled : faHeart}
              color={COLORS.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%" },
  animationContainer: {
    paddingLeft: 30,
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedLike: {
    height: 50,
    width: 50,
    zIndex: 2,
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
    color: COLORS.primaryColor,
  },
  stats: {
    fontSize: 18,
    color: COLORS.primaryTextColor,
  },
  statsTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: COLORS.primaryColor,
  },
  statsContainer: {
    backgroundColor: COLORS.primaryBgColor,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
    marginHorizontal: 20,
  },
  movieListTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.primaryColor,
  },
  movieLink: {
    padding: 10,
    fontSize: 16,
    textDecorationLine: "underline",
    color: "lightblue",
  },
  likeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default CharacterScreen;
