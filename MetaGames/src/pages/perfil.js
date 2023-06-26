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

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/FundoMetaGames.png")}
      style={styles.background}
    >
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Image
              source={require('../../assets/voltar.png')}
              style={styles.voltar}
            />
          </TouchableOpacity>
        <TouchableOpacity onPress={handleImagePicker}>
          <LinearGradient
            colors={["#1B30EB", "white", "#F4C622"]}
            style={styles.Perfilctn}
          >
            <Image source={{ uri: image }} style={styles.imagemPerfil} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoPerfil}>
          <Text></Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  infoPerfil: {
    marginTop: 40,
    width: 300,
    height: 200,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    borderRadius: 35,
  },

  Perfilctn: {
    width: 280,
    height: 280,
    borderRadius: 160,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
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

  imagemPerfil: {
    width: 250,
    height: 250,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: "black",
  },
  logo: {
    width: 100,
    height: 100,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  backButton: {
    position: 'absolute',
    top: 35
    ,
    left: 20,
    zIndex: 1,
  },
  voltar: {
    width: 50,
    height: 50,
  }
});