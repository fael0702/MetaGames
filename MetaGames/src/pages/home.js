import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import apiGames from "../service/apiGames";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home() {
  const navigation = useNavigation();
  const handleHome = () => navigation.navigate("Home");
  const handlePerfil = () => navigation.navigate("Perfil");
  const [jogosDisp, setJogosDisp] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [visible, setVisible] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadingGames();
    AsyncStorage.getItem("reviewedGames").then((reviewedGames) => {
      if (reviewedGames) {
        setGameList([...JSON.parse(reviewedGames)]);
      }
    });
  }, []);

  const handleRefresh = () => {
    AsyncStorage.getItem("reviewedGames").then((reviewedGames) => {
      if (reviewedGames) {
        setGameList([...JSON.parse(reviewedGames)]);
      }
    });
  };

  async function loadingGames() {
    if (loading) return;

    setLoading(true);

    apiGames.getAllGames.then((resp) => {
      setJogosDisp((prevJogosDisp) => [...prevJogosDisp, ...resp.data.results]);
    });

    setVisible((prevVisible) => prevVisible + 3);
    setLoading(false);
  }

  const handleNavigate = (item) => {
    console.log(item);
    navigation.navigate("Review", {
      parametro: {
        image: item?.background_image,
        name: item?.name,
        rating: item?.metacritic,
      },
    });
  };

  const JogosDisponiveis = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigate(item)}
      >
        <Image
          source={{ uri: item.background_image }}
          style={styles.imagemGameDisp}
        />
      </TouchableOpacity>
    );
  };

  const jogosAvaliados = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image 
          source={{ uri: item?.image }} 
          style={styles.imagemGameAv} 
        />
      </TouchableOpacity>
    );
  };

  const visibleJogosDisp = jogosDisp.slice(0, visible);
  const visibleAvaliados = [...gameList.slice(0, visible)].reverse();

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={handleHome}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.jogosDisp}>
          <Text style={[styles.title, styles.contorno]}>Jogos disp.</Text>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
          </View>

          <View style={styles.cardsContainer}>
            <FlatList
              horizontal={true}
              data={visibleJogosDisp}
              renderItem={JogosDisponiveis}
              onEndReached={loadingGames}
              onEndReachedThreshold={0.1}
            />
          </View>
        </View>

        <View style={styles.jogosDisp}>
          <Text style={[styles.title, styles.contorno]}>Jogos Avaliados</Text>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
          </View>

          <View style={styles.cardsContainer}>
            <FlatList
              horizontal={true}
              data={visibleAvaliados}
              renderItem={jogosAvaliados}
              onEndReached={loadingGames}
              onEndReachedThreshold={0.1}
            />
          </View>
        </View>

        <View style={styles.perfilctn}>
          <TouchableOpacity onPress={handlePerfil}>
            <Image
              source={require("../../assets/usercommun.png")}
              style={styles.perfil}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text></Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FAFF19",
    fontSize: 22,
  },

  contorno: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    padding: 5,
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

  perfilctn: {
    position: "absolute",
    top: 45,
    left: 300,
  },

  perfil: {
    width: 80,
    height: 80,
  },

  logo: {
    width: 100,
    height: 100,
  },

  background: {
    flex: 1,
    resizeMode: "cover",
  },

  jogosDisp: {
    maxHeight: 200,
    maxWidth: 300,
  },

  jogosAvaliados: {
    marginTop: 30,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: 300,
  },

  dividerLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#100E0E",
  },

  cardsContainer: {
    flex: 1,
  },

  imagemGameDisp: {
    width: 120,
    height: 120,
    marginRight: 8,
    borderWidth: 5,
    borderColor: "black",
  },

  imagemGameAv: {
    width: 120,
    height: 120,
    marginRight: 8,
    borderWidth: 5,
    borderColor: "green",
  },
});
