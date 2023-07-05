import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import pet from "../../assets/img/dog.jpeg";

const Cardpet = (props) => {


  return (
    <TouchableOpacity style={styles.container}>
      <Image source={pet} style={styles.image_pet} />
      <View style={styles.info}>
        <Text style={styles.pet_text}>Rocko</Text>
        <Text style={styles.owner_text}>Maxi</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 15,
    padding: 10,
    backgroundColor: "#73A073",
    borderRadius: 10,
    borderWidth: 2,
  },
  image_pet: {
    borderWidth: 2,
    borderColor: "black",
    width: 88,
    height: 88,
    borderRadius: 50,
  },
  info: {},
  pet_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#fff",
  },
  owner_text: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    opacity: 0.7,
  },
});

export default Cardpet;
