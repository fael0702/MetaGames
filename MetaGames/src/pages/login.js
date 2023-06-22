import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiGames from "../service/apiGames";
import { Image } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const [request2, response2, promptAsync2] = Facebook.useAuthRequest({
    clientId: "222572750606789"
  })

  useEffect(() => {
    if (response2 && response2.type === "success" && response2.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response2.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response2]);

  const handlePressAsync = async () => {
    const result = await promptAsync2();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
    else {
      // navigation.navigate('MainTabs');
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "70917160074-s1qriiq7gculsok7vjpvpedhfpcrblvi.apps.googleusercontent.com",
    webClientId: "70917160074-5nlm5o251q9epbncq4geqegolcr23ud8.apps.googleusercontent.com",
    expoClientId: "70917160074-frph8sskggdpenhrfsd44jivgi34u3h1.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@gabriel_caldeira/MetaGames",
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  let logs;

  React.useEffect(() => {
    loginGoogle();
  }, [response]);

  async function loginGoogle() {
    const user = await AsyncStorage.getItem("@user");

    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
        navigation.navigate('MainTabs');
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
      navigation.navigate('MainTabs');
    } else {
      alert('E-mail ou senha inválidos!');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/FundoMetaGames.png')}
      style={styles.background}
    >
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
            navigation.navigate('MainTabs');
          }}>
            <Text style={[styles.red, styles.contorno]}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.red2}>Ainda não cadastrado?</Text>
          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => { navigation.navigate('Cadastro') }}>
            <Text style={[styles.red, styles.contorno]}>Cadastre-se</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine}></View>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => promptAsync()}>
              <Image
                source={require('../../assets/LoginComGoogle.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity disabled={!request2} style={[styles.red, styles.contorno]} onPress={() => handlePressAsync()}>
              <Image
                source={require('../../assets/LoginComFacebook.png')}
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={[styles.red, styles.contorno]} onPress={() => AsyncStorage.removeItem("@user")}>
            <Text style={[styles.red, styles.contorno]}>Deletar local storage</Text>
          </TouchableOpacity>
          <Text>{JSON.stringify(userInfo)}</Text>
          <Text>{logs}</Text>
          <Text>{logs}</Text>
          {user ? (
            <Profile user={user} />
          ) : ("")}
        </View>
      </View>
    </ImageBackground>
  )
};

function Profile({ user }) {
  return (
    <View style={styles.profile}>
      <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
    </View>
  );
  }
  const styles = StyleSheet.create({
    imageContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    container: {
      width: '80%',
      height: '75%',
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
      width: 250,
    },

    contorno: {
      textShadowColor: '#000000',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 2,
      padding: 5,
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

    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width: 250,
    },

    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: 'black',
    },

    dividerText: {
      paddingHorizontal: 10,
      fontSize: 12,
      fontWeight: 'bold',
    },
    profile: {
      alignItems: "center",
    },
    name: {
      fontSize: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  });

  export default Login;
