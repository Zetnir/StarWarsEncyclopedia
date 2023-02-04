import CharacterLikedTab from "../tabs/CharacterLikedTab";
import EpisodeTab from "../tabs/EpisodeTab";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Episode" component={EpisodeTab} />
      <Tab.Screen name="Characters Liked" component={CharacterLikedTab} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigation;
