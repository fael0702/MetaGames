import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const handleHome = () => navigation.navigate("Home");
  const handlePerfil = () => navigation.navigate("Perfil");
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
});