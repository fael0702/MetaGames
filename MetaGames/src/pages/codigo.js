import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
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

export default function Codigo() {
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/5953/5953527.png"
  );
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState();
  const [codigo, setCodigo] = useState();
  const [confirmado, setConfimado] = useState(null);

  useEffect(() => {
    handleEmail();
  }, []);

  //Puxa o email que está no json
  const handleEmail = async () => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");
    const usuario = JSON.parse(usuarioJson);
    setEmail(usuario.email);
  };

  const enviarEmail = async (email) => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");
    const usuario = JSON.parse(usuarioJson);

    if (usuario.email === email) {
      const envio = await apiService.enviarCodigo(email);

    }
  }

  const confirmar = async (email, codigo) => {
    const confirmacao = await apiService.confirmarCodigo(email, codigo);

    if (confirmacao) {
      navigation.navigate("NovaSenha");
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.ctnTroca}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Digite o seu E-mail"
              placeholderTextColor={"#000"}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.txt}>⚠️PARA SUA SEGURANÇA⚠️</Text>
            <Text style={styles.txt}>
              Digite o código que você recebeu em seu e-mail{" "}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Código"
              placeholderTextColor={"#000"}
              value={codigo}
              onChangeText={setCodigo}
            />
          </View>
          <View style={styles.ctnBotoes}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.btn}
            >
              <Text style={styles.btnText}>CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => confirmar(email, codigo)}
              style={styles.btn}
            >
              <Text style={styles.btnText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn}
            onPress={() => enviarEmail(email)}
          >
            <Text style={styles.btnText}>REENVIAR</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#DFE321",
    borderWidth: 2,
    marginHorizontal: 10,
    marginVertical: 6,
  },
  btnText: {
    textAlign: "center",
    color: "#DFE321",
  },
  ctnTroca: {
    marginTop: 40,
    width: 320,
    height: 440,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    borderRadius: 35,
    padding: 16,
  },
  input: {
    padding: 4,
    marginBottom: 12,
    marginTop: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    width: 290,
    textAlign: "center",
  },
  txt: {
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
