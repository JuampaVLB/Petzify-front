import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MapView from 'react-native-maps';


const MapScreen = () => {
  
  const [search, setSearch] = useState("");

  const [origin, setOrigin] = useState({
    latitute: -34.6037345,
    longitude: -58.3841507
  });
  
  return (
    <View>
        <TextInput
          style={styles.input}
          placeholder="Buscar Lugar"
          defaultValue={search}
          onChangeText={(newText) => setSearch(newText)}
        />
        
       <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: origin.latitute,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        />
      
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
  input: {
    alignSelf: "center",
    position: "absolute",
    top: 0,
    zIndex: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: "80%",
    backgroundColor: "white",
  },
});

export default MapScreen
