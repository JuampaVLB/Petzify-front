// Essentials

import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Components

import io from "socket.io-client";
import Comment from "./Comment";
import { postApi } from "../api/post";

// Assets

import profile from "../../assets/img/dog.jpeg";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ModalComments = ({ estado, setEstado, room }) => {
  const socket = io("http://192.168.1.38:5000");

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("comentaste esto: " + comment + " y tu room es:" + room);
    socket.emit("client:comment", room);
    setComment("");
  };

  const fetchPosts = async (sala) => {
    try {
      const response = await postApi.get(`/all/comment/${sala}`);
      console.log(response.data[0].comments);
      setComments(response.data[0].comments);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  useEffect(() => {
    console.log(room);
    if (room) {
      console.log("ya tengo room");
      fetchPosts(room);
    }

    // socket.on("server:loadcomments", (data) => {
    //   // console.log(data[0].comments);
    //   setComments(data[0].comments);
    //   console.log(data);
    // });
  }, [room]);

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
            <View style={styles.top_header}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                onPress={() => setEstado(false)}
              />
              <Text style={{ fontSize: 20 }}>Comentarios</Text>
            </View>
            <ScrollView style={styles.comments_container}>
              {comments.length > 0
                ? comments.map((c, index) => (
                    <Comment key={index} message={c} />
                  ))
                : console.log("cargando...")}
              {/* {comments.map((c, index) => (
             console.log("comentario N" + index + " : " + c)
              <Comment
              key={index}
              message={c}
              />  
            }
          // <Post
          //   key={post._id}
          //   imageURL="run"
          //   username={post.username}
          //   title={post.title}
          //   desc={post.desc}
          //   index={posts.length === index + 1 ? true : false}
          //   room={post.room}
          // />
             } */}
            </ScrollView>
            <View style={styles.send_comment}>
              <View style={styles.send_comment_desc}>
                <Image source={profile} style={styles.imageProfile} />
                <TextInput
                  placeholder="Agregar Comentario..."
                  defaultValue={comment}
                  onChangeText={(newText) => setComment(newText)}
                />
              </View>
              <TouchableOpacity>
                <Text onPress={handleSubmit}>Enviar</Text>
              </TouchableOpacity>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // backgroundColor: "red",
    width: "100%",
    height: "110%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "red",
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
  top_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    gap: 20,
    width: "100%",
  },
  imageProfile: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
  comments_container: {
    width: "100%",
    maxHeight: "89%",
  },
  send_comment: {
    width: "110%",
    display: "flex",
    flexDirection: "row",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between",
    backgroundColor: "gray",
    alignItems: "center",
  },
  send_comment_desc: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
});

export default ModalComments;
