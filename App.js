import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import Details from './screens/details';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

export default function App() {
  return (
    <AppContainer/>
  );
}

const appStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(appStackNavigator)