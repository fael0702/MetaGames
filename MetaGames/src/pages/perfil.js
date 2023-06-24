import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function Perfil() {
  const navigation = useNavigation();
  const handleHome = () => navigation.navigate("Home");
  const handlePerfil = () => navigation.navigate("Perfil");
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/5953/5953527.png"
  );

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text>IMAGENS</Text>
        <LinearGradient colors={["#F4C622", "white", "#1B30EB"]} style={styles.perfilctn}>
          <Image
            source={{ uri: image }}
            onPress={handleImagePicker}
            style={styles.perfil}
          ></Image>
        </LinearGradient>

        <Button title="Escolha uma foto" onPress={handleImagePicker} />

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
    borderRadius: 160 , padding: 10
  },
  perfil: {
    width: 240, height: 240,borderRadius: 160,
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