import * as React from 'react';
import { Button, View, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import MainScreen from '../screens/Home/MainScreen';
import MyPet from '../screens/drawer/MyPet';
import Adoptions from '../screens/drawer/Adoptions';
import PetShop from '../screens/drawer/PetShop';
import Profile from '../screens/drawer/Profile';
import Settings from '../screens/drawer/Settings';
import Logout from '../screens/drawer/Logout';

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

  const YesOrNo = () => {
    Alert.alert("Quieres Cerrar Sesion ?", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("TokenJWT");
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Inicio" component={MainScreen} />
        <Drawer.Screen name="Perfil" component={Profile} />
        <Drawer.Screen name="Mi Mascota" component={MyPet} />
        <Drawer.Screen name="Adopciones" component={Adoptions} />
        <Drawer.Screen name="Pet Shop" component={PetShop} />
        <Drawer.Screen name="Configuracion" component={Settings} />
        {/* <Drawer.Screen name="Cerrar Sesion" onPress={() => YesOrNo} /> */}
      </Drawer.Navigator>
  );
}