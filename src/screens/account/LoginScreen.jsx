import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { authApi } from "../../api/auth";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const Danger = (str) => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Danger",
      textBody: str,
      button: "close",
    });
  };

  const handleSubmit = () => {
    authApi
      .post("/signin", {
        username,
        password,
      })
      .then(async function (response) {
        let token = response.headers.get("auth-token");

        saveToken(token);
      })
      .catch(function (error) {
        if (error.response.data.length >= 1) {
          //Alert.alert(error.response.data[0].message);
          Danger(error.response.data[0].message);
        } else {
          Danger(error.response.data.message);
        }
      });
  };

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("TokenJWT", token);
      await navigation.navigate("Home");
    } catch (error) {
      throw Danger(error);
    }
  };

  return (
    <AlertNotificationRoot theme="dark">
      <ImageBackground
        source={require("../../../assets/img/login.jpeg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su usuario"
            defaultValue={username}
            onChangeText={(newText) => setUsername(newText)}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Ingrese su contraseña"
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
          />

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.button}
          >
            <Text style={styles.text}>Acceder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: 100,
    width: "90%",
    minHeight: "40%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "80%",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "mediumseagreen",
    padding: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  link: {
    marginTop: 5,
    backgroundColor: "brown",
    padding: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    color: "white",
  },
});

export default LoginScreen;
