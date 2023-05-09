import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {

  const navigation = useNavigation();

  const GetToken = async () => {
    try {
      const value = await AsyncStorage.getItem('TokenJWT');
      console.log("el token es:" + value);
      if(!value) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }

    } catch (error) {
      throw error;
    }
  }

  GetToken();

  return (
    <View>
        <Text
        style={{
          alignSelf: "center",
          fontSize: 32,
          marginTop: "40%"
        }}
        >
            MainScreen
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default MainScreen
