import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
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
import io from "socket.io-client";
import { authApi } from "../../api/auth";
import Post from "../../components/Post";
import { postApi } from "../../api/post";
import ModalPost from "../../components/ModalPost";

const MainScreen = () => {
  const socket = io("http://192.168.0.2:5000");
  const navigation = useNavigation();

  const [userdata, setUserdata] = useState({});
  const [posts, setPosts] = useState([]);
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
          setUserdata(res.data.user);
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

  const fetchPosts = async () => {
    try {
      const response = await postApi.get("/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    }
  };

  useEffect(() => {
    GetToken();

    fetchPosts();
  }, []);


  useEffect(() => {
    socket.on("server:loadposts", () => {
      fetchPosts();
    });

    fetchPosts();
  }, []);
   

  socket.on("server:loadposts", () => {
    fetchPosts();
  });

  const [modalVisible, setModalVisible] = useState(false);

  const postCount = 3;

  const scrollViewRef = useRef(null);

  const { height } = Dimensions.get("window");

  return (
    // <AlertNotificationRoot theme="dark">

    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        ref={scrollViewRef}
        snapToInterval={height - 50 - 60}
        decelerationRate="fast"
      >
        {posts.map((post, index) => (
          <Post
          key={post._id}
          imageURL="run"
          username={post.username}
          title={post.title}
          desc={post.desc}
          index={posts.length === (index+1) ? true : false}
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
        <ModalPost estado={modalVisible} setEstado={setModalVisible} />
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
});

export default MainScreen;
