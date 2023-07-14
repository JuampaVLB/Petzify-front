import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   ALERT_TYPE,
//   AlertNotificationRoot,
//   Toast,
// } from "react-native-alert-notification";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../UserContext";
import socket from "../../sockets";
import { authApi } from "../../api/auth";
import AwesomeButton from "react-native-really-awesome-button";
import Post from "../../components/Post";
import { postApi } from "../../api/post";
import ModalPost from "../../components/ModalPost";
import SwitchSelector from "react-native-switch-selector";

// Assets

import Empty from "../../../assets/img/empty.png";

const MainScreen = () => {
  // https://petzify.up.railway.app/
  // http://192.168.0.2:5000

  const navigation = useNavigation();

  const { setUserData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  // const [showButtons, setShowButtons] = useState(false);
  const [category, setCategory] = useState("");
  // const [buttonOpacity] = useState(new Animated.Value(0));

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
          setUserData(res.data.user);
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

  // const toggleButtons = () => {
  //   setShowButtons(!showButtons);
  //   animatebtn();
  // };

  // const animatebtn = () => {
  //   Animated.timing(buttonOpacity, {
  //     toValue: showButtons ? 1 : 0,
  //     duration: 100,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const fetchPosts = async () => {
    try {
      const response = await postApi.get("/all/post");
      setPosts(response.data);
      // console.log(response.data.image);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    }
  };

  useEffect(() => {
    GetToken();

    fetchPosts();
  }, []);

  // useEffect(() => {
  //   socket.on("server:loadposts", () => {
  //     fetchPosts();
  //   });

  //   fetchPosts();
  // }, []);

  socket.on("server:loadposts", () => {
    fetchPosts();
  });

  const [modalVisible, setModalVisible] = useState(false);

  const scrollViewRef = useRef(null);

  const { height } = Dimensions.get("window");

  const [reversedPosts, setReversedPosts] = useState([]);

  useEffect(() => {
    console.log("len: " + posts.length);
    setReversedPosts(posts.slice().reverse());
    console.log(posts);
  }, [posts]);

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <SwitchSelector
          initial={0}
          onPress={(value) => setCategory(value)}
          textColor={"#73A073"}
          selectedColor={"#fff"}
          buttonColor={"#73A073"}
          borderColor={"#73A073"}
          style={styles.switch}
          hasPadding
          height={30}
          options={[
            { label: "Seguidos", value: "follows" }, //images.feminino = require('./path_to/assets/img/feminino.png')
            { label: "Otros", value: "other" }, //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
          testID="posts-switch-selector"
          accessibilityLabel="posts-switch-selector"
        />
      </View>
      {posts.length > 0 ? (
        <ScrollView
          style={styles.scroll}
          ref={scrollViewRef}
          snapToInterval={height - 50 - 60}
          decelerationRate="fast"
        >
          {category != "other" ? (
            reversedPosts.map((post, index) => (
              <Post
                key={post._id}
                imageURL="run"
                username={post.username}
                title={post.title}
                desc={post.desc}
                index={reversedPosts.length === index + 1 ? true : false}
                room={post.room}
                image={post.image}
              />
            ))
          ) : (
            <View style={styles.empty_container}>
              <Image source={Empty} style={styles.image} />
              <Text style={{ color: "#ccc", fontWeight: "bold" }}>
                Parece que no seguimos a nadie...
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.empty_container}>
          <Image source={Empty} style={styles.image} />
          <Text style={{ color: "#ccc", fontWeight: "bold" }}>
            Parece que no seguimos a nadie...
          </Text>
        </View>
      )}  
      {/* <AwesomeButton>Text</AwesomeButton> */}
      <TouchableOpacity
      style={styles.post}
      onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={48} color="white" />
      </TouchableOpacity>
      {/* 
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
      */}
      <View style={styles.centeredView}>
        <ModalPost estado={modalVisible} setEstado={setModalVisible} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "white",
  },
  category: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
  },
  switch: {
    width: 250,
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
    bottom: 130,
    right: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  smallButtonsContainer: {
    position: "absolute",
    bottom: 230,
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
  empty_container: {
    width: "100%",
    height: 750,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
  },
});

export default MainScreen;
