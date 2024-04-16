import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Picker } from 'react-native'; // Importe Picker
import { useNavigation } from '@react-navigation/native';

const TelaAtribuicao = () => {
    const navigation = useNavigation();

    const [pedido, setPedido] = useState('');
    const [motoboy, setMotoboy] = useState('');
    const [pedidos, setPedidos] = useState([]);

    const handleAtribuicao = () => {
        // Aqui você pode implementar a lógica para salvar os dados
    };
    
    const handleCancelar = () => {
        // Limpa os campos
        setPedido('');
        setMotoboy('');
        setPedidos([]);
    };

    const adicionarPedido = () => {
        setPedidos([...pedidos, '']);
    };

    const removerPedido = (index) => {
        const novosPedidos = [...pedidos];
        novosPedidos.splice(index, 1);
        setPedidos(novosPedidos);
    };

    const entrarTelaHome = () => {
        navigation.navigate('TelaHome');
    };

    const entrarTelaPedido = () => {
        navigation.navigate('TelaPedido');
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
                    <Text style={[styles.textPedido, { fontSize: 40 }]}> Atribuição de Pedidos</Text> {/* Aumentando o tamanho da fonte */}
                    <Image
                        source={require('../../assets/images/atribuicaoIcone.png')}
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

       
                {/* Campos de pedidos */}
                <Text style={styles.label}>Pedidos</Text>
                {pedidos.map((pedido, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            value={pedido}
                            onChangeText={(texto) => {
                                const novosPedidos = [...pedidos];
                                novosPedidos[index] = texto;
                                setPedidos(novosPedidos);
                            }}
                        />
                        <TouchableOpacity onPress={() => removerPedido(index)} style={{marginLeft:10}}>
                            <Image source={require('../../assets/images/Minus.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={adicionarPedido}>
                        <Image source={require('../../assets/images/More.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Motoboy</Text>
                <Picker
                    selectedValue={motoboy}
                    onValueChange={(itemValue, itemIndex) => setMotoboy(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Selecione um motoboy" value="" />
                    <Picker.Item label="Motoboy 1" value="Motoboy 1" />
                    <Picker.Item label="Motoboy 2" value="Motoboy 2" />
                    <Picker.Item label="Motoboy 3" value="Motoboy 3" />
                    {/* Adicione mais itens conforme necessário */}
                </Picker>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={handleAtribuicao}>
                        <Text style={styles.buttonText}>Atribuir</Text>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: '#fff',
        overflowY: 'auto', // Habilita a rolagem vertical
        height: '100vh', // Define a altura do container para ocupar toda a altura da tela
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

export default TelaAtribuicao;
