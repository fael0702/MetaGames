import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from '../services/api'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; // Importar ícones


const Historico = ({ route }) => {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarioString = await AsyncStorage.getItem("@usuario");
        const usuario = JSON.parse(usuarioString);

        const reviews = await apiService.buscarReviewUsuario(usuario.id);
        if (reviews?.length) {
          setGameList([...reviews]);
        }
      } catch (error) {
        console.error("Houve um erro: ", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usuarioString = await AsyncStorage.getItem("@usuario");
      const usuario = JSON.parse(usuarioString);

      const reviews = await apiService.buscarReviewUsuario(usuario.id);
      if (reviews?.length) {
        setGameList([...reviews]);
      }
    } catch (error) {
      console.error("Houve um erro: ", error);
    }
  };

  const handleDelete = async (item) => {
    const updatedGameList = gameList.filter((game) => game.id !== item.id);
    setGameList(updatedGameList);
    await apiService.apagarReview(item.id);
  };

  const handleRefresh = async () => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");
    const usuario = JSON.parse(usuarioJson);

    const reviews = await apiService.buscarReviewUsuario(usuario.id);
    if (reviews?.length) {
      setGameList([...reviews]);
    }
  };


  const renderGameCard = ({ item }) => {
    const renderSentimentoIcon = () => {
      if (item.sentimento === 1) {
        return <FontAwesome5 name="thumbs-up" style={{color: 'green', fontSize: 25, position: 'absolute', top: 5, right: 5 }} />;
      } else {
        return <FontAwesome5 name="thumbs-down" style={{color: 'red', fontSize: 25, position: 'absolute', top: 5, right: 5 }} />;
      }
    };

    return (
      <TouchableOpacity style={styles.card}>
        <Text style={[styles.gameTitle, styles.nameGame]}>
          {item?.jogo.nome}
        </Text>
        <Text style={[styles.gameTitle, styles.notaGame]}>{item?.nota}</Text>
        <View style={styles.ctnInfos}>
          <Image
            source={{ uri: item?.jogo.background_image }}
            style={styles.cardImage}
          />
          <Text style={[styles.gameTitle, styles.multilineText]}>
            {item?.comentario}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
        <Text style={styles.gameTitle}>{item?.jogo.nome}</Text>
        <Image source={{ uri: item?.jogo.background_image }} style={styles.cardImage} />
        <Text style={styles.gameTitle}>{item?.nota}</Text>
        <Text style={styles.gameTitle}>{item?.comentario}</Text>
        {renderSentimentoIcon()}
      </TouchableOpacity>
    );
  };


  const filteredGameList = [...gameList].reverse().filter((item) => {
    const gameName = item?.nome?.toLowerCase() || "";
    const searchTextLower = searchText.toLowerCase();
    return gameName.includes(searchTextLower);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/FundoMetaGames.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Digite o nome do jogo"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <FlatList
              data={filteredGameList}
              renderItem={renderGameCard}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={handleRefresh}
            >
              <Text style={styles.refreshButtonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    maxWidth: "100%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  multilineText: {
    height: "auto",
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  nameGame: {
    textDecorationLine: "underline",
  },
  notaGame: {
    marginBottom: 8,
  },

  ctnInfos: {
    flexDirection: "row",
    height: "80%",
    width: "70%",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    marginTop: 125,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 32,
    padding: 5,
    margin: 8,
    height: 180,
    width: 360,
    justifyContent: "center",
    opacity: 0.8,
    borderWidth: 2,
    borderColor: "black",
    position: "relative",
    opacity: 0.8,
  },
  gameTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 64,
    marginRight: 8,
    borderColor: "black",
    borderWidth: 2,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: 400,
    
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    padding: 5,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "red",
    marginRight: 12,
    marginTop: 8,
  },
  deleteButtonText: {
    color: "red",
    fontWeight: "bold",
    height: 20,
  },
  refreshButton: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 40,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Historico;
