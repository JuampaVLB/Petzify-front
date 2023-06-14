// Essentials

import React, { useState, useEffect, useContext } from "react";
import {
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

import { UserContext } from "../UserContext";
import io from "socket.io-client";
import Comment from "./Comment";
import { postApi } from "../api/post";
import Loader from "./Loader";

// Assets

import profile from "../../assets/img/dog.jpeg";
import { AntDesign } from "@expo/vector-icons";

const ModalComments = ({ estado, setEstado, room }) => {

  const { userData } = useContext(UserContext);
  const socket = io("https://petzify.up.railway.app");

  // https://petzify.up.railway.app/
  // http://192.168.0.2:5000

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await postApi.post(`/send/comment/`, {
        room,
        comment,
        username: userData.username
      });
      socket.emit("client:comment", room);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async (sala) => {
    try {
      const response = await postApi.get(`/all/comment/${sala}`);
      setComments(response.data[0].comments);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  useEffect(() => {
    if (room) {
      fetchPosts(room);
    }

    setComments([]);

  }, [estado]);

  socket.on("server:loadcomments", (data) => {
    setComments(data[0].comments);
  });

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={estado}
        onRequestClose={() => {
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
              {comments.length > 0 ? (
                comments.map((c, index) => <Comment key={index} username={c.username} message={c.comment} />)
              ) : (
                <View style={styles.noComments_box}>
                {/* <Text style={styles.noComments}>0 Comentarios</Text>  */}
                <Loader setEstado={setLoading} estado={loading} />
                </View>
              )}
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
    maxHeight: "100%",
  },
  send_comment: {
    width: "110%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between",
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    marginTop: 20,
  },
  send_comment_desc: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  noComments_box: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 25,
  },
  noComments: {
    fontSize: 20,
  }
});

export default ModalComments;
