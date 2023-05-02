import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from '../screens/MapScreen';


const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
    return (

        <Drawer.Navigator>
            <Drawer.Screen name="ProfileScreen" component={MapScreen}></Drawer.Screen>
        </Drawer.Navigator>

    );
}