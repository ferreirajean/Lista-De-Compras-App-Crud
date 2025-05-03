import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Feather as Icon, Ionicons } from "@expo/vector-icons";
import Database from "./Database";

interface AppItemProps {
  id: number;
  descricao: string;
  quantidade: number;
  navigation: {
    navigate: (screen: string, params: any) => void;
  };
}

export default function AppItem({
  id,
  descricao,
  quantidade,
  navigation,
}: AppItemProps) {
  async function handleEditPress() {
    const item = await Database.getItem(id);
    if (item) {
      navigation.navigate("AppForm", item);
    }
  }

  function handleDeletePress() {
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja excluir este item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await Database.deleteItem(id);
            navigation.navigate("AppList", { refresh: true });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.descricao}>{descricao}</Text>
        <Text style={styles.quantidade}>Quantidade: {quantidade}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleEditPress}
          style={[styles.button, styles.editButton]}
        >
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeletePress}
          style={[styles.button, styles.deleteButton]}
        >
          <Ionicons name="trash" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  textContainer: {
    flex: 1,
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantidade: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
  editButton: {
    backgroundColor: "#007AFF", // Azul
  },
  deleteButton: {
    backgroundColor: "#FF3B30", // Vermelho
  },
});
