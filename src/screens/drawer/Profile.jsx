// Essentials

import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Cardpet from "../../components/Cardpet";

// Components

import Banner from "../../../assets/img/banner.jpeg";
import Dog from "../../../assets/splash1.png";
import { UserContext } from "../../UserContext";

// Assets

import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
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
              {/* <Ionicons name="add-circle-outline" size={38} color="green" /> */}
              <Entypo name="instagram-with-circle" size={38} color="green" />
            </TouchableOpacity>

            <TouchableOpacity>
              {/* <Ionicons name="add-circle-outline" size={38} color="green" /> */}
              <Entypo name="youtube-with-circle" size={38} color="green" />
            </TouchableOpacity>

            <TouchableOpacity>
              {/* <Ionicons name="add-circle-outline" size={38} color="green" /> */}
              <Entypo name="twitter-with-circle" size={38} color="green" />
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
          <TouchableOpacity style={styles.pencil}>
            <EvilIcons name="pencil" size={38} color="black" />
          </TouchableOpacity>
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
      <View style={styles.wall}>
        <Cardpet />
      </View>
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
    marginTop: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },
  banner: {
    position: "relative",
    width: "100%",
    height: 150,
  },
  profile_picture: {
    position: "absolute",
    bottom: 0,
    marginBottom: -45,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  socials: {
    position: "absolute",
    bottom: 0,
    marginLeft: 140,
    marginBottom: -45,
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
    marginTop: 50,
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
  pencil: {
    position: "absolute",
    right: 0,
    top: 0,
    marginRight: 20,
    marginTop: -45,
  },
});

export default Profile;
