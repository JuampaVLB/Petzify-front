import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";

import { petApi } from "../../api/pet";
import ModalPet from "../../components/ModalPet";
import banner from "../../../assets/img/run.webp";
import dog from "../../../assets/img/dog.jpeg";

import { Ionicons } from "@expo/vector-icons";

const MyPet = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pet, setPet] = useState([]);
  const [breed, setBreed] = useState([]);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  const getPets = () => {
    petApi
      .get("/usuario")
      .then((res) => {
        // res.data.searchPets.length | Cantidad de PERROS
        // console.log(res.data.searchPets[0]);
        setPet(res.data.searchPets[0]);

        if (pet.size == "verybig") {
          setSize("Muy Grande");
        }
        if (pet.size === "big") setSize("Grande");
        if (pet.size === "medium") setSize("Mediano");
        if (pet.size === "small") setSize("Pequeño");

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pet ? (
        <View style={styles.content}>
          <Image source={{ uri: pet.photos[1] }} style={styles.banner} />
          <Image source={{ uri: pet.photos[0] }} style={styles.image_profile} />
          <Text style={styles.name}>{pet.name}</Text>
          <View style={styles.info}>
            <View style={styles.left}>
              <Text style={[styles.center, styles.title]}>Tamaño</Text>
              <Text style={styles.center}>{size}</Text>
            </View>
            <View style={styles.right}>
              <Text style={[styles.center, styles.title]}>Raza</Text>
              <Text style={styles.center}>{pet.breed}</Text>
            </View>
            {pet.genre === "male" ? (
              <Ionicons name="male" size={24} color="black" />
            ) : (
              <Ionicons name="female" size={24} color="black" />
            )}
          </View>
          <View style={styles.images_container}>
            <View style={styles.images}>
              <View style={styles.div}>
                <Image source={{ uri: pet.photos[2] }} style={styles.picture} />
                <Image source={{ uri: pet.photos[2] }} style={styles.picture} />
                <Image source={{ uri: pet.photos[2] }} style={styles.picture} />
              </View>
              <View style={styles.div}>
                <Image source={{ uri: pet.photos[2] }} style={styles.picture} />
                <Image source={{ uri: pet.photos[2] }} style={styles.picture} />
                <Image source={{ uri: pet.photos[2] }} style={styles.picture} />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.error}>
          <Text style={styles.error_text}>No hay mascotas</Text>
        </View>
        
      )}
      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 32, color: "white" }}>+</Text>
      </TouchableOpacity>
      <View>
        <ModalPet setEstado={setModalVisible} estado={modalVisible} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    position: "relative",
    alignItems: "center",
  },
  content: {
    width: "90%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  add: {
    position: "absolute",
    right: 0,
    bottom: 725,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "green",
  },
  image_profile: {
    borderWidth: 3,
    borderColor: "black",
    position: "absolute",
    marginTop: 150,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 36,
    marginTop: 50,
  },
  info: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  left: {
    padding: 5,
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  right: {
    padding: 5,
    width: "50%",
  },
  center: {
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  images_container: {
    width: "100%",
    height: "100%",
    padding: 25,
  },
  images: {
    borderRightColor: "gray",
    borderTopWidth: 1,
    paddingTop: 15,
    height: 300,
    display: "flex",
    justifyContent: "space-around",
  },
  picture: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
  },
  div: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  error: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  error_text: {
    fontSize: 26,
    marginTop: 20,
  }
});

export default MyPet;
