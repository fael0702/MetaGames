import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity } from "react-native";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === '' && password === '') {
      navigation.navigate('MainTabs')
    } else {
      alert('E-mail ou senha inválidos!')
    }
  };

  return (

    <ImageBackground
      source={require('../../assets/FundoMetaGames.png')}
      style={styles.background}>
        <View style={styles.containerRola}>
      <View style={styles.container}>
        <Text style={[styles.title, styles.contorno]}>Login</Text>
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input}/>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input}secureTextEntry={true} />
        </View>
          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => { 
            navigation.navigate('MainTabs')
          }}>
            <Text style={[styles.red, styles.contorno]}>Entrar</Text>
          </TouchableOpacity>

        <Text style={styles.red2}>Ainda não cadastrado?</Text>
        <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => { }}>
          <Text style={[styles.red, styles.contorno]}>Cadastre-se</Text>
        </TouchableOpacity>

        <Text style={styles.ou}>ou</Text>

      </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: '50%' ,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.7',
    borderRadius: '5%' ,
  },

  containerRola: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  input: {
    padding: 4,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
  },
  contorno: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  red: {
    color: '#DFE321',
    fontSize: 22,
  },
  red2: {
    marginTop: 15,
    fontSize: 16,
  },

  title: {
    color: '#DFE321',
    fontSize: 22,
    marginBottom: 20,
  },

  ou: {
    fontSize: 10,
  },

});

export default Login;
