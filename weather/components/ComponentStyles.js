import React, {Component} from 'react';
import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  box: {
    backgroundColor: 'blue',
    margin: 2,
    width: 50,
    height: 50,
  },
  container: {
    flexDirection: 'row',
    margin: 20,
  },
  textInput:{
    textAlign: 'left',
    color: 'gray',
    flex: 1,
    alignItems: 'stretch',
    fontSize: 20,
  },
  infoContainer:{
    marginLeft: 25,
  },
  infoStyle:{
    justifyContent: 'center',
  },
  infoText:{
    fontSize: 20,
    paddingTop: 20,
    color: 'white',
    textAlign: 'center',
 
  },
  cityInfo:{
    fontSize: 60,
    paddingTop: 20,
    color: 'white',
    textAlign: 'center'
  },
  mainInfo:{
    fontSize: 35,
    paddingTop: 20,
    color: 'white',
    textAlign: 'center'
  },
  buttonStyle:{
    width: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
    height: 30,
    marginTop: 10,

  },
  buttonText:{
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
  },
  buttonStyle2:{
    position: 'absolute',
    bottom:0,
    width: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    height: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  errText:{
    color: 'tomato',
    fontSize: 25,
    textAlign: 'center',
  }
});

