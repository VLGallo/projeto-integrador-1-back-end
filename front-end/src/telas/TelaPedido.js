import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaPedido = () => {
    const navigation = useNavigation();

    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [itens, setItens] = useState([]);

    // Array de clientes
    const clientes = ['Cliente A', 'Cliente B', 'Cliente C']; // Mockado - excluir quando inserir banco de dados

    // Botao salvar
    const handleSalvar = () => {
        console.log('Cliente:', clienteSelecionado);
        console.log('Endereço:', endereco);
        console.log('Telefone:', telefone);
    };

    // Botao cancelar
    const handleCancelar = () => {
        // Limpar os campos
        setEndereco('');
        setTelefone('');
    };

    // Navegacao
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

    // Adicionar e remover itens
    const adicionarItem = () => {
        setItens([...itens, '']);
    };

    const removerItem = (index) => {
        const novosItens = [...itens];
        novosItens.splice(index, 1);
        setItens(novosItens);
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
                    <Text style={[styles.textPedido, { fontSize: 40 }]}>Pedidos</Text>
                    <Image
                        source={require('../../assets/images/pizza.png')}
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

                <View>
                    <Text style={styles.label}>Cliente</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={clienteSelecionado}
                        onValueChange={(itemValue, itemIndex) =>
                            setClienteSelecionado(itemValue)
                        }>
                        {clientes.map((c, index) => (
                            <Picker.Item key={index} label={c} value={c} />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTelefone}
                />
                <View>
                    <Text style={styles.label}>Itens</Text>
                    {itens.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                value={item}
                                onChangeText={(texto) => {
                                    const novosItens = [...itens];
                                    novosItens[index] = texto;
                                    setItens(novosItens);
                                }}
                            />
                            <TouchableOpacity onPress={() => removerItem(index)} style={{marginLeft:10}}>
                                <Image source={require('../../assets/images/Minus.png')} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={adicionarItem}>
                            <Image source={require('../../assets/images/More.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
        marginTop: 50,
    },
    image: {
        width: 80,
        height: 100,
    },
    textPedido: {
        fontWeight: 'bold',
        color: '#B20000',
        textAlign: 'center',
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
        justifyContent: 'center',
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
        justifyContent: 'center',
        marginBottom: 20,
    },
});

export default TelaPedido;
