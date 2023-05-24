import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";

import profile from "../../assets/img/dog.jpeg";
import dog from "../../assets/img/run.webp";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Post(props) {
  
  return (
    <View style={styles.container}>
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
            <Text style={styles.text}>@Petzify-App</Text>
          </View>
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </View>
        <Image source={dog} style={styles.image} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.desc}>
          <View style={styles.desc_info}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              {props.title}
            </Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 15, marginRight: 10 }}>
              <AntDesign name="like2" size={24} color="black" />
              <Feather name="send" size={24} color="black" />
              <FontAwesome name="bookmark-o" size={24} color="black" />
            </View>
          </View>
          <Text style={{ marginTop: 15 }}>
            Hola a todos! Soy Juancito, un perrito negro sin raza definida, pero
            eso no importa porque lo imporatante es que soy muy amigable y me
            encanta hacer amigos.
          </Text>
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
            <Image source={profile} style={styles.imageProfile} />
            <Text style={styles.text}>@Petzify-App</Text>
          </View>
          <TextInput
            style={{ marginTop: 10, marginLeft: 45 }}
            placeholder="Comentar..."
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: "30%",
    width: "100%",
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
});
