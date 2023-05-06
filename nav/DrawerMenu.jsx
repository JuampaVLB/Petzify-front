import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import MainScreen from '../screens/MainScreen';
import MapScreen from '../screens/MapScreen';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Map')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Inicio" component={MainScreen} />
        <Drawer.Screen name="Perfil" component={MainScreen} />
        <Drawer.Screen name="Mi Mascota" component={MainScreen} />
        <Drawer.Screen name="Adopciones" component={MainScreen} />
        <Drawer.Screen name="Pet Shop" component={MapScreen} />
        <Drawer.Screen name="Configuracion" component={MapScreen} />
        <Drawer.Screen name="Cerrar Sesion" component={MapScreen} />
      </Drawer.Navigator>
  );
}