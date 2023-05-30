import React, { useState, useContext  } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import io from "socket.io-client";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { UserContext } from '../UserContext';

// Components
import { postApi } from "../api/post";
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

  const socket = io("http://192.168.0.2:5000");

  

  const handlePost = () => {
    postApi
      .post("/test", {
        username: userData.username,
        title: title,
        desc: desc,
      })
      .then((res) => {
        console.log(res.data);
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
              onChangeText={(newText) => setDesc(newText)}
            />
          </View>
          <TouchableOpacity style={styles.btn_img}>
            <Text style={{ color: "white" }}>Agregar Imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Cerrar modal"
            onPress={handlePost}
            style={styles.btn_hide}
          >
            <Text style={{ color: "white" }}>Postear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Cerrar modal"
            onPress={handleCloseModal}
            style={styles.btn_hide}
          >
            <Text style={{ color: "white" }}>Cerrar Formulario</Text>
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
    height: 200,
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
});
