import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
       <View style={styles.seguidores}>
          <View style={styles.foto}>
          <Image
          style={{ width: 100, height: 100, marginBottom: 15, borderTopLeftRadius: 100,
            borderTopRightRadius: 100, borderBottomLeftRadius: 100, borderBottomRightRadius: 100,}}
          source={require("../../assets/img/dog.jpeg")}
        />
          </View>
          <Text>Seguidores:</Text>
          <Text>1900</Text>
          <Text>Seguidos:</Text>
          <Text>200</Text>
       </View>
       <View style={styles.informacion}>
         
       </View>
    </View>
  )
}

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
    maxHeight: "40%",
    backgroundColor: "#fff",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  informacion: {
    width: "100%",
    maxHeight: "55%",
    backgroundColor: "#ccc",
    flex: 1,
    resizeMode: "cover",

    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;