import React from "react";
import { View, Text, ImageBackground } from "react-native";

const PetShop = () => {
  return (
    <ImageBackground
    source={require('../../../assets/img/shop.jpeg')}
    style={{ flex: 1, marginTop: 10, }}
    >
      {/* Aquí colocas el resto de los componentes y contenido */}
    </ImageBackground>
    // <View>
    //     <Text
    //     style={{
    //       alignSelf: "center",
    //       fontSize: 32,
    //       marginTop: "40%"
    //     }}
    //     >
    //         Pet Shop
    //     </Text>
    // </View>
  );
};

export default PetShop;
