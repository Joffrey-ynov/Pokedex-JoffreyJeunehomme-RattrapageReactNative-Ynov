import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LikeButtonComponent from './LikeButtonComponent';
import { Picker } from "@react-native-picker/picker";

const Item: any = Picker.Item;

const Pokedex = (props: any) => {

// FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////
const pokemonDisplayPicker = () =>
{
  return (
    <View style={styles.typeInputView}>
      <Picker
      selectedValue={[""]}
      style={styles.typeInput}
      onValueChange={(itemsValue: string[]) => {setPokTypes(itemsValue), setPokemonFilteredList(filterPokemonsByNamesAndNumsAndType(pokemonJson, pokName, pokNum, itemsValue));}}
      >
        <Item label="None" value="" />
        <Item label="Normal" value="Normal" />
        <Item label="Grass" value="Grass" />
        <Item label="Poison" value="Poison" />
        <Item label="Bug" value="Bug" />
        <Item label="Water" value="Water" />
        <Item label="Fire" value="Fire" />
        <Item label="Flying" value="Flying" />
        <Item label="Electric" value="Electric" />
        <Item label="Ground" value="Ground" />
        <Item label="Fighting" value="Fighting" />
        <Item label="Psychic" value="Psychic" />
        <Item label="Rock" value="Rock" />
        <Item label="Ghost" value="Ghost" />
        <Item label="Ice" value="Ice" />
        <Item label="Steel" value="Steel" />
        <Item label="Dark" value="Dark" />
        <Item label="Dragon" value="Dragon" />
      </Picker>
    </View>
  );
}
const pokemonDisplayEntries = (pokemonEntryList: any[]) =>
{
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
          <View style={{display: "flex", flexDirection: "row-reverse"}}>
            {/* { pokemonDisplayLikeButton(parseInt(pokemonEntryList[i].id)) } */}
            <LikeButtonComponent id={pokemonEntryList[i].id} init={pokemonLikedList.includes(pokemonEntryList[i].id)} likedPokemons={pokemonLikedList}></LikeButtonComponent>
          </View>
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

const filterPokemonsByNums = (pokemonsList: any[], numsIntArray: number[]): any[] =>
{
  if (numsIntArray.length <= 0) { return (pokemonsList); } // les numéros sont vides, on passe le test

  var i: number = 0;
  var pokemonsFiltered: any[] = [];

  while (i < pokemonsList.length) // pour chaques pokemons
  {
    if ( numsIntArray.includes(parseInt(pokemonsList[i].id)) ) // s'il y a des numéros entrés et qu'ils correspondent à ce pokemon
    {
      pokemonsFiltered.push(pokemonsList[i]);
    }

    i++;
  }

  return (pokemonsFiltered);
}
const filterPokemonsByNames = (pokemonsList: any[], namesArray: string[]): any[] =>
{
  if (namesArray.length <= 0) { return (pokemonsList); } // les names sont vides, on passe le test

  var i: number = 0;
  var j: number = 0;
  var pokemonsFiltered: any[] = [];

  while (i < pokemonsList.length) // pour chaques pokemons
  {
    while (j < namesArray.length) // pour chaques noms
    {
      if (pokemonsList[i].name.toLowerCase().includes(namesArray[j].toLowerCase())) // si un des noms entrés est inclus dans le nom du pokemon
      {
        pokemonsFiltered.push(pokemonsList[i]);
        break;
      }
      j++;
    }

    j = 0;
    i++;
  }

  return (pokemonsFiltered);
}
const filterPokemonsByTypes = (pokemonsList: any[], type: string[]): any[] =>
{
  if (type.length <= 0) { return (pokemonsList); } // le type est vide, on passe le test
  
  var i: number = 0;
  var pokemonsFiltered: any[] = [];

  while (i < pokemonsList.length) // pour chaques pokemons
  {
    // console.log("pokemonsList[i].type", pokemonsList[i].type);
    // console.log(pokemonsList[i].type.includes(type));

    if (pokemonsList[i].type.includes(type)) // si le type sélectionné est inclus dans les types du pokemon
    {
      pokemonsFiltered.push(pokemonsList[i]);
    }

    i++;
  }

  return (pokemonsFiltered);
}

const filterPokemonsByNamesAndNumsAndType = (pokemons: any[], names: string, nums: string, type: string[]) =>
{
  // NAMES
  var namesArray: string[] = names.split(/[\s,]+/g);
  namesArray = removeEmptyArrayBloc(namesArray);

  // NUMEROS
  var numsArray: string[] = nums.split(/[\s,]+/g);
  numsArray = removeEmptyArrayBloc(numsArray);
  var numsIntArray: number[] = arrayParseInt(numsArray);

  var pokemonsFiltered: any[] = [];

  pokemonsFiltered = filterPokemonsByNums(pokemons, numsIntArray);
  pokemonsFiltered = filterPokemonsByNames(pokemonsFiltered, namesArray);
  pokemonsFiltered = filterPokemonsByTypes(pokemonsFiltered, type);

  return (pokemonsFiltered);
}

const removeEmptyArrayBloc = (arr: any[]): any[] =>
{
  var i: number = 0;

  while (i < arr.length)
  {
    while (i < arr.length && arr[i] == "")
    {
      arr.splice(i, 1);
    }

    i++;
  }

  return (arr);
}

const arrayParseInt = (arr: string[]): number[] =>
{
  var arrInt: number[] = [];

  var i: number = 0;
  while (i < arr.length)
  {
    arrInt.push(parseInt(arr[i]));
    i++;
  }

  return (arrInt);
}

const retrieveLikedPokemons = async () => 
{
  try {
      const value = await AsyncStorage.getItem('likedPokemons');
      if (value !== null) {
          console.log("retrieved liked pokemons :", value);
          pokemonLikedList = JSON.parse(value);
      }
  } catch (error) {
    console.error("retrieveLikedPokemons_failed_!");
  }
}
const getPokemons = () =>
{
  var pokemons = require('../assets/pokemons.json');
  // console.log(pokemons);
  return pokemons;
}

// INITIALISATION ////////////////////////////////////////////////////////////////////////////////

  // décommenter pour reset le storage
  // storeLikedPokemons([]);

  // LIKED POKEMON STORAGE
  var pokemonLikedList: any[] = [];
  retrieveLikedPokemons();

  const { navigation } = props;
  const [pokName, setPokName] = React.useState<string>("");
  const [pokNum, setPokNum] = React.useState<string>("");
  const [pokTypes, setPokTypes] = React.useState<string[]>([]);

  // POKEMON JSON
  var pokemonJson: any[];
  pokemonJson = getPokemons();
  const [pokemonFilteredList, setPokemonFilteredList] = React.useState<any[]>(pokemonJson);

// RENDER ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        
        {/* <Text>Welcome to my pokedex, time to code. Oh boy.</Text> */}
        <Text style={{width: "85%", marginTop: 10, marginBottom: 10}}>
          Not case sensitive, you can add more parameters by adding a comma (,) or a space ( ).
          </Text>

        <Button
          color="#841584"
          title="Liked Pokemons"
          onPress={() => {navigation.navigate("Liked Pokemons", {})}}
          />
        {/* Nom */}
        <TextInput
          style={styles.nomInput}
          onChangeText={(txt) => {setPokName(txt), setPokemonFilteredList(filterPokemonsByNamesAndNumsAndType(pokemonJson, txt, pokNum, pokTypes));}}
          value={pokName}
          placeholder="Nom"
          />
        <View style={styles.scndLineInput}>
          {/* Numéro */}
          <TextInput
            style={styles.numInput}
            onChangeText={(num) => {setPokNum(num), setPokemonFilteredList(filterPokemonsByNamesAndNumsAndType(pokemonJson, pokName, num, pokTypes));}}
            value={pokNum}
            placeholder="N°"
            keyboardType="numeric"
            />
          {/* Type */}
          { pokemonDisplayPicker() }
        </View>

        { pokemonDisplayEntries(pokemonFilteredList) }

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
  scrollView: {
  },
  nomInput: {
    width: "80%",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  numInput: {
    width: "39%",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginRight: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  typeInput: {
    flex: 1,
  },
  typeInputView: {
    width: "39%",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#fff",
    display: "flex",
  },
  scndLineInput: {
    display: "flex",
    flexDirection: "row",
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
export default Pokedex;

/* INCLUSIVE RESEARCH
while (i < pokemons.length) // pour chaques pokemons
  {
    if ( (numsArray.length > 0) && (numsIntArray.includes(parseInt(pokemons[i].id))) ) // s'il y a des numéros entrés et qu'ils correspondent à ce pokemon
    {
      pokemonsFiltered.push(pokemons[i]);
    }
    else if (namesArray.length > 0) // s'il y a des noms entrés
    {
      while (j < namesArray.length) // pour chaques noms
      {
        if (pokemons[i].name.toLowerCase().includes(namesArray[j].toLowerCase())) // si un des noms entrés est inclus dans le nom du pokemon
        {
          pokemonsFiltered.push(pokemons[i]);
          break;
        }
        j++;
      }
    }
*/