import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CharacterCard from "../../components/CharacterCard";
import { COLORS } from "../../constants";
import store from "../../store/store";

const CharacterLikedTab = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);

  store.subscribe(() => {
    setCharacters(store.getState().characterLikedReducer.value);
  });

  // const characters = store.getState().characterLikedReducer.value;

  return (
    <View>
      <Text style={styles.title}>Favorite characters</Text>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={characters}
          contentContainerStyle={styles.characterContainer}
          style={styles.characterContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <CharacterCard
                id={item.id}
                name={item.name}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    color: COLORS.primaryColor,
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  characterContainer: {
    height: "100%",
  },
});

export default CharacterLikedTab;
