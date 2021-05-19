import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LikeButtonComponent from './LikeButtonComponent';


const Liked = (props: any) => {
  const { navigation } = props;

  const getPokemonLikedListData = (likedIds: any[]): any[] =>
  {
    // console.log("likedIds", likedIds);
    // POKEMONS JSON
    var pokemons = getPokemons();

    var tempLikedList: any[] = [];

    var i: number = 0;
    while (i < likedIds.length)
    {
      tempLikedList.push(pokemons[parseInt(likedIds[i])-1]);
      // console.log("pushed", pokemons[likedIds[i]+1]);
      ++i;
    }

    return (tempLikedList);
  }

  const pokemonDisplayEntries = (pokemonEntryList: any[]) =>
  {
    // console.log(pokemonEntryList);
    var pokemonDisplayList: any = [];

    var i: number = 0;
    while (i < pokemonEntryList.length)
    {
      pokemonDisplayList.push(
        <View key={i} style={styles.pokemonEntry}>
          {/* POKEMON IMAGE */}
          <View style={styles.pokImage}>
            <Image
              source={{ uri: pokemonEntryList[i].img }}
              style={{flex: 1, margin: 10}}
              resizeMode="contain"
              />
          </View>
          {/* POKEMON DETAILS */}
          <View style={styles.pokDetails}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', display: "flex", flexDirection: "row"}}>
              <Text style={{color: "#666"}}>{ pokemonEntryList[i].id }  </Text>
              <Text style={{color: "#000"}}>{ pokemonEntryList[i].name }</Text>
            </View>
            <View style={{flex: 1.5}}>
              { pokemonDisplayTypes(pokemonEntryList[i].type) }
            </View>
            {/* <View style={{display: "flex", flexDirection: "row-reverse"}}>
              <LikeButtonComponent id={pokemonEntryList[i].id} init={pokemonLikedList.includes(pokemonEntryList[i].id)} likedPokemons={pokemonLikedList}></LikeButtonComponent>
            </View> */}
          </View>
        </View>
      );
      i++;
    }

    return (pokemonDisplayList);
  }
  const pokemonDisplayTypes = (typeArray: []) =>
  {
    var ret: any = [];

    var i: number = 0;
    while (i < typeArray.length)
    {
      ret.push(
        <View key={"type"+i} style={[styles.typeBox, styles[typeArray[i]] ]}>
          <Text style={styles.typeText}>{typeArray[i]}</Text>
        </View>
      );
      i++;
    }
    return (ret);
  }

  const getPokemons = () =>
  {
    var pokemons = require('../assets/pokemons.json');
    // console.log(pokemons);
    return pokemons;
  }
  const retrieveLikedPokemons = async () => 
  {
    try {
        const value = await AsyncStorage.getItem('likedPokemons');
        if (value !== null) {
            // console.log("retrieved", value);
            pokemonLikedList = JSON.parse(value);
        }
    } catch (error) {
      console.error("retrieveLikedPokemons_failed_!");
    }
  }

  const grabAllINeed = async () => {
    try {
        const value = await AsyncStorage.getItem('likedPokemons');
        if (value !== null)
        {
            // console.log("LikeButtonComponent retrieved", value);
            var likedIds: any[] = JSON.parse(value);
            setPokemonLikedListData(getPokemonLikedListData(JSON.parse(value)));
        }
    } catch (error) {
    console.error("retrieveLikedPokemons_failed_!");
    }
}

  // INIT ///////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // POKEMONS LIKES ASYNC STORAGE
  var pokemonLikedList: any[] = [];
  retrieveLikedPokemons();
  // POKEMONS useState
  const [pokemonLikedListData, setPokemonLikedListData] = React.useState<any[]>([]);
  grabAllINeed(); // contre l'asyncrone de l'async storage, c'est pas génial mais c'est ce que j'ai trouvé de plus simple

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        { pokemonDisplayEntries(pokemonLikedListData) }

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonEntry: {
    width: "90%",
    height: 180,
    display: "flex",
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    borderBottomColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  pokImage: {
    flex: 1.3,
  },
  pokDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
  },
  pokemonImage: {

  },
  typeBox: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    borderBottomColor: "black",
    borderWidth: 1,
    borderRadius: 100,
  },
  typeText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  Normal: {backgroundColor: "#a8a878"},
  Grass: {backgroundColor: "#78c850"},
  Poison: {backgroundColor: "#a040a0"},
  Bug: {backgroundColor: "#a8b820"},
  Water: {backgroundColor: "#6890f0"},
  Fire: {backgroundColor: "#f08030"},
  Flying: {backgroundColor: "#a890f0"},
  Electric: {backgroundColor: "#f8d030"},
  Ground: {backgroundColor: "#e0c068"},
  Fighting: {backgroundColor: "#c03028"},
  Psychic: {backgroundColor: "#f85888"},
  Rock: {backgroundColor: "#b8a038"},
  Ghost: {backgroundColor: "#705898"},
  Ice: {backgroundColor: "#98d8d8"},
  Steel: {backgroundColor: "#b8b8d0"},
  Dark: {backgroundColor: "#705848"},
  Dragon: {backgroundColor: "#7038f8"},
});
export default Liked;