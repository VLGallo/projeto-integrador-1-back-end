import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaCadastro = () => {
    const navigation = useNavigation();

    const [nome, setnome] = useState('');
    const [telefone, settelefone] = useState('');
    const [placa, setplaca] = useState('');

    const handleSalvar = () => {
        // Aqui você pode implementar a lógica para salvar os dados

    };

    const handleCancelar = () => {
        // Limpar os campos
        setnome('');
        settelefone('');
        setTelefone('');
    };

    const entrarTelaHome = () => {
        navigation.navigate('TelaHome'); // Navega para a tela de pedido
    };

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
        <View style={styles.containerPrincipal}>
            {/* Menu superior */}
            <View style={styles.menuSuperior}>
                <TouchableOpacity onPress={entrarTelaHome} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={entrarTelaPedido} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={entrarTelaAtribuicao} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Atribuição</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Relatório</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={entrarTelaCadastro} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Cadastro</Text>
                </TouchableOpacity>
            </View>

            {/* Conteúdo do pedido */}
            <View style={styles.containerSecundario}>
                <View style={styles.tituloContainer}>
                    <Text style={[styles.textPedido, { fontSize: 40 }]}>Cadastro de Entregadores</Text> {/* Aumentando o tamanho da fonte */}
                    <Image
                        source={require('../../assets/images/cadastroMotoboy.png')}
                        style={[styles.image, styles.posicaoImage]}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ position: 'absolute', top: 100, right: 0 }}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={[styles.image, { width: 220, height: 280 }]}                
                resizeMode="contain"
            />
                </View>

                <Text style={styles.label}> Nome</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setnome}
                />
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={settelefone}
                />
                <Text style={styles.label}>Placa</Text>
                <TextInput
                    style={styles.input}
                    value={placa}
                    onChangeText={setplaca}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={handleSalvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#B20000' }]} onPress={handleCancelar}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        position: 'relative',
    },
    containerSecundario: {
        flex: 1,
        marginTop: 50,
    },
    image: {
        width: 80,
        height: 100,
    },
    textPedido: {
        fontWeight: 'bold',
        color: '#B20000',
        textAlign: 'center', // Centralizando o texto
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 5,
        width: '80%',

    },
    button: {
        backgroundColor: '#015500',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    posicaoImage: {
        marginLeft: 20,
    },
    menuSuperior: {
        flexDirection: 'row',
        justifyContent: 'center', // Centralizando os botões
        alignItems: 'center',
        marginTop: 20,
    },
    menuButton: {
        backgroundColor: '#015500',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    menuButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tituloContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centralizando os elementos dentro do container do título
        marginBottom: 20,
    },
});

export default TelaCadastro;
