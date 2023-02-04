import CharacterLinkTab from "../tabs/CharacterLinkTab";
import EpisodeTab from "../tabs/EpisodeTab";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Episode" component={EpisodeTab} />
      <Tab.Screen name="CharacterLink" component={CharacterLinkTab} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigation;
