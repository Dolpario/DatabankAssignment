import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import FeedScreen from "./screens/feed";
import FeedDetailScreen from "./screens/feed-detail";
import WriteFeedScreen from "./screens/feed-write";

const Stack = createStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen
          name="FeedDetail"
          component={FeedDetailScreen}
          options={{
            title: "FeedDetail",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="WriteFeed"
          component={WriteFeedScreen}
          options={{
            title: "WriteFeed",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
