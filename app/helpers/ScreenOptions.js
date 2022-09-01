import { CardStyleInterpolators } from "@react-navigation/stack";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { GBack } from "elements/GElements";
import React from "react";

const getScreenOptions = ({ title, customHeader = false, navigation }) => {
  return {
    title: title,
    headerTitleAlign: "left",
    headerStyle: customHeader
      ? {
          elevation: 0,
          shadowOpacity: 0,
          height: getStatusBarHeight() + tabBarHeight() + customHeaderHeight(),
        }
      : {
          elevation: 0,
          shadowOpacity: 0,
        },
    headerTitleStyle: {
      color: "#464a4d",
      fontSize: 18,
      marginRight: 25,
      // fontFamily: 'OpenSans-SemiBold',
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureEnabled: true,
    gestureDirection: "horizontal",
    tabBarVisible: false,
    headerBackTitle: Platform.OS == "ios" ? " " : "",
    headerBackImage: () => <GBack navigation={navigation} />,
  };
};

export default getScreenOptions;

const tabBarHeight = () => (Platform.OS == "ios" ? 44 : 28);
const customHeaderHeight = () => (Platform.OS == "ios" ? 30 : 10);