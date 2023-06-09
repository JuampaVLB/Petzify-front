import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import dog from "../../assets/img/dog.jpeg";

const CustomDrawer = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [role, setRole] = useState("");
  const navigation = useNavigation();

  const YesOrNo = () => {
    Alert.alert("CERRAR SESION", "No Podras Revertir Esto!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("TokenJWT");
          setUserData({});
          navigation.navigate("Login");
        },
      },
    ]);
  };

  useEffect(() => {
    if (userData.role === "user") setRole("Usuario");
    if (userData.role === "institution") setRole("Institucion");
    if (userData.role === "business") setRole("Negocio");
    if (userData.role === "admin") setRole("Administrador");
  }, [userData])

  return (
    <View style={{ flex: 5 }}>
      <View style={styles.profile}>
        <Image source={dog} style={styles.image} />
        <View style={styles.data}>
          <Text style={styles.text}>{userData.username}</Text>
          <Text style={styles.text}>Seguidores: 200</Text>
          <Text style={styles.type}>{role}</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props} style={styles.menu}>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.logout} onPress={() => YesOrNo()}>
          <Text style={{ color: "white" }}>Cerrar Sesion</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: "100%",
    height: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  data: {
    display: "flex",
    gap: 5,
  },
  text: {
    fontSize: 18,
  },
  type: {
    padding: 2,
    textAlign: "center",
    fontSize: 17,
    width: "100%",
    backgroundColor: "orange",
    borderRadius: 20,
    color: "#fff",
  },
  menu: {
    margin: 0,
    padding: 0,
    display: "flex",
    flex: 1,
  },
  logout: {
    marginLeft: 18,
    marginTop: 18,
    backgroundColor: "green",
    borderRadius: 5,
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CustomDrawer;
