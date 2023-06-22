import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Formulario = () => {
    const navigation = useNavigation();

    const [nota, setNota] = useState('');
    const [comentario, setComantario] = useState('');
    const [jogo, setJogo] = useState(null);

    useEffect(() => {
        if (jogo) {
            console.log('Dados do Jogo:', jogo);
        }
    }, [jogo]);

    const getGameData = async (nomeJogo) => {
        try {
            const response = await axios.get(`https://api.rawg.io/api/games?search=${encodeURIComponent(nomeJogo)}`);
            const { results } = response.data;

            if (results && results.length > 0) {
                const jogoEncontrado = results[0];
                setJogo(jogoEncontrado);
            }
        } catch (error) {
            console.error('Erro ao obter dados do jogo:', error);
        }
    };

    const handleForm = () => {
        console.log('Nota:', nota);
        console.log('Comentario:', comentario);
    };

    return (
        <ImageBackground
            source={require('../../assets/FundoMetaGames.png')}
            style={styles.background}>
            <View style={styles.containerRola}>
                <View style={styles.container}>
                    <Text style={[styles.title, styles.contorno]}>Review</Text>

                    <Text>Comentário</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'#000'}
                            value={comentario}
                            onChangeText={setComantario}
                        />
                    </View>

                <label>Nota</label>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#000'}
                    value={nota}
                    onChangeText={setNota}
                />

                <TouchableOpacity style={styles.button} onPress={handleForm}>
                    <Text style={[styles.red, styles.contorno]}>Enviar Review</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '70%',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        borderRadius: 5,
    },

    containerRola: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    background: {
        flex: 1,
        resizeMode: 'cover',
    },

    input: {
        padding: 4,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 2,
        width: 250,
    },
    contorno: {
        textShadowColor: '#000000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
    },
    red: {
        color: '#FAFF19',
        fontSize: 22,
    },
    red2: {
        marginTop: 15,
        fontSize: 16,
    },

    title: {
        color: '#FAFF19',
        fontSize: 22,
        marginBottom: 20,
    },

    ou: {
        fontSize: 10,
    },

    gameImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    gameName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    gameRating: {
        fontSize: 16,
    },
});

export default Formulario;
