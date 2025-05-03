# 🛒 SmartList - Gerenciador Inteligente de Compras

![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![AsyncStorage](https://img.shields.io/badge/AsyncStorage-5E35B1?style=for-the-badge&logo=react&logoColor=white)

## 📌 Visão Geral
Solução mobile para gestão de listas de compras com:
- ✔️ Interface intuitiva e acessível
- ✔️ Sincronização offline-first
- ✔️ Design system consistente
- ✔️ Arquitetura escalável

### 🚀 Destaques Técnicos

### 🛠️ Arquitetura
```typescript
Estrutura principal do projeto
interface AppArchitecture {
  pattern: "Modular";                     // Componentes independentes
  stateManagement: "Context API";          // Gerenciamento de estado global
  navigation: "React Navigation 6.x";      // Navegação tipo Stack + Tabs
  styling: "StyleSheet + CSS-in-JS";       // Estilos dinâmicos
}
