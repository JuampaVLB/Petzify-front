import React, { useState } from "react";
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
import axios from "axios";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const Success = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Login Exitoso!",
      button: "close",
    });
  };

  const Danger = (str) => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Danger",
      textBody: str,
      button: "close",
    });
  };

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "https://pet-tracker-backend-production.up.railway.app/api/v1/auth/signin",
      data: {
        username,
        password,
      },
    })
      .then(async function (response) {
        let token = response.headers.get("auth-token");

        // Alert.alert(
        //   `Login Exitoso! ${response.data.user.username} - ${response.data.user.email}`
        // );
        Success();
        SaveToken(token);
      })
      .catch(function (error) {
        if (error.response.data.length >= 1) {
          //Alert.alert(error.response.data[0].message);
          Danger(error.response.data[0].message);
        } else {
          //Alert.alert(error.response.data.message);
          Danger(error.response.data.message);
        }
      });
  };

  const SaveToken = async (token) => {
    try {
      await AsyncStorage.setItem("TokenJWT", token);
      await navigation.navigate("Home");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AlertNotificationRoot>
      <ImageBackground
        source={require("../../assets/img/fondo1.jpeg")}
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
