import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

    const navigation = useNavigation();

  const handleLogin = () => {
        if(user === '' && password === '') {
            navigation.navigate('home')
        } else {
            alert('Usuário ou senha inválidos!')
        }
  };

  const handleSignUp = () => {
    if(user === '' && password === '') {
        navigation.navigate('cadastro')
    } else {
        alert('Usuário ou senha inválidos!')
    }
};

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder="Usuário"
      value={user}
      onChangeText={setUser}
      />
      <TextInput
      style={styles.input}
      placeholder="Senha"
      secureTextEntry={true}
      value={password}
      onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3C3E44',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        width: '80%',
      },
      button: {
        backgroundColor: '#272B33',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        margin: 5,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
})

export default Login;