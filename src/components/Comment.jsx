// Essentials

import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

// Components

// Assets

import profile from "../../assets/img/dog.jpeg";
import { Ionicons } from "@expo/vector-icons";

const Comment = (props) => {
  return (
    <View style={styles.comment}>
      <Image source={profile} style={styles.imageProfile} />
      <View style={styles.comment_desc}>
        <Text>JuampaVLB</Text>
        <Text style={styles.comment_text}>
          {props.message}
        </Text>
      </View>
      <Ionicons name="ios-paw-outline" size={24} color="green" />
    </View>
  );
};
const styles = StyleSheet.create({
comment: {
    marginTop: 30,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "gray",
    borderRadius: 15,
  },
  imageProfile: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
  comment_desc: {
    width: "80%",
    marginLeft: 20,
  },
  comment_text: {
    flexWrap: "wrap",
    maxWidth: "90%",
    fontSize: 14,
  },
});

export default Comment;
