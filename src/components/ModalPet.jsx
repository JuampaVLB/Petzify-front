import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

//

import { MaterialCommunityIcons } from "@expo/vector-icons";

//

import { petApi } from "../api/pet";
import SwitchSelector from "react-native-switch-selector";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

//

import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: "AKIAW5QYJ5MXNPZGVRC4",
  secretAccessKey: "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",
  region: "sa-east-1",
});

const ModalPet = ({ setEstado, estado }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [genre, setGenre] = useState("male");
  const [size, setSize] = useState("");
  const [collar, setCollar] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [images, setImages] = useState([]);
  const [blob1, setBlob1] = useState("");

  const data_breed = [
    { label: "Labrador", value: "Labrador" },
    { label: "Bulldog francés", value: "Bulldog francés" },
    { label: "Golden", value: "Golden" },
    { label: "Pastor alemán", value: "Pastor alemán" },
    { label: "Caniche", value: "Caniche" },
    { label: "Bulldog", value: "Bulldog" },
    { label: "Beagle", value: "Beagle" },
    { label: "Rottweiler", value: "Rottweiler" },
    { label: "Desconocido", value: "Desconocido" },
  ];

  const data_size = [
    { label: "Pequeño", value: "small" },
    { label: "Mediano", value: "medium" },
    { label: "Grande", value: "big" },
    { label: "Muy Grande", value: "verybig" },
  ];

  const addNewElements = (data) => {
    setImages((prevArray) => [...prevArray, data]);
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

        for (let i = 0; i < selectedAssets.length; i++) {
          const selectedAsset = selectedAssets[i];
          const imageUrl = selectedAsset.uri;
          const fileName = selectedAsset.uri.split("/").pop();

          // console.log("file name: " + fileName);
          // console.log("image url:  " + imageUrl);
          // addNewElements({
          //   filename: fileName,
          //   url: imageUrl,
          // });
          const response = await fetch(result.assets[0].uri);
          // const blob = await response.blob();
          try {
            

            // console.log(blob[0]);

            // setBlob1(blob);

            addNewElements({
              filename: fileName,
              url: imageUrl,
              // blob: "test",
            });
          } catch (error) {
            console.log("Error fetching image:", error);
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log("blob es: " + blob1);
  }, [blob1]);

  const Reset = () => {
    setName("");
    setBreed("");
    setSize("");
    setGenre("male");
    setCollar(false);
  };

  const handleSubmit = () => {
    // console.log(
    //   `
    //   Owner: Test,
    //   Name: ${name}
    //   Breed: ${breed}
    //   Size: ${size}
    //   Genre: ${genre}
    //   Collar: ${collar}
    //   `
    // );

    images.forEach((element, index) => {
      console.log(
        `
        N: ${index}
        filename: ${element.filename}
        URL: ${element.url}
        `
      );

      // let params = {
      //   Bucket: "petzify",
      //   Key: element.filename,
      //   Body: blob1,
      //   ContentType: "image/jpeg",
      // };
    });

    setImages([]);

    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }

    //   img1 = data.Location;
    //   console.log(img1);

    petApi
      .post("/create", {
        owner: "juan probando",
        name,
        breed,
        size,
        genre,
        collar,
      })
      .then(function (response) {
        Alert.alert("mascota registrada en la base de datos");
        Reset();
      })
      .catch(function (error) {
        Alert.alert(error.response.data[0].message);
        // Danger(error.response.data[0].message);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={estado}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEstado(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Mi Mascota</Text>
            <View style={styles.content}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                defaultValue={name}
                onChangeText={(newText) => setName(newText)}
              />
              <View style={styles.box}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    styles.input_raza,
                    isFocus && { borderColor: "blue" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data_breed}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Raza"
                  searchPlaceholder="Buscar..."
                  value={breed}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setBreed(item.value);
                    setIsFocus(false);
                  }}
                />
                {/* <TextInput
                  style={styles.input_raza}
                  placeholder="Raza"
                  defaultValue={breed}
                  onChangeText={(newText) => setBreed(newText)}
                /> */}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data_size}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Tamaño"
                  searchPlaceholder="Buscar..."
                  value={size}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSize(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <TouchableOpacity style={styles.btn_img} onPress={handleImage}>
                <Text
                  style={{ color: "#000", fontSize: 18, textAlign: "center" }}
                >
                  Agregar Imagenes
                </Text>
              </TouchableOpacity>

              <View style={styles.label_options}>
                <Text>Genero</Text>
                <SwitchSelector
                  initial={0}
                  onPress={(value) => setGenre(value)}
                  textColor="#000"
                  selectedColor="#fff"
                  buttonColor="green"
                  borderColor="#ccc"
                  hasPadding
                  style={{ width: "100%" }}
                  options={[
                    { label: "Masculino", value: "male" },
                    { label: "Feminino", value: "female" },
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>
              <View style={styles.label_options}>
                <Text>Collar</Text>
                <SwitchSelector
                  initial={0}
                  onPress={(value) => setCollar(value)}
                  textColor="#000" //'#7a44cf'
                  selectedColor="#fff"
                  buttonColor="green"
                  borderColor="#ccc"
                  hasPadding
                  style={{ width: "100%" }}
                  options={[
                    { label: "No", value: false },
                    {
                      label: "Si",
                      value: true,
                    },
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>
              <View style={styles.box_end}>
                <TouchableOpacity
                  style={styles.btn_cancel}
                  onPress={() => setEstado(false)}
                >
                  <Text style={{ color: "#000", textAlign: "center" }}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn_submit}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: "#fff", textAlign: "center" }}>
                    Agregar Mascota
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000AA",
  },
  modalView: {
    width: "95%",
    height: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
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
  input_raza: {
    width: "55%",
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
  label_options: {
    width: "100%",
    display: "flex",
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  btn_img: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
    borderRadius: 15,
  },
  dropdown: {
    height: 50,
    width: "40%",
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
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  box_end: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  btn_submit: {
    backgroundColor: "green",
    width: "60%",
    padding: 10,
    borderRadius: 15,
  },
  btn_cancel: {
    width: "35%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
  },
});

export default ModalPet;
