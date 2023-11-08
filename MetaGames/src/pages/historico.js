import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
        if (reviews.length) {
          setGameList([...reviews]);
        }
      } catch (error) {
        console.error("Houve um erro: ", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    const updatedGameList = gameList.filter((game) => game.id !== item.id);
    setGameList(updatedGameList);
    await apiService.apagarReview(item.id);
  };

  const handleRefresh = async () => {
    const usuarioJson = await AsyncStorage.getItem("@usuario");
    const usuario = JSON.parse(usuarioJson);

    const reviews = await apiService.buscarReviewUsuario(usuario.id);
    if (reviews.length) {
      setGameList([...reviews]);
    }
  };

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
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
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    marginTop: 125,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 5,
    margin: 15,
    height: 151,
    width: 298,
    justifyContent: "center",
    position: "relative",
  },
  gameTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "85%",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
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
