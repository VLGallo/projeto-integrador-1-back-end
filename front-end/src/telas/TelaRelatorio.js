import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import Template from "../components/TemplatePrincipal";
import axios from "axios";
import { Accordion, List } from "react-native-paper";

const TelaHome = () => {
  const [motoboys, setMotoboys] = useState([]);
  const [pedidosDoDia, setPedidosDoDia] = useState([]);
  const [carregandoMotoboys, setCarregandoMotoboys] = useState("");
  const [carregandoPedidosDoDia, setCarregandoPedidosDoDia] = useState("");

  useEffect(() => {
    const carregarMotoboys = async () => {
      try {
        const response = await axios.get("http://localhost:8000/motoboy");
        setMotoboys(response.data);
        setCarregandoMotoboys(false);
      } catch (error) {
        console.log(error);
      }
    };

    carregarMotoboys();
  }, []);

  useEffect(() => {
    const carregarPedidosDoDia = async () => {
        try {
            let pedidosDia = [];
            for (let i = 0; i < motoboys.length; i++) {
                const response = await axios.get(
                    "http://localhost:8000/pedido/motoboy/" + motoboys[i].id
                );
                // Verifique se o vetor retornado não está vazio
                if (response.data.length > 0) {
                    pedidosDia.push(response.data);
                }
            }

            setPedidosDoDia(pedidosDia);
            setCarregandoPedidosDoDia(false);
        } catch (error) {
            console.log(error);
        }
    };

    carregarPedidosDoDia();
}, []); // Certifique-se de passar um array vazio como segundo argumento para useEffect para garantir que ele só execute uma vez


  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <View style={styles.tituloContainer}>
        <Text style={[styles.textPedido, { fontSize: 40 }]}>
          Relatório de Entregas
        </Text>
        <Image
          source={require("../../assets/images/pizza.png")}
          style={[styles.image, styles.posicaoImage]}
          resizeMode="contain"
        />
      </View>

      {!carregandoPedidosDoDia &&
        pedidosDoDia.map((pedido, index) => (
          <Accordion key={index} title={`Motoboy ${pedido}`}>
            <List.Accordion>
              {pedido.map((pedidoItem, subIndex) => (
                <List.Item
                  key={subIndex}
                  title={`Pedido ${pedidoItem.id}`}
                  description={`Produtos: ${pedidoItem.produtos.length}`}
                />
              ))}
            </List.Accordion>
          </Accordion>
        ))}
    </Template>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 100,
  },
  textPedido: {
    fontWeight: "bold",
    color: "#B20000",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 5,
    width: "100%",
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
  posicaoImage: {
    marginLeft: 20,
  },
  menuSuperior: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  menuButton: {
    backgroundColor: "#015500",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  menuButtonText: {
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
});

export default TelaHome;
