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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historico = ({ route }) => {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('reviewedGames').then((reviewedGames) => {
      if (reviewedGames) {
        setGameList([...JSON.parse(reviewedGames)]);
      }
    });
  }, []);

  const handleDelete = (item) => {
    const updatedGameList = gameList.filter((game) => game.id !== item.id);
    setGameList(updatedGameList);
    AsyncStorage.setItem('reviewedGames', JSON.stringify(updatedGameList));
  };

  const handleRefresh = () => {
    AsyncStorage.getItem('reviewedGames').then((reviewedGames) => {
      if (reviewedGames) {
        setGameList([...JSON.parse(reviewedGames)]);
      }
    });
  };

  const renderGameCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
        <Text style={styles.gameTitle}>{item?.name}</Text>
        <Image source={{ uri: item?.image }} style={styles.cardImage} />
        <Text style={styles.gameTitle}>{item?.rating}</Text>
        <Text style={styles.gameTitle}>{item?.comentario}</Text>
      </TouchableOpacity>
    );
  };

  const filteredGameList = [...gameList]
  .reverse()
  .filter((item) => {
    const gameName = item?.name?.toLowerCase() || '';
    const searchTextLower = searchText.toLowerCase();
    return gameName.includes(searchTextLower);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/FundoMetaGames.png')} style={styles.background}>
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
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    maxWidth: '100%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    marginTop: 125,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 5,
    margin: 15,
    height: 151,
    width: 298,
    justifyContent: 'center',
    position: 'relative',
  },
  gameTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 20,
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
  },
  deleteButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    height: 20,
  },
  refreshButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 40
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Historico;
