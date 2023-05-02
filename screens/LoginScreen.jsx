import React, { useState } from "react";
import {
  Alert,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#87CEEB",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "https://pet-tracker-backend-production.up.railway.app/api/v1/auth/signin",
      data: {
        username,
        password,
      },
    })
      .then(function (response) {
        let token = response.headers.get("auth-token");

        Alert.alert(
          `Login Exitoso! ${response.data.user.username} - ${response.data.user.email}`
        );

        navigation.navigate("Home");

        // Alert.alert(token);
      })
      .catch(function (error) {
        if (error.response.data.length >= 1) {
          Alert.alert(error.response.data[0].message);
        } else {
          Alert.alert(error.response.data.message);
        }
      });
  };

  return (
    <View style={styles.image}>
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
          style={{
            backgroundColor: "purple",
            padding: 10,
            marginTop: "20%",
            width: "50%",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "white",
            }}
          >
            Acceder
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{color:'midnightblue', textDecorationLine:'underline'}}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
