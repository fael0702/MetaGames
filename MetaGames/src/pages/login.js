import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; // Importar ícones

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

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

  const toggleConfirmarSenhaVisivel = () => {
    setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
  };

  const [request2, response2, promptAsync2] = Facebook.useAuthRequest({
    clientId: "222572750606789"
  })

  const handlePressAsync = async () => {
    const result = await promptAsync2();
    if (result.type !== "success") {
      alert("Uh, algo deu errado");
      return;
    } else {
      navigation.navigate("MainTabs");
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "70917160074-s1qriiq7gculsok7vjpvpedhfpcrblvi.apps.googleusercontent.com",
    webClientId:
      "70917160074-5nlm5o251q9epbncq4geqegolcr23ud8.apps.googleusercontent.com",
    expoClientId:
      "70917160074-frph8sskggdpenhrfsd44jivgi34u3h1.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@gabriel_caldeira/MetaGames",
  });

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (nome === "" || senha === "") {
      alert("Usuário ou senha vazio!");
    } else {
      const usuarioString = await AsyncStorage.getItem("usuario");
      const usuario = JSON.parse(usuarioString);

      console.log("nome de usuario", usuario.name);
      console.log("senha de usuario", usuario.password);

      if (usuario && usuario.name === nome && usuario.password === senha) {
        navigation.navigate("MainTabs");
        console.log("entrou");
      } else {
        alert("Usuário ou senha incorretos!");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.containerRola}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.contorno]}>Login</Text>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
            />

            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry={!senhaVisivel}
                onChangeText={setSenha}
                value={senha}
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
          <TouchableOpacity
            style={[styles.red, styles.contorno]}
            onPress={handleLogin}
          >
            <Text style={[styles.red, styles.contorno]}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.red2}>Ainda não cadastrado?</Text>
          <TouchableOpacity
            style={[styles.red, styles.contorno]}
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
          >
            <Text style={[styles.red, styles.contorno]}>Cadastre-se</Text>
          </TouchableOpacity>

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
    width: "80%",
    height: "75%",
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    borderRadius: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: -30,
  },

  containerRola: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    flex: 1,
    resizeMode: "cover",
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
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    padding: 5,
  },

  red: {
    color: "#FAFF19",
    fontSize: 22,
  },

  red2: {
    marginTop: 15,
    fontSize: 16,
  },

  title: {
    color: "#FAFF19",
    fontSize: 22,
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
