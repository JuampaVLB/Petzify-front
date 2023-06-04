// Essentials

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";

// Components

import { UserContext } from "../UserContext";
import { postApi } from "../api/post";
import * as ImagePicker from "expo-image-picker";
import io from "socket.io-client";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";

// Assets

import { Entypo } from "@expo/vector-icons";
import profile from "../../assets/img/dog.jpeg";

export default function Post({ estado, setEstado }) {
  const { userData } = useContext(UserContext);
  const handleCloseModal = () => {
    setEstado(false);
  };

  const Danger = (str) => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Danger",
      textBody: str,
      button: "close",
    });
  };

  const Success = (str) => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: str,
      button: "close",
    });
  };

  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const socket = io("http://192.168.1.38:5000");

  const handlePost = () => {
    postApi
      .post("/send/post", {
        username: userData.username,
        title: title,
        desc: desc,
      })
      .then((res) => {
        // console.log(res.data);
        Success("Posteo Creado Perfectamente");
        socket.emit("client:post", true);
        setDesc("");
        setTitle("");

        // handleCloseModal();
      })
      .catch((error) => {
        if (error.response.data.length >= 1) {
          // Alert.alert(error.response.data[0].message);
          Danger(error.response.data[0].message);
          // handleCloseModal();
        } else {
          // Alert.alert(error.response.data.message);
          Danger(error.response.data.message);
        }
      });
  };

  const handleImage = async () => {
    console.log("clicked image picker");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requiere permiso para acceder a la biblioteca de medios.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      console.log(result);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={estado}
      onRequestClose={handleCloseModal}
    >
      <AlertNotificationRoot theme="dark">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.account_info}>
              <Image source={profile} style={styles.imageProfile} />
              <Text>@{userData.username}</Text>
            </View>
            <View>
              <Text aria-label="Label for Title" nativeID="titulo">
                Titulo
              </Text>
              <TextInput
                aria-label="input"
                aria-labelledby="titulo"
                style={styles.input_title}
                defaultValue={title}
                onChangeText={(newText) => setTitle(newText)}
              />
            </View>
            <View>
              <Text aria-label="Label for Desc" nativeID="descripcion">
                Descripcion
              </Text>
              <TextInput
                aria-label="input"
                aria-labelledby="descripcion"
                style={styles.input_desc}
                defaultValue={desc}
                multiline={true}
                numberOfLines={4}
                onChangeText={(newText) => setDesc(newText)}
              />
            </View>
            <TouchableOpacity style={styles.btn_img} onPress={handleImage}>
              <Text style={{ color: "white" }}>Agregar Imagen1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Postear"
              onPress={handlePost}
              style={styles.btn_hide}
            >
              <Text style={{ color: "white" }}>Postear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Cerrar modal"
              onPress={handleCloseModal}
              style={styles.cross}
            >
              <Entypo name="cross" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </AlertNotificationRoot>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageProfile: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
  modalView: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "85%",
  },
  account_info: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    width: "85%",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input_title: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 10,
  },
  input_desc: {
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 10,
  },
  btn_img: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    backgroundColor: "green",
    borderRadius: 10,
  },
  btn_hide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 40,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  cross: {
    position: "absolute",
    right: 0,
    marginTop: "1%",
    marginLeft: "10%",
  },
});
