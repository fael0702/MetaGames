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
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "../services/api";

export default function AlterarNome() {
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/5953/5953527.png"
  );
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState();

  useEffect(() => {
    handleEmail();
  }, []);

  //Puxa o email que está no json
  const handleEmail = async () => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");
    const usuario = JSON.parse(usuarioJson);
    setEmail(usuario.email);
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.ctnTroca}>
          <View>
            <Text style={[styles.title, styles.contorno]}>
              {userInfo?.email || email}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite um novo nome"
              placeholderTextColor={"#000"}
            />
          </View>
          <View style={styles.ctnBotoes}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Perfil")}
              style={styles.btn}
            >
              <Text style={styles.btnText}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>TROCAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 24,
  },
  contorno: {
    textShadowColor: "#FAFF19",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  ctnBotoes: {
    marginTop: 16,
    flexDirection: "row",
  },
  btn: {
    borderRadius: 64,
    backgroundColor: "#000",
    padding: 9,
    borderColor: "#DFE321",
    borderWidth: 2,
    marginHorizontal: 10,
  },
  btnText: {
    textAlign: "center",
    color: "#DFE321",
  },
  ctnTroca: {
    marginTop: 40,
    width: 300,
    height: 300,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    borderRadius: 35,
  },
  input: {
    padding: 4,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    width: 250,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});
