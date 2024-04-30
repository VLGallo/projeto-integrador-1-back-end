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
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TelaHome = () => {
  const [motoboys, setMotoboys] = useState([]);
  const [pedidosDoDia, setPedidosDoDia] = useState([]);
  const [carregandoMotoboys, setCarregandoMotoboys] = useState(false);
  const [carregandoPedidosDoDia, setCarregandoPedidosDoDia] = useState("");

  useEffect(() => {
    const carregarPedidosDoDia = async () => {
      try {
        setCarregandoMotoboys(true);

        const response = await axios.get(
          "http://localhost:8000/pedido/motoboy/"
        );

        setPedidosDoDia(response.data);
        console.log(response.data);
        setCarregandoPedidosDoDia(false);
      } catch (error) {
        console.log(error);
      }
    };

    carregarPedidosDoDia();
  }, []);

  return (
    <Template imagem={"../../assets/images/bg-opaco.png"}>
      <View style={styles.tituloContainer}>
        <Text style={[styles.textPedido, { fontSize: 60 }]}>
          Relatório de Entregas
        </Text>
        <Image
          source={require("../../assets/images/pizza.png")}
          style={[styles.image, styles.posicaoImage]}
          resizeMode="contain"
        />
      </View>
  
      {!carregandoPedidosDoDia && (
        <View style={styles.container}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Motoboy</TableCell>
                  <TableCell>Pedido</TableCell>
                  <TableCell>Finalização</TableCell>
                  <TableCell>Qtd de Pedidos Entregues</TableCell> {/* Nova coluna */}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(pedidosDoDia).map((motoboyId) => (
                  <TableRow key={motoboyId}>
                    <TableCell>
                      {pedidosDoDia[motoboyId].motoboy.nome}
                    </TableCell>
                    <TableCell>
                      <ul>
                        {pedidosDoDia[motoboyId].pedidos.map((pedido) => (
                          <li key={pedido.id}>{pedido.id}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <ul>
                        {pedidosDoDia[motoboyId].pedidos.map((pedido) => (
                          <li key={pedido.id}>
                            {pedido.data_hora_finalizacao
                              ? new Date(
                                  pedido.data_hora_finalizacao
                                ).toLocaleString()
                              : "-"}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell> {/* Nova célula */}
                      {pedidosDoDia[motoboyId].pedidos.length} {/* Calcula a quantidade de pedidos */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </View>
      )}
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
    fontFamily: "Impact",
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
