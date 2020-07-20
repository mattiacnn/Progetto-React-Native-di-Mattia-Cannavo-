import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Feed from './components/Feed';


export default class App extends React.Component {
  render() {
    return <AppNavigator/>;
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Feed: Feed,
});

const AppNavigator = createAppContainer(AppSwitchNavigator)