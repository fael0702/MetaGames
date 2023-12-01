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
import api from "../services/api";

const Cadastro = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
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
      alert("As senhas não coincidem");
      return;
    }
    try {
      if (dataValida(dataNasc)) {
        const dataConvertida = converterDataSql(dataNasc);
        const cadastrado = await api.cadastroUsuario(
          name,
          email,
          password,
          dataConvertida
        );
        if (cadastrado) {
          navigation.navigate("Login");
        } else {
          alert("ERROR");
        }
      } else {
        throw new Error("Insira uma data valida");
      }
    } catch (error) {
      alert("Erro ao salvar os dados: ", error);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  function dataValida(data) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateRegex.test(data)) {
      return false;
    }

    const parts = data.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const dateObject = new Date(year, month - 1, day);

    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() === month - 1 &&
      dateObject.getDate() === day
    );
  }

  function converterDataSql(data) {
    const partes = data.split("/");

    const dd = partes[0];
    const mm = partes[1];
    const yyyy = partes[2];

    return `${mm}-${dd}-${yyyy}`;
  }

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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, styles.contorno]}>Cadastro</Text>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={"#000"}
            value={name}
            onChangeText={setName}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={"#000"}
            value={email}
            onChangeText={setEmail}
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
              <Text style={styles.senhaFraca}>Senha fraca</Text>
            )}
            {senhaForca === "média" && (
              <Text style={styles.senhaMedia}>Senha média</Text>
            )}
            {senhaForca === "forte" && (
              <Text style={styles.senhaForte}>Senha forte</Text>
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

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={[styles.text, styles.contorno]}>Cadastre-se</Text>
          </TouchableOpacity>

          <View style={styles.btnLogin}>
            <Text>Já cadastrado?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[styles.textLogin, styles.contorno]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 550,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
    borderRadius: 64,
  },
  mainContainer: {
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
  btnLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  input: {
    padding: 4,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 64,
    fontSize: 16,
    borderWidth: 2,
    width: 250,
  },
  iconContainer: {
    marginLeft: -35,
  },
  senhaForcaContainer: {
    width: 100,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 180,
  },
  senhaFraca: {
    color: "red",
    fontSize: 14,
  },
  senhaMedia: {
    color: "yellow",
    fontSize: 14,
  },
  senhaForte: {
    color: "green",
    fontSize: 14,
  },
  contorno: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  text: {
    color: "#FAFF19",
    fontSize: 20,
  },
  textLogin: {
    color: "#FAFF19",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    marginTop: 16,
  },
  title: {
    color: "#FAFF19",
    fontSize: 32,
    marginBottom: 20,
  },
});

export default Cadastro;
