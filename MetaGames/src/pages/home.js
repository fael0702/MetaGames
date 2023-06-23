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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiGames from '../service/apiGames';

export default function Lista() {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);

  const handleLista = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    getGamesList();
  }, []);

  const getGamesList = () => {
    apiGames.getAllGames.then((resp) => {
      console.log(resp.data.results);
      setGameList(resp.data.results);
    });
  };

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.gameTitle}>{item.name}</Text>
        <Image
          source={{ uri: item.background_image }}
          style={styles.cardImage}
        />
        <Text style={styles.gameDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  const visibleGameList = gameList.slice(0, visibleCards);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/FundoMetaGames.png')}
        style={styles.background}
      >
        
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={handleLista} style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
          <FlatList
            data={visibleGameList}
            renderItem={renderGameCard}
            keyExtractor={(item) => item.id.toString()}
          />
          {visibleCards < gameList.length && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={handleShowMore}
            >
              <Text style={styles.showMoreButtonText}>Mostrar Mais</Text>
            </TouchableOpacity>
          )}
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
  gameTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
    margin: 8,
    height: 151,
    width: 298,
    justifyContent: 'center',
    opacity: 0.7,
    alignSelf: 'center'
  },
  cardContent: {
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 20,
  },
});
