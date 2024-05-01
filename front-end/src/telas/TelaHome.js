import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import Template from "../components/TemplatePrincipal";

const TelaHome = () => {
  return (
    <Template imagem={"../../assets/images/imagem-home.jpg"}>
      <View style={styles.tituloContainer}>
        <Text style={[styles.textPedido, { fontSize: 60 }]}>
          Gestão de Entregas
        </Text>
        <View style={{height:'80vh'}}></View>
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  textPedido: {
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Impact",
  },
  tituloContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", 
    marginBottom: 20,
  },
});
export default TelaHome;
