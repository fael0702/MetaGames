import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "../services/api";

export default function Perfil() {
  const navigation = useNavigation();

  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/5953/5953527.png"
  );
  const [nome, setNome] = useState();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    handleUsuario();
    initializeAppAndUserInfo();
  }, []);

  const initializeAppAndUserInfo = async () => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");

    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      setUserInfo(usuario);

      if (usuario.imagem) {
        if (usuario.id_google) {
          setImage(`${usuario.imagem}`)
        } else {
          setImage(
            `https://drive.google.com/uc?export=view&id=${usuario.imagem}`
          );
        }
      }
    }
  };

  const handleUsuario = async () => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");
    const usuario = JSON.parse(usuarioJson);

    setNome(usuario.nome);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const usuarioJson = await AsyncStorage.getItem("@usuario");
      const usuario = JSON.parse(usuarioJson);

      const img = await apiService.alterarImagem(
        usuario.id,
        result.assets[0].uri
      );

      const usuarioComImg = await apiService.buscarUsuario(usuario.id);
      await AsyncStorage.setItem("@usuario", JSON.stringify(usuarioComImg));
      if (img) {
        if (usuario.id_google) {
          setImage(`${usuarioComImg.imagem}`)
        } else {
          setImage(
            `https://drive.google.com/uc?export=view&id=${usuarioComImg.imagem}`
          );
        }
      }
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSair = async () => {
    const token = await AsyncStorage.getItem("token");

    const logoff = await apiService.logoff(token);

    if (logoff) {
      localStorage.clear();
      navigation.navigate("Login");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Image
            source={require("../../assets/voltar.png")}
            style={styles.voltar}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePicker}>
          <LinearGradient
            colors={["#1B30EB", "white", "#F4C622"]}
            style={styles.Perfilctn}
          >
            <Image source={{ uri: image }} style={styles.imagemPerfil} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoPerfil}>
          <Text style={[styles.title, styles.contorno]}>
            {userInfo?.name || nome}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AlterarNome")}>
            <Text style={styles.title}>ALTERAR NOME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSair}>
            <Text style={styles.title}>SAIR</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contorno: {
    textShadowColor: "#FAFF19",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  title: {
    color: "#000000",
    fontSize: 22,
  },
  infoPerfil: {
    marginTop: 40,
    width: 300,
    height: 200,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    borderRadius: 35,
  },

  Perfilctn: {
    width: 280,
    height: 280,
    borderRadius: 160,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 35,
    left: 10,
  },

  imagemPerfil: {
    width: 250,
    height: 250,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: "black",
  },
  logo: {
    width: 100,
    height: 100,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 35,
    left: 20,
    zIndex: 1,
  },
  voltar: {
    width: 50,
    height: 50,
  },
});
