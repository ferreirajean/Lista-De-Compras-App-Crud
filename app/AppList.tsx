import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import AppItem from './AppItem';
import Database from './Database';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  AppList: undefined;
  AppForm: { id?: number; descricao?: string; quantidade?: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AppList'>;

interface Item {
  id: number;
  descricao: string;
  quantidade: number;
}

export default function AppList({ route, navigation }: Props) {
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = async () => {
    try {
      const storedItems = await Database.getItems();
      
      const uniqueItems = storedItems.reduce((acc: Item[], current) => {
      
        const existingIndex = acc.findIndex(item => 
          item.descricao.toLowerCase() === current.descricao.toLowerCase()
        );

        if (existingIndex >= 0) {
        
          acc[existingIndex].quantidade += current.quantidade;
        } else {
        
          acc.push(current);
        }
        return acc;
      }, []);

      setItems(uniqueItems);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadItems);
    loadItems();

    return unsubscribe;
  }, [navigation, route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {items.map((item) => (
          <AppItem
            key={`${item.id}_${item.descricao}`}
            id={item.id}
            descricao={item.descricao}
            quantidade={item.quantidade}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D93600",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});