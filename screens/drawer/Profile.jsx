import React from 'react'
import { View, Text, StyleSheet, Image,TextInput } from 'react-native';

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
       <View style={styles.muro}>
         
       </View>
       <TextInput
            style={styles.input}
            placeholder="Responder..."
          />
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
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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