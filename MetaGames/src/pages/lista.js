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
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import apiGames from "../services/apiGames";

export default function Lista() {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [loadedGames, setLoadedGames] = useState(3); // Ajuste o número inicial de jogos carregados
  const [searchText, setSearchText] = useState("");

  const handleLista = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    getGamesList();
  }, []);

  const getGamesList = () => {
    apiGames.getAllGames.then((resp) => {
      setGameList(resp.data.results);
    });
  };

  const handleNavigate = (item) => {
    navigation.navigate("Review", {
      parametro: {
        image: item?.background_image,
        name: item?.name,
        rating: item?.metacritic,
        lancamento: item?.released,
        genres: item?.genres,
      },
    });
  };

  const filteredGameList = gameList.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderGameCard = ({ item }) => {
    const genresToDisplay = item.genres.slice(0, 3);

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item)}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.background_image }} style={styles.cardImage} />
          </View>
          <View style={[styles.detailsContainer]}>
            <Text style={styles.gameTitle}>{item.name}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.genresContainer}
            >
              {genresToDisplay.map((genre) => (
                <Text
                key={genre.id}
                style={[
                  styles.genreText,
                  {
                    backgroundColor: genre.name === "Action"
                      ? "#fa4b4b" 
                      : genre.name === "Adventure"
                      ? "#258a25" 
                      : genre.name === "RPG"
                      ? "#f5b505" 
                      : genre.name === "Puzzle"
                      ? "#9c9c9c" 
                      : genre.name === "Shooter"
                      ? "#aa36e0" 
                      : "#fff", 
                  },
                ]}
              >
                {genre.name}
              </Text>
              
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleShowMore = () => {
    // Ajuste a quantidade de jogos a serem carregados ao clicar em "Mostrar Mais"
    setLoadedGames((prevLoadedGames) => prevLoadedGames + 6);
  };

  const visibleGameList = filteredGameList.slice(0, loadedGames);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/FundoMetaGames.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={handleLista}>
              {/* <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.cardsContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Digite o nome de um jogo..."
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <FlatList
              data={visibleGameList}
              renderItem={renderGameCard}
              keyExtractor={(item) => item.id.toString()}
            />
           
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  logoContainer: {
    position: "absolute",
    top: 35,
    left: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    marginTop: 125,
  },
  gameTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 32,
    padding: 5,
    margin: 8,
    height: 120,
    width: 280,
    justifyContent: "center",
    opacity: 0.8,
    borderWidth: 2,
    borderColor: "black",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 64,
    marginRight: 8,
    borderColor: "black",
    borderWidth: 2,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  genresContainer: {
    flexDirection: "row",
    marginTop: 8,
    height: 25,
    justifyContent: "center",
  },
  genreText: {
    fontSize: 12,
    marginLeft: 4,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  mostrarMais: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: 350,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 64,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 2,
  },
});
