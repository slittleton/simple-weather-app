import React, {Component} from 'react';
import {
        Platform, StyleSheet, 
        Text, View, TextInput,
        TouchableOpacity,
        AsyncStorage, ScrollView
      } from 'react-native';

import styles from "./ComponentStyles"


class Weather extends Component{
  state ={
    // General Variables
    zipcode: null,
    city: null,
    description: null,
    temperature: null,
    humidity: null,
    windSpeed: null,
    pressure: null,

    // Styling
    background: {
      backgroundColor: 'black',
      height: '100%',
    },
    text: {
      fontSize:'',
      color:'',
    },

    // API 
    apiKey: '', // YOU WILL NEED TO REGISTER WITH OPENWEATHERMAP AND GET AN API KEY
    weather:'',
    
    //Text input other varibales
    placeHolder: "Please Enter Zip Code",
    textInputValue:null,
    // Error variables
    err: null,
    checkLocal: null,
    errBox:{
      display: 'none',
    },
  }
// Checks local storage for existing zip and uses it if one exists===========
  componentDidMount = async () => {
    const storedZip = await AsyncStorage.getItem('@UserZipcode:key');

    if(storedZip !== null){
      this.setState({
        checkLocal: storedZip,
        zipcode: storedZip,
      });
      this.getWeather();
    }else{
      this.setState({
        checkLocal: 'no zip found'
      });
    }
  }

// MAIN - Buttom Submit =======================================================
calculate(){
  if(this.state.zipcode===null){
    this.displayError('Please Enter A Zip Code')
  }else{
    this.getWeather();

  }
}

// Retrieves Weather Data ==============================================
  async getWeather (){
        // Fetch Weather Data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&APPID=${this.state.apiKey}`);
    
    await response.json()
      .then((weatherData)=>{
        // updates weather state to contain weather data from API
        this.setState({weather: weatherData});
        //Update screen and store zipcode
        this.updateWeather();
        this.storeZipcode();
        })
      .catch(err=>{
        // // Show Error
        this.displayError("Unable to retrieve weather data without valid zip code");
      });

  }

// Uses API data to update weather state variables ===========================
  updateWeather(){
        const temperatureK = this.state.weather.main.temp;
        const temperatureF = ((1.8)*(temperatureK - 273) + 32).toFixed(1);

        const windKph = this.state.weather.wind.speed;
        const windMph = (Number(windKph) * 0.621371).toFixed(1);

        this.setState({
            city: this.state.weather.name,
            description: this.state.weather.weather[0].description,
            temperature: temperatureF + '°F',
            humidity:'Humidity: ' + this.state.weather.main.humidity + '%',
            windSpeed:'Wind Speed: ' + windMph +' mph',
            pressure:'Pressure: ' + this.state.weather.main.pressure + ' mbar',
          })
  }

  
  // Saves zipcode entered to local storage ================================
  storeZipcode = async () => {
  const zip = this.state.zipcode;
  await AsyncStorage.setItem('@UserZipcode:key', zip);
  }

  // Shows error message for 3 seconds
  displayError(msg){
    this.setState({
      err: msg,
      errBox:{
        display:'flex',
        backgroundColor: '#2e2e2e' 
      }
    });

    setTimeout(()=>this.setState({
      err:null,
      errBox:{
        display:'none'
      }
    }), 3000)
  }
// Clears all weather data - local storage and screen and textInput field =====
clearStorage(){
  this.removeItemFromStorage('@UserZipcode:key')
  this.setState({
    zipcode: null,
    city: null,
    description: null,
    temperature: null,
    humidity: null,
    windSpeed: null,
    pressure: null,
    placeHolder: "Please Enter Zipcode",
    test: null,
  })
  this.textInput.clear()
}

// Removes zipcode from local storage =========================================
removeItemFromStorage = async(key) =>{
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}

  render(){
    return(
      <View style={this.state.background}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput 
            style={styles.textInput} 
            placeholderTextColor={'#9a9a9a'}
            keyboardType='numeric'
            placeholder={this.state.placeHolder}
            onChangeText={(zip)=>{this.setState({zipcode: zip})}}
            ref={input => { this.textInput = input }}
          />

          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={()=>this.calculate()}
          >
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>
        </View>

        <View style={this.state.errBox}>
        <Text style={styles.errText}>{this.state.err}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoStyle}>
            <Text style={styles.cityInfo}>{this.state.city}</Text>
          </View>
          <View style={styles.infoStyle}>
            <Text style={styles.mainInfo}>{this.state.description}</Text>
          </View>
          <View style={styles.infoStyle}>
            <Text style={styles.mainInfo}>{this.state.temperature}</Text>
          </View>
          <View style={{marginTop: 50}}>
            <View style={styles.infoStyle}>
              <Text style={styles.infoText}>{this.state.humidity}</Text>
            </View>
            <View style={styles.infoStyle}>
              <Text style={styles.infoText}>{this.state.windSpeed}</Text>
            </View>
            <View style={styles.infoStyle}>
              <Text style={styles.infoText}>{this.state.pressure}</Text>
            </View>
          </View>
        </View>
        </ScrollView>
        <TouchableOpacity
        style={styles.buttonStyle2}
        onPress={()=>this.clearStorage()}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}

export default Weather;
