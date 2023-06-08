import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, Image } from 'react-native';
import Login from './pages/login';
import Lista from './pages/lista';
import Historico from './pages/historico';
import Home from './pages/home';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomIcon = ({ focused, iconSource }) => (
  <Image
    source={iconSource}
    style={{ width: 35, height: 35, tintColor: focused ? null : '#000' }}
    resizeMode="contain"
  />
);

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../assets/home.png');
          } else if (route.name === 'Lista') {
            iconSource = require('../assets/lista.png');
          } else {
            iconSource = require('../assets/historico.png');
          }
          return <CustomIcon focused={focused} iconSource={iconSource} />;
        },
        tabBarStyle: {
          backgroundColor: '#d2d2d2',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
      })}
    >

      <Tab.Screen
        name="Lista"
        component={Lista}
        options={{
          tabBarLabel: () => null,
          headerTransparent: true,
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
          tabBarLabel: () => null,
          headerTransparent: true,
          headerShown: true,
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
        name="Historico"
        component={Historico}
        options={{
          tabBarLabel: () => null,
          headerTransparent: true,
          headerTitle: () => (
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 100, height: 90, marginTop: 80 }}
              resizeMode="contain"
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
