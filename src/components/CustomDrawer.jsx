import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import dog from "../../assets/img/dog.jpeg";

import { authApi } from "../api/auth";

const CustomDrawer = (props) => {
  const [data, setData] = useState({});
  const [role, setRole] = useState("NaN");
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
          navigation.navigate("Login");
        },
      },
    ]);
  };

  const GetToken = async () => {
    try {
      const value = await AsyncStorage.getItem("TokenJWT");

      let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": value,
      };

      authApi
        .get("/profile", {
          headers: headers,
        })
        .then((res) => {
          setData(res.data.user);
          if (res.data.user.role === "user") setRole("Usuario");
          if (res.data.user.role === "institution") setRole("Institucion");
          if (res.data.user.role === "business") setRole("Negocio");
          if (res.data.user.role === "admin") setRole("Administrador");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    GetToken();
  }, []);

  return (
    <View style={{ flex: 5 }}>
      <View style={styles.profile}>
        <Image source={dog} style={styles.image} />
        <View style={styles.data}>
          <Text style={styles.text}>{data.username}</Text>
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
