import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

  const navigation = useNavigation();

  return (
    <View>
        <Text
        style={{
          alignSelf: "center",
          fontSize: 32,
          marginTop: "40%"
        }}
        >
            Register
        </Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
          backgroundColor: "purple",
          padding: 10,
          marginTop: "20%",
          width: "50%",
          alignSelf: "center",
          borderRadius: 10,
        }}
        >
          <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: "white",
          }}
          >Ya tengo cuenta!</Text>
        </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen