// Core

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";

// Modules

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { authApi } from "../../api/auth";

// Assets

import { AntDesign } from "@expo/vector-icons";
import Logo from "../../../assets/img/logo.jpeg";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <AlertNotificationRoot theme="dark">
      <View
        style={[
          styles.container,
          keyboardOpen ? styles.containerKeyboardOpen : null,
        ]}
      >
        <View style={styles.form}>
          <Image source={Logo} />
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            defaultValue={username}
            onChangeText={(newText) => setUsername(newText)}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
          />

          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.button}
          >
            <Text style={styles.text}>Acceder</Text>
          </TouchableOpacity>
          <View style={styles.box}>
            <View style={styles.line} />
            <Text style={styles.text_box}>Otro</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={[styles.button, styles.connect]}
          >
            <AntDesign name="google" size={28} color="green" />
            <Text style={{ color: "black", width: 160 }}>
              Continuar con Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={[styles.button, styles.connect]}
          >
            <AntDesign name="facebook-square" size={28} color="green" />
            <Text style={{ color: "black", width: 160 }}>
              Continuar con Facebook
            </Text>
          </TouchableOpacity>
          <View style={styles.box}>
            <View style={styles.line} />
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.text_box}>No tengo cuenta</Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerKeyboardOpen: {
    minHeight: "250%",
  },
  form: {
    marginTop: 100,
    width: "90%",
    minHeight: "60%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    gap: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 15,
    margin: 10,
    width: "80%",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#73A073",
    padding: 15,
    width: "80%",
    alignSelf: "center",
    borderRadius: 50,
    // borderWidth: 2,
  },
  connect: {
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#fff",
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
  box: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  line: {
    height: 1,
    width: 100,
    marginHorizontal: 5,
    marginTop: 6,
    backgroundColor: "gray",
  },
  text_box: {
    fontSize: 14,
    color: "#00aae4",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default LoginScreen;
