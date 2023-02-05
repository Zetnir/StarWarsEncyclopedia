import CharacterLikedTab from "../tabs/home/CharacterLikedTab";
import EpisodeTab from "../tabs/home/EpisodeTab";
import { Text } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBarItem } from "react-native-tab-view";
import { COLORS } from "../constants";

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.primaryBgColor },
        tabBarInactiveTintColor: COLORS.disableTextColor,
        tabBarActiveTintColor: COLORS.primaryTextColor,
        tabBarIndicatorStyle: { backgroundColor: COLORS.primaryColor },
      }}
    >
      <Tab.Screen name="Episode" component={EpisodeTab} />
      <Tab.Screen name="Liked Characters" component={CharacterLikedTab} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigation;
