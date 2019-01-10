/*
 React Native Weather App using openWeathermap API
 */

import React, {Component} from 'react';
import {Platform, View} from 'react-native';

import Weather from './components/Weather';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Weather/>
      </View>
    );
  }
}


