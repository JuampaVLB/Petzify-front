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
  alert,
} from "react-native";

// Components

import { UserContext } from "../UserContext";
import { postApi } from "../api/post";
import * as ImagePicker from "expo-image-picker";
import io from "socket.io-client";
// import {
//   ALERT_TYPE,
//   Dialog,
//   AlertNotificationRoot,
// } from "react-native-alert-notification";

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

  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [responseImages, setResponse] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const socket = io("http://192.168.0.3:5000");

  // https://petzify.up.railway.app/
  // http://192.168.0.2:5000

  const handlePost = async () => {
    if (isUploading) {
      return;
    }

    setIsUploading(true);

    let uploadedCount = 0;
    setImages([]);
    const uploadedImages = [];

    for (const element of images) {
      const params = {
        Bucket: "petzify",
        Key: element.filename,
        Body: element.blob,
        ContentType: "image/jpeg",
      };

      try {
        const data = await new Promise((resolve, reject) => {
          s3.upload(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });

        uploadedCount++;
        uploadedImages.push(data.Location);

        if (uploadedCount === images.length) {
          console.log(
            "Todas las imágenes se han subido exitosamente. Enviar el formulario."
          );
          console.log("response: ", uploadedImages);

          postApi
            .post("/send/post", {
              username: userData.username,
              title: title,
              desc: desc,
              image: uploadedImages,
            })
            .then((res) => {
              socket.emit("client:post", true);
              setDesc("");
              setTitle("");

              handleCloseModal();
            })
            .catch((error) => {
              if (error.response.data.length >= 1) {
              } else {
                console.log(error.response.data.message);
              }
            });
          setDesc("");
          setTitle("");
          handleCloseModal();
        }
      } catch (error) {
        console.log("Error al subir la imagen:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const addNewElements = (data) => {
    setImages((prevArray) => [...prevArray, data]);
  };

  const addNewLocations = (data) => {
    setResponse((prevArray) => [...prevArray, data]);
    console.log(responseImages);
  };

  const handleImage = async () => {
    console.log("clicked image picker");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requiere permiso para acceder a la biblioteca de medios.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      if (Array.isArray(result.assets) && result.assets.length > 0) {
        const selectedAssets = result.assets;
        console.log("selectedAssets:", selectedAssets);
        for (let i = 0; i < selectedAssets.length; i++) {
          let selectedAsset = selectedAssets[i];
          let imageUrl = selectedAsset.uri;
          let fileName = selectedAsset.uri.split("/").pop();
          try {
            let response = await fetch(selectedAsset.uri);
            let blob = await response.blob();

            addNewElements({
              filename: fileName,
              url: imageUrl,
              blob,
            });
          } catch (error) {
            console.log("Error fetching image:", error);
          }
        }
        // const imageUrl = selectedAsset.uri;
        // const fileName = selectedAsset.uri.split("/").pop();

        // console.log("file name: " + fileName);
        // console.log("image url:  " + imageUrl);

        //   try {
        //     const response = await fetch(result.assets[0].uri);
        //     const blob = await response.blob();

        //     setFilename1(fileName);
        //     setBlob1(blob);
        //   } catch (error) {
        //     console.log("Error fetching image:", error);
        //   }
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
                <MaterialIcons name="attach-money" size={34} color="green" />
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
