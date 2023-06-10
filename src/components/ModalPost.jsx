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

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import profile from "../../assets/img/dog.jpeg";

import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "AKIAW5QYJ5MXNPZGVRC4",
  secretAccessKey: "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",
  region: "sa-east-1",
});

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
  const [filename1, setFilename1] = useState("");
  const [blob1, setBlob1] = useState("");

  const socket = io("https://petzify.up.railway.app/");

  // https://petzify.up.railway.app/
  // http://192.168.0.2:5000

  const handlePost = () => {
    if (filename1.length > 1) {
      const params = {
        Bucket: "petzify",
        Key: filename1,
        Body: blob1,
        ContentType: "image/jpeg",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Imagen subida exitosamente:", data.Location);
        setFilename1("");
        setBlob1("");
      });
    } else {
      console.log("no subiste imagenes");
    }

    postApi
      .post("/send/post", {
        username: userData.username,
        title: title,
        desc: desc,
      })
      .then((res) => {
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
      if (Array.isArray(result.assets) && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const imageUrl = selectedAsset.uri;
        const fileName = selectedAsset.uri.split("/").pop();

        console.log("file name: " + fileName);
        console.log("image url:  " + imageUrl);

        try {
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();

          setFilename1(fileName);
          setBlob1(blob);
        } catch (error) {
          console.log("Error fetching image:", error);
        }
      }
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
            <TextInput
              aria-label="input"
              aria-labelledby="titulo"
              style={styles.input_title}
              placeholder="Escribe un Titulo"
              defaultValue={title}
              onChangeText={(newText) => setTitle(newText)}
            />
            <TextInput
              aria-label="input"
              aria-labelledby="descripcion"
              style={styles.input_desc}
              defaultValue={desc}
              placeholder="Escribe una Descripcion"
              multiline={true}
              numberOfLines={4}
              onChangeText={(newText) => setDesc(newText)}
            />
            <View style={styles.bottom}>
              <View style={styles.bottom_icons}>
                <TouchableOpacity style={styles.btn_img} onPress={handleImage}>
                  <Ionicons name="image-outline" size={34} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_img}>
                  <MaterialIcons name="tag-faces" size={34} color="green" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                title="Postear"
                onPress={handlePost}
                style={styles.btn_hide}
              >
                <Text style={{ color: "white" }}>Postear</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#000000AA",
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
    height: "50%",
    // padding: 20,
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
    borderColor: "#ccc",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input_title: {
    width: 330,
    height: 50,
    backgroundColor: "white",
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 4,
  },
  input_desc: {
    width: 330,
    backgroundColor: "white",
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 4,
  },
  btn_img: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 44,
    padding: 5,
  },
  btn_hide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: 40,
    backgroundColor: "green",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 54,
    },
    shadowRadius: 55,
    shadowOpacity: 1,
  },
  cross: {
    position: "absolute",
    right: 0,
    marginTop: "1%",
    marginLeft: "10%",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
  },
  bottom_icons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
