import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ProgressBarAndroid,
} from "react-native";

const Profile = () => {
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
              <Text>Institucion</Text>
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
              <Image
                style={{
                  width: 48,
                  height: 48,
                  marginBottom: 15,
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 100,
                }}
                source={require("../../../assets/img/dog.jpeg")}
              />
              <Image
                style={{
                  width: 48,
                  height: 48,
                  marginBottom: 15,
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 100,
                }}
                source={require("../../../assets/img/dog.jpeg")}
              />
              <Image
                style={{
                  width: 48,
                  height: 48,
                  marginBottom: 15,
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 100,
                }}
                source={require("../../../assets/img/dog.jpeg")}
              />
            </View>
            <Text>Nivel 1</Text>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={0.6}
            />
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.subright1}>
            <Image
              style={{
                width: 48,
                height: 48,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/favicon.png")}
            />
            <Image
              style={{
                width: 48,
                height: 48,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/favicon.png")}
            />
            <Image
              style={{
                width: 48,
                height: 48,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/favicon.png")}
            />
          </View>
          <View style={styles.subright2}>
            <Image
              style={{
                width: 48,
                height: 48,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/favicon.png")}
            />
            <Image
              style={{
                width: 48,
                height: 48,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/favicon.png")}
            />
            <Image
              style={{
                width: 48,
                height: 48,
                marginBottom: 15,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
              }}
              source={require("../../../assets/favicon.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.informacion}>
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
    justifyContent: "center",
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
    justifyContent: "space-between",
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
    justifyContent: "center",
    gap: 15,
  },
  subright2: {
    display: "flex",
    gap: 15,
    justifyContent: "center",
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
    backgroundColor: "#fff",
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "80%",
    backgroundColor: "white",
  },
});

export default Profile;
