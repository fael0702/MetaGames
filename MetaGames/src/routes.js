import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, Image } from 'react-native';
import Login from './pages/login';
import Lista from './pages/lista';
import Historico from './pages/historico';
import Home from './pages/home';

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
      swipeEnabled={true}
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
          headerTitle: () => (
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 100, height: 90, marginTop: 80 }}
              resizeMode="contain"
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
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}
