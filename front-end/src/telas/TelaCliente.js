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
import CustomModal from "../components/CustomModal";
import axios from "axios";

const TelaCliente = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");

  const handleSalvar = async () => {
    try {
      const response = await axios.post("https://zerissi.azurewebsites.net/cliente/add", {
        nome,
        telefone,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
      });

      if (response.status === 201) {
        setModalVisible(true);
        // Limpar os campos após o sucesso
        setNome("");
        setTelefone("");
        setCep("");
        setLogradouro("");
        setNumero("");
        setComplemento("");
        setBairro("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelar = () => {
    // Limpar os campos ao cancelar
    setNome("");
    setTelefone("");
    setCep("");
    setLogradouro("");
    setNumero("");
    setComplemento("");
    setBairro("");
  };

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalText="Cliente cadastrado com sucesso"
      />

      <View style={styles.tituloContainer}>
        <Text style={[styles.textPedido, { fontSize: 60, fontWeight: "bold" }]}>
          Cadastro de Clientes
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>
          <View>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
            />
          </View>
          <View>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              value={cep}
              onChangeText={setCep}
            />
          </View>
          <View>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Complemento</Text>
              <TextInput
                style={styles.input}
                value={complemento}
                onChangeText={setComplemento}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={[styles.button, { marginRight: 10 }]}
              onPress={handleSalvar}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "#B20000" }]}
              onPress={handleCancelar}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={[styles.image, { width: 440, height: 440 }]}
            resizeMode="contain"
          />
        </View>
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    width: "80%",
  },
  button: {
    backgroundColor: "#015500",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  textPedido: {
    fontFamily: "Impact",
    color: "rgb(178, 0, 0)",
  },
});

export default TelaCliente;
