import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, alert } from "react-native";

import ModalPet from "../../components/ModalPet";

const MyPet = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 32,
          marginTop: "40%",
        }}
      >
        My Pet
      </Text>
      <TouchableOpacity
        style={styles.add}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 32, color: "white" }}>+</Text>
      </TouchableOpacity>
      <View>
        <ModalPet setEstado={setModalVisible} estado={modalVisible} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    position: "relative",
  },
  add: {
    position: "absolute",
    right: 0,
    bottom: 100,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "green",
  },
});

export default MyPet;
