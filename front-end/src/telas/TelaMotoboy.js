import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Card,
  CardContent,
} from "@mui/material";

const useStyles = makeStyles({
  container: {
    marginTop: 20,
    overflowX: "auto",
    backgroundColor: "#B20000",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
    flex: 1,
  },
  card: {
    backgroundColor: "#eee",
    marginTop: 10,
  },
});

const TelaMotoboy = () => {
  const classes = useStyles();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/pedido/motoboy/12")
      .then((response) => response.json())
      .then((data) => setPedido(data))
      .catch((error) => console.error("Erro ao buscar pedido:", error));
  }, []);

  return (
    <Container maxWidth="sm" className={classes.container}>
      {pedido?.pedidos.map((item) => (
        <Card variant="outlined" key={item.id} className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.itemTitle}>
              Pedido {item.id}
            </Typography>
            <Typography variant="subtitle1" className={classes.itemSubtitle}>
              Itens:
            </Typography>
            <List dense>
              {item.produtos.map((produto) => (
                <ListItem key={produto.id}  sx={{ marginTop:0, marginBottom: 0, marginLeft: "16px" }}>
                  <ListItemText>
                    <Typography variant="body2">• {produto.nome}</Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Typography variant="subtitle1" className={classes.itemSubtitle}>
              Cliente:
            </Typography>
            <Typography variant="body2">{item.cliente}</Typography>
            <Typography variant="subtitle1" className={classes.itemSubtitle}>
              Endereço:
            </Typography>
            <Typography variant="body2">{item.endereco}</Typography>
            <Typography variant="subtitle1" className={classes.itemSubtitle}>
              Telefone:
            </Typography>
            <Typography variant="body2">{item.telefone}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default TelaMotoboy;
