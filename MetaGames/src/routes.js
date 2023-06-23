import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, Image } from 'react-native';
import Login from './pages/login';
import Lista from './pages/lista';
import Historico from './pages/historico';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import Review from './pages/review';
import Perfil from './pages/perfil';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const CustomIcon = ({ focused, iconSource }) => (
  <Image
    source={iconSource}
    style={{ width: 30, height: 30, tintColor: focused ? null : '#000' }}
    resizeMode="contain"
  />
);

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: '#d2d2d2',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        indicatorStyle: {
          backgroundColor: 'blue',
        },
      }}
    >
      <Tab.Screen
        name="Lista"
        component={Lista}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              focused={focused}
              iconSource={require('../assets/lista.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              focused={focused}
              iconSource={require('../assets/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              focused={focused}
              iconSource={require('../assets/historico.png')}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <ImageBackground
      source={require('../assets/FundoMetaGames.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Review"
            component={Review}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}
