import React, { useState, useEffect, useContext } from "react";
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

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { UserContext } from "../../UserContext";

const MyPet = () => {
  const { userData } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pet, setPet] = useState([]);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  const getPets = () => {
    petApi
      .get(`/${userData.username}`)
      .then((res) => {
        // res.data.searchPets.length | Cantidad de PERROS
        // console.log(res.data.searchPets[0]);
        setPet(res.data.searchPets);

        if (pet[count].size == "verybig") {
          setSize("Muy Grande");
          setLoading(false);
        }
        if (pet[count].size === "big") {
          setSize("Grande");
          setLoading(false);
        }
        if (pet[count].size === "medium") {
          setSize("Mediano");
        }
        if (pet[count].size === "small") {
          setSize("Pequeño");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    if (pet.length > 0) {
      if (pet[count].size == "verybig") {
        setSize("Muy Grande");
      }
      if (pet[count].size === "big") setSize("Grande");
      if (pet[count].size === "medium") setSize("Mediano");
      if (pet[count].size === "small") setSize("Pequeño");
    }
  }, [count]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const Next = () => {
    console.log("pet length: " + pet.length + " count: " + count);
    setCount(count + 1);
    console.log("count es: " + count);
    if (count === pet.length - 1) {
      setCount(0);
    }
  };

  const Prev = () => {
    setCount(count - 1);
    console.log("count es: " + count);
    if (count === 0) {
      setCount(pet.length - 1);
    }
  };

  return (
    <View style={styles.container}>
      {pet.length >= 1 ? (
        <View style={styles.content}>
          <Image source={{ uri: pet[count].photos[1] }} style={styles.banner} />
          <Image
            source={{ uri: pet[count].photos[0] }}
            style={styles.image_profile}
          />
          {pet.length >= 2 ? (
            <>
              <TouchableOpacity
                onPress={Prev}
                style={[styles.arrows, styles.arrow_left]}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={Next}
                style={[styles.arrows, styles.arrow_right]}
              >
                <AntDesign name="arrowright" size={24} color="white" />
              </TouchableOpacity>
            </>
          ) : null}

          <Text style={styles.name}>{pet[count].name}</Text>
          <View style={styles.info}>
            <View style={styles.left}>
              <Text style={[styles.center, styles.title]}>Tamaño</Text>
              <Text style={styles.center}>{size}</Text>
            </View>
            <View style={styles.right}>
              <Text style={[styles.center, styles.title]}>Raza</Text>
              <Text style={styles.center}>{pet[count].breed}</Text>
            </View>
            {pet[count].genre === "male" ? (
              <Ionicons name="male" size={24} color="black" />
            ) : (
              <Ionicons name="female" size={24} color="black" />
            )}
          </View>
          <View style={styles.images_container}>
            <View style={styles.images}>
              <View style={styles.div}>
                <Image
                  source={{ uri: pet[count].photos[2] }}
                  style={styles.picture}
                />
                <Image
                  source={{ uri: pet[count].photos[2] }}
                  style={styles.picture}
                />
                <Image
                  source={{ uri: pet[count].photos[2] }}
                  style={styles.picture}
                />
              </View>
              <View style={styles.div}>
                <Image
                  source={{ uri: pet[count].photos[2] }}
                  style={styles.picture}
                />
                <Image
                  source={{ uri: pet[count].photos[2] }}
                  style={styles.picture}
                />
                <Image
                  source={{ uri: pet[count].photos[2] }}
                  style={styles.picture}
                />
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
        <Text style={{ fontSize: 42, color: "white" }}>+</Text>
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
  arrows: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    maxHeight: 55,
    maxWidth: 55,
    marginTop: "58%",
    zIndex: 100,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 25,
  },
  arrow_left: {
    marginLeft: -10,
    left: 0,
  },
  arrow_right: {
    marginRight: -10,
    right: 0,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    bottom: 800,
    margin: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
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
  },
});

export default MyPet;
