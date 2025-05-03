import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Database from './Database';
import { Feather as Icon } from '@expo/vector-icons';

interface AppFormProps {
  route: {
    params?: {
      id?: number;
      descricao?: string;
      quantidade?: number;
    };
  };
  navigation: any;
}

export default function AppForm({ route, navigation }: AppFormProps) {
  const id = route?.params?.id;
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  /*useEffect(() => {
    if (id && route.params?.id) {
      setDescricao(route?.params?.descricao || '');
      setQuantidade(route?.params?.quantidade?.toString() || '');
    }
  }, [route, id]);*/

  async function handleButtonPress() {
    if (!descricao.trim() || !quantidade.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const listItem = {
      id: id || new Date().getTime(),
      descricao: descricao.trim(),
      quantidade: parseInt(quantidade) || 0,
    };

    try {
      await Database.saveItem(listItem, id);
      navigation.navigate("AppList", { refresh: true });
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
      Alert.alert('Erro', 'Não foi possível salvar o item');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setDescricao}
        placeholder="O que está faltando em casa?"
        clearButtonMode="always"
        value={descricao}
      />
      <TextInput
        style={styles.input}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        clearButtonMode="always"
        value={quantidade}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <View style={styles.buttonContainer}>
          <Icon name="save" size={22} color="white" />
          <Text style={styles.buttonText}>Salvar</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});