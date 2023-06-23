import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import apiGames from "../service/apiGames";

export default function Lista() {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [detailList, setDetailList] = useState([]);

  const handleLista = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    getGamesList();
    getDetail();
  }, []);

  const getDetail = (id) => {
    apiGames.getDetails(id).then((resp) => {
      console.log(resp);
      setDetailList(resp.data.results);
    });
  };

  const getGamesList = () => {
    apiGames.getAllGames.then((resp) => {
      console.log(resp.data.results);
      setGameList(resp.data.results);
    });
  };

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text>{item.name}</Text>
        <Image>{item.image_background}</Image>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/FundoMetaGames.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={handleLista}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={gameList}
          renderItem={renderGameCard}
          keyExtractor={(item) => item.id.toString()}
        />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    top: 35,
    left: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
});
