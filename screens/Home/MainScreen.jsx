import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const MainScreen = () => {
  const navigation = useNavigation();

  const [showButtons, setShowButtons] = useState(false);
  const [buttonOpacity] = useState(new Animated.Value(0));

  const GetToken = async () => {
    try {
      const value = await AsyncStorage.getItem("TokenJWT");
      console.log("el token es:" + value);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        theme: "dark",
        textBody: "Login Exitoso!",
      });
      if (!value) {
        navigation.navigate("Login");
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      throw error;
    }
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
    animatebtn();
  };

  const animatebtn = () => {
    Animated.timing(buttonOpacity, {
      toValue: showButtons ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    GetToken();
  }, []);

  return (
    <AlertNotificationRoot theme="dark">
      <View style={styles.container}>
        <TouchableOpacity style={styles.post} onPress={toggleButtons}>
          <Ionicons name="add" size={48} color="white" />
        </TouchableOpacity>
        <Animated.View
          style={[styles.smallButtonsContainer, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.smallButton}>
            <MaterialCommunityIcons name="pencil" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <MaterialCommunityIcons name="shopping" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <MaterialCommunityIcons name="dog" size={24} color={"white"} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  post: {
    width: 70,
    minHeight: 70,
    backgroundColor: "green",
    position: "absolute",
    bottom: 40,
    right: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  smallButtonsContainer: {
    position: "absolute",
    bottom: 140,
    right: 30,
    display: "flex",
    flexDirection: "column",
    gap: 50,
  },
  smallButton: {
    width: 50,
    height: 50,
    backgroundColor: "green",
    marginLeft: 10,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
