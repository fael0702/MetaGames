import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Formulario = () => {
    const navigation = useNavigation();

    const [nota, setNota] = useState('');
    const [comentario, setComantario] = useState('');

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
                
                <label>Comentário</label>
                <View style={{ flexDirection: 'row' }}>
                    <textarea
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
        width: '25%',
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

});

export default Formulario;