// Essentials

import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Cardpet from "../../components/Cardpet";

// Components

import Banner from "../../../assets/img/run.webp";
import Dog from "../../../assets/img/dog.jpeg";
import { UserContext } from "../../UserContext";

// Assets

import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { userData } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.info_user}>
        <View style={styles.profile}>
          <Image source={Banner} style={styles.banner} />
          <Image source={Dog} style={styles.profile_picture} />
          <View style={styles.socials}>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={38} color="green" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={38} color="green" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={38} color="green" />
            </TouchableOpacity>
          </View>
          <Image />
        </View>
        <View style={styles.data}>
          <Text style={styles.username}>{userData.username}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ color: "#fff" }}>Seguir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ color: "#fff" }}>Mensajes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn_settings]}>
              <Text style={{ color: "#fff" }}>Mas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <Text>
              Descripcion muy importante sobre algo re importante hablando de mi
              muy importante perfil.
            </Text>
          </View>
          <View style={styles.interactions}>
            <View>
              <Text style={styles.interaction_number}>10</Text>
              <Text style={styles.interaction_desc}>Seguidores</Text>
            </View>

            <View>
              <Text style={styles.interaction_number}>10</Text>
              <Text style={styles.interaction_desc}>Seguidos</Text>
            </View>

            <View>
              <Text style={styles.interaction_number}>10</Text>
              <Text style={styles.interaction_desc}>Likes</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.wall}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  info_user: {
    width: "100%",
    height: "60%",
  },
  wall: {
    width: "100%",
    height: "40%",
  },
  banner: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  profile_picture: {
    position: "absolute",
    bottom: 0,
    marginBottom: -64,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: "black",
    width: 128,
    height: 128,
    borderRadius: 100,
  },
  socials: {
    position: "absolute",
    bottom: 0,
    marginLeft: 180,
    marginBottom: -50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  data: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 80,
  },
  username: {
    color: "#000",
    fontSize: 30,
  },
  buttons: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "green",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 100,
  },
  btn_settings: {
    backgroundColor: "gray",
  },
  description: {
    marginTop: 20,
    padding: 15,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 2,
  },
  interactions: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  interaction_box: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "red",
  },
  interaction_number: {
    fontSize: 30,
    textAlign: "center",
  },
  interaction_desc: {
    color: "gray",
    textAlign: "center",
  },
});

export default Profile;
