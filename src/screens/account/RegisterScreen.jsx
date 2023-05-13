import React, { useState } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";

import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Alert } from "react-native";

const data = [
  { label: "Usuario", value: "user" },
  { label: "Negocio", value: "business" },
  { label: "Institucion", value: "institution" }
];

const RegisterScreen = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const Success = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Registro Exitoso!",
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
    Alert.alert(value);
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
        // Alert.alert(
        //   `Register Exitoso! ${response.data.user.username} - ${response.data.user.email}`
        // );

        Success();

        navigation.navigate("Login");
      })
      .catch(function (error) {
        // Alert.alert(error.response.data[0].message);
        Danger(error.response.data[0].message);
      });
  };

  return (
    <AlertNotificationRoot>
      <ImageBackground
        source={require("../../../assets/img/register.jpeg")}
        style={styles.image}
      >
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
            onChangeText={(newText) => setEmail(newText)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={(newText) => setPassword(newText)}
          />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.button}
          >
            <Text style={styles.text}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Ya tengo cuenta</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 155,
    width: "90%",
    minHeight: "50%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    borderWidth: 1,
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
    resizeMode: "contain",
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
    marginTop: 5,
    backgroundColor: "brown",
    padding: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    color: "white",
  },
  dropdown: {
    height: 50,
    width: "80%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default RegisterScreen;
