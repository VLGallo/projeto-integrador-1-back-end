import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TelaHome = () => {
  const navigation = useNavigation();

  const entrarTelaPedido = () => {
    navigation.navigate('TelaPedido'); // Navega para a tela de pedido
  };

  const entrarTelaAtribuicao = () => {
    navigation.navigate('TelaAtribuicao'); 
  };

  const entrarTelaCadastro = () => {
    navigation.navigate('TelaCadastro'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {/* Adicionando a imagem */}
        <Image 
          source={require('../../assets/images/imagem-home.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.rightContainer}>
        {/* Adicionando os botões */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={entrarTelaPedido} style={styles.button}>
          <Text style={styles.buttonText}>Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={entrarTelaAtribuicao} style={styles.button}>
          <Text style={styles.buttonText}>Atribuição</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.button}>
          <Text style={styles.buttonText}>Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={entrarTelaCadastro} style={styles.button}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#B20000' }]}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#015500',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaHome;

