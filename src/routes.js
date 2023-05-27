import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Login from './pages/login';
import cadastro from './pages/cadastro';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{
          title: 'Login',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#28FA7D',
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name="cadastro" component={cadastro} options={{
          title: 'Criar Usuário',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#28FA7D',
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'bold',
          }
        }} />
        <Stack.Screen name='home' component={Home} options={{
          title: '',
          headerLeft: null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#28FA7D',
          },
          headerTitleStyle: {
            color: 'black',
            fontWeight: 'bold',
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}