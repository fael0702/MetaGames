import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
const image = {uri: 'https://cdn.discordapp.com/attachments/1093885046617812992/1112102502758879423/Background_MetaG2.png'};

const CreateAccount = () => {
   const navigation = useNavigation(); 

  const [name, setName] = useState('')
  const [cellphone, setPhone] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [password, setPassword  ] = useState('')

  const handleLogin = () => {
    if (!email || !password) alert('Email or Password Incorrect')
    else navigation.navigate('login')

  }
  
      return (
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
          justifyContent: 'center'}}/>
      )
    }
export default Cadastro;