import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, ImageBackground, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import api from '../services/api';
const image = {uri: 'https://cdn.discordapp.com/attachments/1093885046617812992/1112102502758879423/Background_MetaG2.png'};
// import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, Description, ProfileButton, ProfileButtonText } from './styles';
import { View, Text, StyleSheet } from 'react-native';

export default class Home extends Component {

  render() {

    return (
      <Container>
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
        justifyContent: 'center'}}>
          </ImageBackground>
      </Container>
    );
  }
}