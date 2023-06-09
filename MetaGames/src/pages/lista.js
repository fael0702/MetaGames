import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function Lista() {
  const navigation = useNavigation()
  const handleLista = () => (
    navigation.navigate("Home")
  )
  return (
    <ImageBackground
      source={require('../../assets/FundoMetaGames.png')}
      style={styles.background}>
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
        <Text></Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  )
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
});
