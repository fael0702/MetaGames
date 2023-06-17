import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";

const Cadastro = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

    const handleCadastro = () => {
        console.log('Nome:', nome);
        console.log('Senha:', senha);
        console.log('Confirmar Senha:', confirmarSenha);
        console.log('Data de Nascimento:', dataNasc);
      };


    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };
    
    const toggleConfirmarSenhaVisivel = () => {
        setConfirmarSenhaVisivel(!confirmarSenhaVisivel);
    };

    return (
        <ImageBackground
            source={require('../../assets/FundoMetaGames.png')}
            style={styles.background}>

            <View style={styles.container}>
                <label>Nome</label>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#000'}
                    value={name}
                    onChangeText={setName}
                />
                <label>Senha</label>
                <View style={{ flexDirection: 'row' }} >
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#000'}
                    secureTextEntry={!senhaVisivel}
                    value={password}
                    onChangeText={setPassword}
                />

                <Button
                title={senhaVisivel ? 'Esconder' : 'Mostrar'}
                onPress={toggleSenhaVisivel}
                />

                </View>

                <label>Confirme sua Senha</label>
                <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#000'}
                    secureTextEntry={!confirmarSenhaVisivel}
                    value={authPassword}
                    onChangeText={setAuthPassword}
                />

                <Button
                title={confirmarSenhaVisivel ? 'Esconder' : 'Mostrar'}
                onPress={toggleConfirmarSenhaVisivel}
                />

                </View>

                <label>Data de Nascimento</label>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#000'}
                    secureTextEntry={true}
                    value={dataNasc}
                    onChangeText={setDataNasc}
                />

                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '25%',
      height: '50%' ,
      backgroundColor: '#D9D9D9',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0.7',
      borderRadius: '5%' ,
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
      color: '#DFE321',
      fontSize: 22,
    },
    red2: {
      marginTop: 15,
      fontSize: 16,
    },
  
    title: {
      color: '#DFE321',
      fontSize: 22,
      marginBottom: 20,
    },
  
    ou: {
      fontSize: 10,
    },
  
  });

export default Cadastro;