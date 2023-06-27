import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import pet from "../../assets/img/dog.jpeg";

const Cardpet = (props) => {


  return (
    <TouchableOpacity style={styles.container}>
      <Image source={pet} style={styles.image_pet} />
      <View style={styles.info}>
        <Text style={styles.pet_text}>{props.name}</Text>
        <Text style={styles.owner_text}>{props.owner}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 50,
  },
  image_pet: {
    width: 88,
    height: 88,
    borderRadius: 50,
  },
  info: {},
  pet_text: {
    fontSize: 26,
    color: "#fff",
  },
  owner_text: {
    fontSize: 16,
    color: "#ccc",
    opacity: 0.7,
  },
});

export default Cardpet;
