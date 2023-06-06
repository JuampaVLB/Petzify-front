import React, { useEffect, useState } from "react";

import { SafeAreaView, Text, View, StyleSheet, Button } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

const Loader = (props) => {
  const startLoading = () => {
    props.setEstado(true);
    setTimeout(() => {
      props.setEstado(false);
    }, 2500);
  };

  useEffect(() => {
    startLoading();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Spinner
          visible={props.estado}
          textContent={"Cargando Comentarios..."}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    padding: 8,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default Loader;
