import { StatusBar } from 'expo-status-bar';
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
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historico = ({ route }) => {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const handleHistorico = () => (
    navigation.navigate("Home")
  )

  useEffect(() => {
    AsyncStorage.getItem('reviewedGames').then(reviewedGames => {
      if (reviewedGames) {
        setGameList(prevGameList => [...prevGameList, ...JSON.parse(reviewedGames)]);
      }
    });
  }, []);  

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.gameTitle}>{item?.name}</Text>
        <Image
          source={{ uri: item?.image }}
          style={styles.cardImage}
        />
      </TouchableOpacity>
    );
  };

  const handleShowMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 3);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/FundoMetaGames.png')}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={handleHistorico}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardsContainer}>
            {gameList.length > 0 ? (
              <FlatList
                data={gameList}
                renderItem={renderGameCard}
                keyExtractor={item => item.id.toString()}
              />
            ) : (
              <Text style={styles.noGameText}>Nenhum jogo encontrado</Text>
            )}
            {/* {visibleCards < gameList.length && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={handleShowMore}
              >
                <Text style={styles.showMoreButtonText}>Mostrar Mais</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Define um fundo transparente para o container
    alignItems: 'center',
    justifyContent: 'center',
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
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  noGameText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Historico;
