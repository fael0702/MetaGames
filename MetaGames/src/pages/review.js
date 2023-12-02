import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import apiService from "../services/api";

const Review = ({ route, navigation }) => {
  const [nota, setNota] = useState("");
  const [comentario, setComantario] = useState("");
  const [cor, setCor] = useState("#000000");

  const { image, name, rating, lancamento } = route.params?.parametro || {};

  const handleGoBack = () => {
    navigation.goBack();
  };

  // const handleNavigate = async () => {
  //   try {
  //     const usuarioJson = await AsyncStorage.getItem("@usuario");
  //     const usuario = JSON.parse(usuarioJson);
  //     let jogoCadastrado;
  //     let reviewCadastrado;
  
  //     // Adicione essa verificação para garantir que o usuário esteja autenticado
  //     if (!usuario || !usuario.id) {
  //       console.log("Usuário não autenticado.");
  //       return;
  //     }
  
  //     // Continue com o restante do código
  //     const jogoJaCadastrado = await apiService.buscarJogo(name);
  
  //     if (!jogoJaCadastrado) {
  //       jogoCadastrado = await apiService.cadastroJogo(name, image, lancamento);
  //       if (jogoCadastrado) {
  //         reviewCadastrado = await apiService.cadastroReview(comentario, nota, jogoCadastrado.id, usuario.id)
  //       }
  //     } else {
  //       reviewCadastrado = await apiService.cadastroReview(comentario, nota, jogoJaCadastrado.id, usuario.id)
  //     }
  
  //     navigation.navigate('Historico', {
  //       parametro: reviewCadastrado,
  //     });
  //     navigation.navigate('Home', {
  //       parametro: reviewCadastrado,
  //     });

        
  //     // Enviar o ID do usuário para o servidor Python
  //     const response = await fetch('http://127.0.0.1:5000/receber_id_usuario', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id_usuario: usuario.id }),
  //     });
  
  //     if (!response.ok) {
  //       console.log('Erro ao enviar ID do usuário para o servidor Python.');
  //       return;
  //     }

  //   } catch (error) {
  //     console.log('Erro ao salvar jogo revisado:', error);
  //   }
  // };  

  const handleNavigate = async () => {
    try {
      const usuarioJson = await AsyncStorage.getItem("@usuario");
      const usuario = JSON.parse(usuarioJson);
      let jogoCadastrado;
      let reviewCadastrado;
  
      // Adicione essa verificação para garantir que o usuário esteja autenticado
      if (!usuario || !usuario.id) {
        console.log("Usuário não autenticado.");
        return;
      }
  
      // Continue com o restante do código
      const jogoJaCadastrado = await apiService.buscarJogo(name);
  
      if (!jogoJaCadastrado) {
        jogoCadastrado = await apiService.cadastroJogo(name, image, lancamento);
        if (jogoCadastrado) {
          reviewCadastrado = await apiService.cadastroReview(comentario, nota, jogoCadastrado.id, usuario.id);
        }
      } else {
        reviewCadastrado = await apiService.cadastroReview(comentario, nota, jogoJaCadastrado.id, usuario.id);
      }
  
      // Navegar apenas se a revisão estiver cadastrada
      if (reviewCadastrado) {
        navigation.navigate('Historico', {
          parametro: reviewCadastrado,
        });
        navigation.navigate('Home', {
          parametro: reviewCadastrado,
        });
  
        // Enviar o ID do usuário para o servidor Python
        const response = await fetch('http://127.0.0.1:5000/receber_id_usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_usuario: usuario.id }),
        });
  
        if (!response.ok) {
          console.log('Erro ao enviar ID do usuário para o servidor Python.');
          return;
        }
      } else {
        console.log('Erro ao cadastrar a revisão. O ID do usuário não será enviado para o servidor Python.');
      }
    } catch (error) {
      console.log('Erro ao salvar jogo revisado:', error);
    }
  };  

  const handlePickerChange = (itemValue) => {
    setNota(itemValue);
    setCor(
      itemValue <= 3
        ? "#f00"
        : itemValue > 3 && itemValue < 7
        ? "#ffff00"
        : "#0f0"
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.containerRola}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Image
              source={require("../../assets/voltar.png")}
              style={styles.voltar}
            />
          </TouchableOpacity>
          <View>
            {image && (
              <Image source={{ uri: image }} style={styles.gameImage} />
            )}
            <Text style={styles.gameName}>{name}</Text>
            <Text style={styles.gameRating}>Metacritic: {rating}</Text>
          </View>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Digite seu comentário..."
            placeholderTextColor="#000"
            value={comentario}
            onChangeText={setComantario}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Picker
            selectedValue={nota}
            style={styles.picker}
            onValueChange={handlePickerChange}
          >
            <Picker.Item label="Nota..." />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
          </Picker>

          {nota && (
            <View style={[styles.textView, { backgroundColor: cor }]}>
              <Text style={styles.textNota}>{`${nota}`}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={[styles.red, styles.contorno]}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
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

  input: {
    padding: 4,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 2,
    width: 250,
    backgroundColor: "#fff",
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  contorno: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
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

  gameImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#000",
    borderWidth: 3,
  },
  gameName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  gameRating: {
    fontSize: 16,
  },
  picker: {
    width: 250,
    height: 40,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 2,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textView: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
  textNota: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    width: 100,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  voltar: {
    width: 50,
    height: 50,
  },
});

export default Review;
