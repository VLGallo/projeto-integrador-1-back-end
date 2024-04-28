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
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <View>
        <Text>Toma</Text>
      </View>
    </Template>
  );
};

export default TelaHome;
