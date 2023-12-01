import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; // Importar ícones
import apiService from "../services/api";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.ANDROID_CLIENT_ID,
    webClientId: process.env.WEB_CLIENT_ID,
    expoClientId: process.env.EXPO_CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
  });

  const [request2, response2, promptAsync2] = Facebook.useAuthRequest({
    clientId: process.env.CLIENT_ID,
  });

  React.useEffect(() => {
    loginGoogle();
    console.log(response);
  }, [response]);

  useEffect(() => {
    if (response2 && response2.type === "success" && response2.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response2.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        // console.log('User Info:', userInfo);

        // Gravar as informações do usuário no AsyncStorage
        await AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo));
      })();
    }
    const fetchData = async () => {
      const valido = await apiService.verificarToken();

      if (valido) {
        navigation.navigate("MainTabs");
      }
    };
    fetchData();
  }, [response2]);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };
  const toggleConfirmarSenhaVisivel = () => {
    setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
  };

  const handlePressAsync = async () => {
    const result = await promptAsync2();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    } else {
      navigation.navigate("MainTabs");
    }
  };

  async function loginGoogle() {
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
      navigation.navigate("MainTabs");
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
      console.log(user);
      const jaExiste = await apiService.buscarPorEmail(user.email);

      if (jaExiste) {
        const data = await apiService.login(user.email);
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("@usuario", JSON.stringify(data.usuario));
      } else {
        const cadastro = await apiService.cadastroUsuarioGoogle(
          user.name,
          user.email,
          user.id,
          user.picture
        );
        if (cadastro) {
          const usuario = await apiService.buscarPorEmail(user.email);
          const data = await apiService.login(usuario.email);
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("@usuario", JSON.stringify(data.usuario));
        }
      }
    } catch (error) {
      console.log("erro: " + error);
    }
  };

  const handleLogin = async () => {
    const data = await apiService.login(email, password);
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("@usuario", JSON.stringify(data.usuario));
    if (data.usuario) {
      navigation.navigate("MainTabs");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.contorno]}>Login</Text>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Senha</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry={!senhaVisivel}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleSenhaVisivel}
              >
                <Icon
                  name={senhaVisivel ? "eye-slash" : "eye"}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Codigo")}>
            <Text style={[styles.esquecisenha, styles.contorno]}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.red, styles.contorno]}
            onPress={handleLogin}
          >
            <Text style={[styles.red, styles.contorno]}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.cadastro}>
            <Text style={styles.textCadastro}>Ainda não cadastrado?</Text>
            <TouchableOpacity
              style={[styles.red, styles.contorno]}
              onPress={() => {
                navigation.navigate("Cadastro");
              }}
            >
              <Text style={[styles.red, styles.contorno]}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine}></View>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              disabled={!request2}
              style={[styles.red, styles.contorno]}
              onPress={() => handlePressAsync()}
            >
              <FontAwesome5 name="facebook" size={47} color="#00f" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.red, styles.contorno]}
              onPress={() => promptAsync()}
            >
              <FontAwesome name="google" size={50} color="#f00" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  container: {
    width: 320,
    height: 550,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    borderRadius: 64,
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: -35,
  },
  label: {
    marginLeft: 10,
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cadastro: {
    flexDirection: "row",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  input: {
    padding: 8,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 64,
    fontSize: 16,
    borderWidth: 2,
    width: 250,
  },
  contorno: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    padding: 5,
  },
  red: {
    color: "#FAFF19",
    fontSize: 20,
  },
  textCadastro: {
    marginTop: 15,
    fontSize: 14,
  },
  esquecisenha: {
    fontSize: 16,
    color: "#000",
    textDecorationLine: 'underline',
  },
  title: {
    color: "#FAFF19",
    fontSize: 32,
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: 250,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: "bold",
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
