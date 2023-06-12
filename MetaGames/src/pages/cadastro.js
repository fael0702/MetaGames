import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from "react-native";

const Cadastro = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('')
    const [cellphone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (!email || !password) alert('Email or Password Incorrect')
        else navigation.navigate('login')
    }

    return (
        <ImageBackground source={image} resizeMode="cover" style={{
            flex: 1,
            justifyContent: 'center'
        }}>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome'
                    placeholderTextColor={'#000'}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Celular'
                    placeholderTextColor={'#000'}
                    value={cellphone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor={'#000'}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#000'}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        color: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    button: {
        backgroundColor: '#28FA7D',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center'
    },
    buttonText: {
        color: 'lack',
        fontWeight: 'bold'
    }
})

export default Cadastro;