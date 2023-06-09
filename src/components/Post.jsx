// Essentials

import React, { useContext, useState, useEffect } from "react";
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

import Carousel from "react-native-reanimated-carousel";
import { UserContext } from "../UserContext";
import ModalComments from "./ModalComments";
import { Button, Menu } from "react-native-paper";
import socket from "../sockets";
import { postApi } from "../api/post";

// Assets

import profile from "../../assets/img/dog.jpeg";
import dog from "../../assets/img/run.webp";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Post(props) {
  const width = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  // const socket = io("http://192.168.0.3:5000");

  const [modalVisible, setModalVisible] = useState(false);
  const [room, setRoom] = useState("");
  const { userData } = useContext(UserContext);

  useEffect(() => {
    socket.on('event', (data) => {
    });

    return () => {e
      socket.off('event');
    };
  }, []);

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

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {props.image.map((item, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.activePaginationDot,
            ]}
          />
        ))}
      </View>
    );
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
        {props.image.length > 1 ? (
          <Carousel
            pagingEnabled={true}
            // mode="parallax"
            width={width}
            data={props.image}
            scrollAnimationDuration={1000}
            style={styles.image}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ index }) => (
              // console.log("el item es" + index)
              <Image
                source={{ uri: props.image[index] }}
                style={styles.image}
              />   

            )}
          />
        ) : (
          <Image source={{ uri: props.image[0] }} style={styles.image} />
        )}
        {props.image.length > 1 ? renderPagination() : null}
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
    backgroundColor: "#fff",
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
  paginationContainer: {
    position: "absolute",
    bottom: 0,
    marginBottom: 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#c7c7c7",
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: "green",
  },
});
