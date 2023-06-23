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
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiGames from '../service/apiGames';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Lista() {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [datailList, setDetail] = useState([]);

  const handleLista = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    getGamesList();
    getDatails();
  }, []);

  const getGamesList = () => {
    apiGames.getAllGames.then((resp) => {
      console.log(resp.data.results);
      setGameList(resp.data.results);
    });
  };
  const getDatails = () => {
    apiGames.getDetail.then((resp) => {
      console.log(resp.data.results);
      setDetail(resp.data.results);
    });
  };

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: item.background_image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardText}>
            <Text style={styles.gameTitle}>{item.name}</Text>
            <Text style={styles.gameDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/FundoMetaGames.png')}
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={handleLista}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <FlatList
            data={gameList}
            renderItem={renderGameCard}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginRight: 8,
  },
  cardText: {
    flex: 1,
    marginLeft: 8,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 12,
  },
});
