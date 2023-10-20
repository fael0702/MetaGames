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
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiGames from '../services/apiGames';

export default function Lista() {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [searchText, setSearchText] = useState('');

  const handleLista = () => {
    navigation.navigate('Home');
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
    navigation.navigate('Review', {
      parametro: {
        image: item?.background_image,
        name: item?.name,
        rating: item?.metacritic,
        lancamento: item?.released,
        genres: item?.genres
      },
    });
  };

  const filteredGameList = gameList.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderGameCard = ({ item }) => {
    const genresToDisplay = item.genres.slice(0, 3); // Limita a exibição a 3 gêneros
  
    return (
      <TouchableOpacity style={styles.card} onPress={() => handleNavigate(item)}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.background_image }}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.gameTitle}>{item.name}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.genresContainer}
            >
              {genresToDisplay.map((genre) => (
                <Text key={genre.id} style={styles.genreText}>
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
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 6);
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
                placeholder="Digite o nome do jogo"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <FlatList
              data={filteredGameList}
              renderItem={renderGameCard}
              keyExtractor={(item) => item.id.toString()}
            />
            {/* {visibleCards < filteredGameList.length && (
              <TouchableOpacity onPress={handleShowMore}>
                <Image
                  source={require('../../assets/mostrarMais.png')}
                  style={styles.mostrarMais}
                />
              </TouchableOpacity>
            )} */}
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
    fontSize: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 8,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  genresContainer: {
    flexDirection: 'row',
    marginTop: 8,
    height: 25,
    justifyContent: 'center'
  },
  genreText: {
    fontSize: 12,
    marginLeft: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  
  mostrarMais: {
    width: 50,
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '85%',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  }
});
