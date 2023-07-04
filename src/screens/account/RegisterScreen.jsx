// Core

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";

// Modules

import { authApi } from "../../api/auth";
import { useNavigation } from "@react-navigation/native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { Dropdown } from "react-native-element-dropdown";

// Assets

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Logo from "../../../assets/img/logo.jpeg";

const data = [
  { label: "Usuario", value: "user" },
  { label: "Negocio", value: "business" },
  { label: "Institucion", value: "institution" },
];

const RegisterScreen = () => {
  const [role, setRole] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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
    authApi
      .post("/signup", {
        username,
        password,
        email,
        role,
      })
      .then(function (response) {
        Success();

        navigation.navigate("Login");
      })
      .catch(function (error) {
        // Alert.alert(error.response.data[0].message);
        Danger(error.response.data[0].message);
      });
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
    <AlertNotificationRoot>
      <View
        style={[
          styles.container,
          keyboardOpen ? styles.containerKeyboardOpen : null,
        ]}
      >
        <Image source={Logo} />
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
        <View style={styles.box}>
          <View style={styles.line} />
          <Text style={styles.text_box}>Tipo de cuenta</Text>
          <View style={styles.line} />
        </View>
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
          placeholder={!isFocus ? "Tipo De Cuenta" : "Seleccionando..."}
          searchPlaceholder="Buscar..."
          value={role}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setRole(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons
              name="account-arrow-down"
              size={24}
              color="green"
            />
          )}
        />
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
          <Text style={styles.text}>Registrarse</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text_box}>Ya tengo cuenta</Text>
          </TouchableOpacity>
          <View style={styles.line} />
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
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  containerKeyboardOpen: {
    minHeight: "150%",
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
  dropdown: {
    height: 50,
    width: "80%",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
    color: "green",
  },
  label: {
    position: "absolute",
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
    display: "none",
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

export default RegisterScreen;
