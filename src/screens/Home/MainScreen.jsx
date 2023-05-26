import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   ALERT_TYPE,
//   AlertNotificationRoot,
//   Toast,
// } from "react-native-alert-notification";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { ScrollView as GestureScrollView } from "react-native-gesture-handler";

import { authApi } from "../../api/auth";
import Post from "../../components/Post";

const MainScreen = () => {
  const navigation = useNavigation();
  const [showButtons, setShowButtons] = useState(false);
  const [buttonOpacity] = useState(new Animated.Value(0));

  const GetToken = async () => {
    try {
      const value = await AsyncStorage.getItem("TokenJWT");

      let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": value,
      };

      authApi
        .get("/profile", {
          headers,
        })
        .then((res) => {
          // setUsername(res.data.user.username);
          // navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
          navigation.navigate("Login");
        });
    } catch (error) {
      navigation.navigate("Login");
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

  const [modalVisible, setModalVisible] = useState(false);

  const postCount = 3;

  const scrollViewRef = useRef(null);

  return (
    // <AlertNotificationRoot theme="dark">

    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        ref={scrollViewRef}
        snapToInterval={680}
        decelerationRate="fast"
      >
        {[...Array(postCount)].map((_, index) => (
          <Post
            key={index}
            imageURL="run"
            title="Titulo re copado"
            index={index}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.post} onPress={toggleButtons}>
        <Ionicons name="add" size={48} color="white" />
      </TouchableOpacity>
      <Animated.View
        style={[styles.smallButtonsContainer, { opacity: buttonOpacity }]}
      >
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="pencil" size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <MaterialCommunityIcons name="shopping" size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <MaterialCommunityIcons name="dog" size={24} color={"white"} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>

    // </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
  },
  scroll: {
    flex: 1,
    minHeight: "100%",
  },
  post: {
    width: 70,
    minHeight: 70,
    backgroundColor: "green",
    position: "absolute",
    bottom: 100,
    right: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  smallButtonsContainer: {
    position: "absolute",
    bottom: 200,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "85%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MainScreen;
