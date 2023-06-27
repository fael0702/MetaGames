import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cadastro = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [senhaForca, setSenhaForca] = useState("");

  const handleCadastro = async () => {
    // Verificar se as senhas são iguais
    if (password !== authPassword) {
      console.log("As senhas não coincidem");
      return;
    }

    // Restante do código para verificar a força da senha e cadastrar o usuário
    if (senhaForca === "fraca") {
      console.log("Senha fraca");
    } else if (senhaForca === "média") {
      console.log("Senha média");
    } else if (senhaForca === "forte") {
      console.log("Senha forte");
    }

    console.log("Nome:", name);
    console.log("Senha:", password);
    console.log("Data de Nascimento:", dataNasc);

    const usuario = {
      name,
      password,
      dataNasc,
    };

    try {
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
      console.log("Erro ao salvar os dados:", error);
    }

    navigation.navigate("Login");
  };

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const toggleConfirmarSenhaVisivel = () => {
    setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
  };

  const verificarForcaSenha = (senha) => {
    const temLetra = /[a-zA-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temCaractereEspecial = /[^a-zA-Z0-9]/.test(senha);

    if (!temNumero || !temLetra || senha.length < 5) {
      setSenhaForca("fraca");
    } else if (temLetra && temNumero && !temCaractereEspecial) {
      setSenhaForca("média");
    } else if (temLetra && temNumero && temCaractereEspecial) {
      setSenhaForca("forte");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    verificarForcaSenha(value);
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.containerRola}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.contorno]}>Cadastro</Text>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={"#000"}
            value={name}
            onChangeText={setName}
          />
          <Text>Senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#000"}
              secureTextEntry={!senhaVisivel}
              value={password}
              onChangeText={handlePasswordChange}
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

          <View style={styles.senhaForcaContainer}>
            {senhaForca === "fraca" && (
              <Text style={styles.senhaForcaFraca}>Senha fraca</Text>
            )}
            {senhaForca === "média" && (
              <Text style={styles.senhaForcaMedia}>Senha média</Text>
            )}
            {senhaForca === "forte" && (
              <Text style={styles.senhaForcaForte}>Senha forte</Text>
            )}
          </View>

          <Text>Confirme sua Senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#000"}
              secureTextEntry={!confirmarSenhaVisivel}
              value={authPassword}
              onChangeText={setAuthPassword}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={toggleConfirmarSenhaVisivel}
            >
              <Icon
                name={confirmarSenhaVisivel ? "eye-slash" : "eye"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text>Data de Nascimento</Text>
            <TextInputMask
              style={styles.input}
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              value={dataNasc}
              onChangeText={setDataNasc}
              keyboardType="numeric"
              maxLength={10}
              placeholder="DD/MM/YYYY"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={[styles.red, styles.contorno]}>Cadastre-se</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer2}>
            <Text>Já cadastrado?</Text>
            <TouchableOpacity onPress={handleCadastro}>
              <Text style={[styles.red, styles.contorno2]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: "70%",
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    borderRadius: 5,
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

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 10,
  },
  inputContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
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
  iconContainer: {
    marginLeft: -30,
  },
  senhaForcaContainer: {
    width: 100,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 180,
  },
  senhaForcaFraca: {
    color: "red",
    fontSize: 14,
  },
  senhaForcaMedia: {
    color: "yellow",
    fontSize: 14,
  },
  senhaForcaForte: {
    color: "green",
    fontSize: 14,
  },
  contorno: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  contorno2: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    marginLeft: 5,
    fontSize: 20,
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

  ou: {
    fontSize: 10,
  },
});

export default Cadastro;
