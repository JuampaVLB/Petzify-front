import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import dog from '../assets/img/dog.jpeg';

const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.profile}>
            <Image source = {dog} style={styles.image}/>
            <View style={styles.data}>
            <Text style={styles.text}>Mi Perfil</Text>
            <Text style={styles.text}>Seguidores:  100</Text>
            <Text style={styles.text}>Seguidos:  50</Text>
            </View>
            </View>
            <DrawerContentScrollView {...props} style={styles.menu}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        width: "100%",
        height: "200px",
        backgroundColor: "",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: "100px",
        height: "100px",
        borderRadius: "50%"
    },
    data: {
        display: "flex",
        gap: "5px",
    },
    text: {
        fontSize: 18
    },
    menu: {
        display: "flex",
    }

});

export default CustomDrawer
