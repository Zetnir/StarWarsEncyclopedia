import { FlashList } from "@shopify/flash-list";
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

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.title}>Favorite characters</Text>
      <View style={styles.container}>
        {characters.length > 0 ? (
          <FlashList
            estimatedItemSize={485}
            showsVerticalScrollIndicator={false}
            data={characters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <CharacterCard
                  id={item.id}
                  name={item.name}
                  navigation={navigation}
                  onCardTap={() => {}}
                />
              );
            }}
          />
        ) : (
          <Text
            style={{
              color: COLORS.primaryTextColor,
            }}
          >
            You have no characters liked
          </Text>
        )}
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
    width: 270,
    height: "100%",
  },
});

export default CharacterLikedTab;
