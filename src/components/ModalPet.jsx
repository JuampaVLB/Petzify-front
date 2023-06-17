import React, { useState } from "react";
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

import SwitchSelector from "react-native-switch-selector";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

const ModalPet = ({ setEstado, estado }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [role, setRole] = useState(null);

  const data = [
    { label: "Pequeño", value: "user" },
    { label: "Mediano", value: "business" },
    { label: "Grande", value: "institution" },
    { label: "Muy Grande", value: "institution" },
  ];

  const handleImage = async () => {
    console.log("clicked image picker");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requiere permiso para acceder a la biblioteca de medios.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      console.log("acepto");
    }

    // if (!result.canceled) {
    //   if (Array.isArray(result.assets) && result.assets.length > 0) {
    //     const selectedAsset = result.assets[0];
    //     const imageUrl = selectedAsset.uri;
    //     const fileName = selectedAsset.uri.split("/").pop();

    //     console.log("file name: " + fileName);
    //     console.log("image url:  " + imageUrl);

    //     try {
    //       const response = await fetch(result.assets[0].uri);
    //       const blob = await response.blob();

    //       setFilename1(fileName);
    //       setBlob1(blob);
    //     } catch (error) {
    //       console.log("Error fetching image:", error);
    //     }
    //   }
    // }
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
                // defaultValue={title}
                // onChangeText={(newText) => setTitle(newText)}
              />
              <View style={styles.box}>
                <TextInput
                  style={styles.input_raza}
                  placeholder="Raza"
                  // defaultValue={title}
                  // onChangeText={(newText) => setTitle(newText)}
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
                  placeholder="Tamaño"
                  searchPlaceholder="Buscar..."
                  value={role}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setRole(item.value);
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
                  // onPress={(value) => this.setState({ gender: value })}
                  textColor="#000" //'#7a44cf'
                  selectedColor="#fff"
                  buttonColor="green"
                  borderColor="#ccc"
                  hasPadding
                  style={{ width: "100%" }}
                  options={[
                    { label: "Feminino", value: "f" },
                    {
                      label: "Masculino",
                      value: "m",
                    },
                  ]}
                  testID="gender-switch-selector"
                  accessibilityLabel="gender-switch-selector"
                />
              </View>
              <View style={styles.label_options}>
                <Text>Collar</Text>
                <SwitchSelector
                  initial={0}
                  // onPress={(value) => this.setState({ gender: value })}
                  textColor="#000" //'#7a44cf'
                  selectedColor="#fff"
                  buttonColor="green"
                  borderColor="#ccc"
                  hasPadding
                  style={{ width: "100%" }}
                  options={[
                    { label: "No", value: "false" },
                    {
                      label: "Si",
                      value: "true",
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
                <TouchableOpacity style={styles.btn_submit}>
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
  inputSearchStyle: {
    display: "none",
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
  }
});

export default ModalPet;
