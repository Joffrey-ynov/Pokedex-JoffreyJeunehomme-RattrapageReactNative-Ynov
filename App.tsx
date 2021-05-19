import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";

// COMPONENTS
import Pokedex from './src/Pokedex';
import Liked from './src/Liked';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pokedex">
          <Stack.Screen name="Pokedex" component={Pokedex} />
          <Stack.Screen name="Liked Pokemons" component={Liked} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
<View style={styles.container}>
  <Text>Open up App.tsx to start working on your app!</Text>
  <StatusBar style="auto" />
</View>
*/

/*
<SafeAreaView style={styles.container}>
  <Text>Open up App.tsx to start working on your app!</Text>
  <StatusBar style="auto" />
</SafeAreaView>
*/