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
  const [detailList, setDetailList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);

  const handleLista = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    getGamesList();
    getDetail();
  }, []);

  const getDetail = (id) => {
    apiGames.getDetails(id).then((resp) => {
      setDetailList(resp.data.results);
    });
  };

  const getGamesList = () => {
    apiGames.getAllGames.then((resp) => {
      setGameList(resp.data.results);
    });
  };

  const handleNavigate = (item) => {
    navigation.navigate('Review', {
      parametro: {
        image: item?.background_image,
        name: item?.name,
        rating: item?.rating,
      },
    });
  };

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item)}>
        <Text style={styles.gameTitle}>{item.name}</Text>
        <Image
          source={{ uri: item.background_image }}
          style={styles.cardImage}
        />
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
          <View style={styles.cardsContainer}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
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
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    marginTop: 125,
  },
  gameTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
    margin: 8,
    height: 151,
    width: 298,
    justifyContent: 'center',
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
  showMoreButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    margin: 8,
    alignItems: 'center',
  },
  showMoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
