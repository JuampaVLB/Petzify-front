// Essentials

import React from "react";
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

// Assets

import profile from "../../assets/img/dog.jpeg";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ModalComments = ({ estado, setEstado }) => {
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
              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                    voluptas inventore nam expedita quis iure similique, quas
                    corporis soluta. Rerum, accusantium id. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Distinctio fugiat
                    libero ipsa praesentium voluptas possimus minima tenetur,
                    corporis, recusandae magni repellat asperiores ducimus
                    repudiandae officia! Eos soluta officiis reprehenderit
                    laborum? Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Magni, corporis aperiam adipisci optio tenetur
                    voluptates reiciendis culpa veritatis delectus nemo,
                    deleniti modi expedita provident. Neque quos ipsum voluptas
                    molestias dolore?
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>

              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>

              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                    voluptas inventore nam expedita quis iure similique, quas
                    corporis soluta. Rerum, accusantium id. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Distinctio fugiat
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>

              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                    voluptas inventore nam expedita quis iure similique, quas
                    corporis soluta. Rerum, accusantium id. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Distinctio fugiat
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>

              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                    voluptas inventore nam expedita quis iure similique, quas
                    corporis soluta. Rerum, accusantium id. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Distinctio fugiat
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>

              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                    voluptas inventore nam expedita quis iure similique, quas
                    corporis soluta. Rerum, accusantium id. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Distinctio fugiat
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>

              <View style={styles.comment}>
                <Image source={profile} style={styles.imageProfile} />
                <View style={styles.comment_desc}>
                  <Text>JuampaVLB</Text>
                  <Text style={styles.comment_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Harum beatae ex vero nihil. Voluptatibus quasi, eum veniam
                    voluptas inventore nam expedita quis iure similique, quas
                    corporis soluta. Rerum, accusantium id. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Distinctio fugiat
                  </Text>
                </View>
                <Ionicons name="ios-paw-outline" size={24} color="green" />
              </View>
            </ScrollView>
            <View style={styles.send_comment}>
              <View style={styles.send_comment_desc}>
                <Image source={profile} style={styles.imageProfile} />
                <TextInput
                  placeholder="Agregar Comentario..."
                  // defaultValue={username}
                  // onChangeText={(newText) => setUsername(newText)}
                />
              </View>
              <TouchableOpacity>
                <Text>Enviar</Text>
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
  comments_container: {
    width: "100%",
    maxHeight: "89%",
  },
  comment: {
    marginTop: 30,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 5,
  },
  imageProfile: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
  comment_desc: {
    marginLeft: 20,
  },
  comment_text: {
    flexWrap: "wrap",
    maxWidth: "90%",
    fontSize: 14,
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
  }
});

export default ModalComments;
