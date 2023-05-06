import React, { useState } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    axios({
      method: "post",
      url: "https://pet-tracker-backend-production.up.railway.app/api/v1/auth/signup",
      data: {
        username,
        email,
        password,
      },
    })
      .then(function (response) {
        //  let token = response.headers.get("auth-token");
        Alert.alert(
          `Register Exitoso! ${response.data.user.username} - ${response.data.user.email}`
        );

        navigation.navigate("Home");
      })
      .catch(function (error) {
        Alert.alert(error.response.data[0].message);
      });
  };

  return (
    <View style={styles.image}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          defaultValue={username}
          onChangeText={(newText) => setUsername(newText)}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          defaultValue={email}
          inputMode="email"
          onChangeText={(newText) => setEmail(newText)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          defaultValue={password}
          onChangeText={(newText) => setPassword(newText)}
        />
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button}
        >
          <Text
            style={styles.text}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={styles.link}
          >
            Ya tengo cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: "5%",
    color: "midnightblue",
    textDecorationLine: "underline"
  }
});

export default RegisterScreen;
