import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ImageBackground } from 'react-native';

export default function Home() {
  return (
    <ImageBackground
      source={require('../../assets/FundoMetaGames.png')}
      style={styles.background}>
      <View style={styles.container}>
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
});