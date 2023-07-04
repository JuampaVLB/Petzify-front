// Essentials

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

// Components

import { UserContext } from "../UserContext";
import ModalComments from "./ModalComments";
import { Button, Menu } from "react-native-paper";
import io from "socket.io-client";
import { postApi } from "../api/post";

// Assets

import profile from "../../assets/img/dog.jpeg";
import dog from "../../assets/img/run.webp";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Post(props) {
  const socket = io("https://petzify.up.railway.app");

  const [modalVisible, setModalVisible] = useState(false);
  const [room, setRoom] = useState("");
  const { userData } = useContext(UserContext);

  const handleComments = (postId) => {
    try {
      setRoom(postId);
      setModalVisible(true);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    }
  };

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const deletePost = (room) => {
    Alert.alert("Cerrar Sesion", "Estas seguro no podras volver atras!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("borraste el posteo" + room);

          postApi
            .delete(`/p/${room}`)
            .then((res) => {
              console.log("se borro bien");
              socket.emit("client:post", true);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  };

  return (
    <View
      style={[styles.container, props.index === true ? styles.lastPost : null]}
    >
      <View style={styles.top}>
        <View style={styles.info}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Image source={profile} style={styles.imageProfile} />
            <Text style={styles.text}>{props.username}</Text>
          </View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="top"
            anchor={
              <Button onPress={openMenu}>
                <SimpleLineIcons name="options" size={24} color="black" />
              </Button>
            }
          >
            <Menu.Item
              leadingIcon="share"
              onPress={() => {}}
              title="Compartir"
              // disabled
            />

            {props.username === userData.username ? (
              <Menu.Item
                leadingIcon="pencil"
                onPress={() => {}}
                title="Editar"
              />
            ) : null}

            {props.username === userData.username ? (
              <Menu.Item
                leadingIcon="delete"
                onPress={() => deletePost(props.room)}
                title="Borrar"
              />
            ) : null}

            {props.username != userData.username ? (
              <Menu.Item
                leadingIcon="close-circle"
                onPress={() => {}}
                title="Dejar de seguir"
              />
            ) : null}
          </Menu>
        </View>
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.desc}>
          <View style={styles.desc_info}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              {props.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 15,
                marginRight: 10,
              }}
            >
              <AntDesign name="like2" size={24} color="black" />
              <Feather name="send" size={24} color="black" />
              <FontAwesome name="bookmark-o" size={24} color="black" />
            </View>
          </View>
          <Text style={{ marginTop: 15 }}>{props.desc}</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />
        </View>
        <View style={styles.featured_comment}>
          <Text>@JuampaVLB</Text>
          <Text>Que soy muy amigable y me encanta hacer amigos...</Text>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        />
        <View style={styles.comment}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Image source={dog} style={styles.imageProfile} />
            <Text style={styles.text}>@{userData.username}</Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 10, marginLeft: 45, height: 100 }}
            onPress={() => handleComments(props.room)}
          >
            <Text>Comentar...</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ModalComments
          estado={modalVisible}
          setEstado={setModalVisible}
          room={room}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - 104,
    width: "100%",
    backgroundColor: "#fff"
  },
  top: {
    width: "100%",
    height: "50%",
    overflow: "hidden",
  },
  info: {
    width: "100%",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  imageProfile: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
  bottom: {
    width: "100%",
    height: "50%",
    padding: 10,
  },
  desc_info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featured_comment: {
    marginTop: 10,
    gap: 5,
  },
  comment: {
    marginTop: 15,
  },
  lastPost: {
    marginBottom: 55,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
