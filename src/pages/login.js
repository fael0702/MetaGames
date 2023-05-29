import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";

const Login = () => {
   const navigation = useNavigation(); 

  const [email, setEmail] = useState('')
  const [password, setPassword  ] = useState('')

  const handleLogin = () => {
    if (!email || !password) alert('Email or Password Incorrect')
    else navigation.navigate('main')

  }

  const handleCreate = () => {
    navigation.navigate('createAccount')

  }
  
      return (
        <ImageBackground source={image} resizeMode="cover" style={{flex: 1,
          justifyContent: 'center'}}>

        <View style={styles.container}>
          <TextInput
          style = {styles.input}
          placeholder = 'E-mail'
          placeholderTextColor={'#000'}
          value= {email}
          onChangeText={setEmail}
          />
           <TextInput
          style = {styles.input}
          placeholder = 'Password'
          placeholderTextColor={'#000'}
          secureTextEntry={true}
          value= {password}
          onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign-in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
      </View>
          </ImageBackground>
      )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 2,
    borderColor: '#ccc',
    color: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#28FA7D',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width:'80%',
    alignItems: 'center'
  },
  buttonText:{
    color: 'lack',
    fontWeight: 'bold'
  }
})

export default Login;