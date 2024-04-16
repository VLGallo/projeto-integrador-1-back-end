import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const TelaLogin = () => {
  const navigation = useNavigation();

  const entrarTelaHome = () => {
    navigation.navigate('TelaHome');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.halfContainer, { backgroundColor: '#B20000' }]}>
        <Image
        source={require('../../assets/images/fundo-sombra.png')}
        style={styles.image}
        />
      </View>
      <View style={[styles.halfContainer, { backgroundColor: 'white' }]}>
        <View style={styles.rightHalfContent}>
          <Text style={styles.text}> Login </Text>
          <TextInput style={styles.input} placeholder="Usuário" />
          <TextInput style={styles.input} placeholder="Senha" />
          <TouchableOpacity onPress={entrarTelaHome} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Imagem no centro */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={[styles.imageLogo, styles.centerImage]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  halfContainer: {
    flex: 1,
  },
  rightHalfContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'LuckiestGuy',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#015500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  centerImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -200 }, { translateY: -10 }],
    width: 300, 
    height: 300, 
  },
});

export default TelaLogin;