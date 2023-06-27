// Essentials

import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import Cardpet from "../../components/Cardpet";

// Components

import { UserContext } from "../../UserContext";
import { ProgressBar } from "react-native-paper";

// Assets

import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Profile = () => {
  const { userData } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.seguidores}>
        <View style={styles.left}>
          <View style={styles.main}>
            <Image
              style={{
                width: 80,
                height: 80,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/img/dog.jpeg")}
            />
            <View style={styles.follows}>
              <Text>Seguidores: 1900</Text>
              <Text>Seguidos: 200</Text>
              <Text>{userData.username}</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Entypo name="instagram-with-circle" size={48} color="green" />
              <Entypo name="twitter-with-circle" size={48} color="green" />
              <Entypo name="youtube-with-circle" size={48} color="green" />
            </View>
          </View>
          <View>
            <Text>Nivel 1</Text>
            <ProgressBar progress={0.5} color="green" />
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.subright1}>
            <SimpleLineIcons name="badge" size={38} color="orange" />
            <MaterialCommunityIcons
              name="police-badge-outline"
              size={38}
              color="orange"
            />
            <Foundation name="sheriff-badge" size={38} color="orange" />
          </View>
          <View style={styles.subright2}>
            <SimpleLineIcons name="badge" size={38} color="orange" />
            <MaterialCommunityIcons
              name="police-badge-outline"
              size={38}
              color="orange"
            />
            <Foundation name="sheriff-badge" size={38} color="orange" />
          </View>
        </View>
      </View>
      <View style={styles.informacion}>
        <Cardpet name="Luna" owner="JuampaVLB" />
        <Cardpet name="Oddy" owner="JuampaVLB" />
        <Cardpet name="Bella" owner="JuampaVLB" />
        <View style={styles.muro}></View>
        <TextInput style={styles.input} placeholder="Responder..." />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  seguidores: {
    width: "100%",
    flex: 1,
    maxHeight: "40%",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  left: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    paddingLeft: 15,
  },
  main: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  follows: {
    display: "flex",
    height: 100,
    justifyContent: "space-around",
  },
  right: {
    width: "50%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignContent: "center",
    height: "100%",
    paddingRight: 15,
  },
  subright1: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
  },
  subright2: {
    display: "flex",
    gap: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },
  informacion: {
    width: "100%",
    maxHeight: "55%",
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "gray",
  },
  muro: {
    width: "80%",
    maxHeight: "70%",
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    display: "none",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "80%",
    backgroundColor: "white",
    display: "none",
  },
});

export default Profile;
