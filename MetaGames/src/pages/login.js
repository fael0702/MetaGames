import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiGames from "../service/apiGames";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "70917160074-s1qriiq7gculsok7vjpvpedhfpcrblvi.apps.googleusercontent.com",
    webClientId: "70917160074-5nlm5o251q9epbncq4geqegolcr23ud8.apps.googleusercontent.com" //192.168.1.7:190000
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();
  let logs;

  React.useEffect(() => {
    loginGoogle();
  }, [response])

  async function loginGoogle() {
    const user = await AsyncStorage.getItem("@user");

    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
        navigation.navigate('MainTabs')
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

    } catch (error) {
      console.log('erro: ' + error);
    }
  }

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
            <TextInput style={styles.input} />
            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry={true} />
          </View>
          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => {
            navigation.navigate('MainTabs')
          }}>
            <Text style={[styles.red, styles.contorno]}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.red2}>Ainda não cadastrado?</Text>
          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => {navigation.navigate('Formulario')}}>
            <Text style={[styles.red, styles.contorno]}>Cadastre-se</Text>
          </TouchableOpacity>

          <Text style={styles.ou}>ou</Text>
          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => promptAsync()}>
            <Text style={[styles.red, styles.contorno]}>Login com google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => AsyncStorage.removeItem("@user")}>
            <Text style={[styles.red, styles.contorno]}>Deletar local storage</Text>
          </TouchableOpacity>
          <Text>{JSON.stringify(userInfo)}</Text> 
          <Text>{logs}</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: '70%',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    borderRadius: 5,
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
    color: '#FAFF19',
    fontSize: 22,
  },
  red2: {
    marginTop: 15,
    fontSize: 16,
  },

  title: {
    color: '#FAFF19',
    fontSize: 22,
    marginBottom: 20,
  },

  ou: {
    fontSize: 10,
  },

});

export default Login;