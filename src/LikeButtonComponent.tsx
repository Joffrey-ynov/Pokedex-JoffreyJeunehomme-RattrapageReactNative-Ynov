import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    id: number,
    init: boolean,
    likedPokemons: any[]
}

const LikeButtonComponent = (props: Props) => {

    // console.log("creating likeButton id:", props.id, ", state: ", props.init);

    const storeLikedPokemons = async (pokemonIdList: number[]) => {
        try {
            await AsyncStorage.setItem('likedPokemons', JSON.stringify(pokemonIdList));
        } catch (error) {
            console.error("storeLikedPokemons_failed_!");
        }
    }

    const ToggleLikePokemons = async (pokemonId: number) =>
    {
        // console.log(pokemonId);

        try {
            const jsonLikedPokemons = await AsyncStorage.getItem('likedPokemons');
            if (jsonLikedPokemons !== null)
            {
                // console.log("LikeButtonComponent retrieved", jsonLikedPokemons);
                likedPokemons = JSON.parse(jsonLikedPokemons);
                // console.log("likedPokemons", likedPokemons);


                if (likedPokemons.includes(pokemonId))
                {
                    console.log("Removing", pokemonId);
                    likedPokemons.splice(likedPokemons.indexOf(pokemonId), 1);  // removes pokemon from liked
                    setLiked(false);
                }
                else
                {
                    console.log("Adding", pokemonId);
                    likedPokemons.push(pokemonId); // add pokemon to liked
                    setLiked(true);
                }
                console.log("current saved list", likedPokemons);

                storeLikedPokemons(likedPokemons);
            }
            else // si l'async storage est vide
            {
                likedPokemons = [pokemonId];
                setLiked(true);
                storeLikedPokemons(likedPokemons);
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
                likedPokemons = JSON.parse(value);
                setLiked(likedPokemons.includes(props.id));
            }
        } catch (error) {
            console.error("retrieveLikedPokemons_failed_!");
        }
    }
    

    // INIT ////////////////////////////////////////////////////////////////////////////////////////////////
    // getPokemons().includes(props.id)
    var likedPokemons: any[] = [];
    likedPokemons = props.likedPokemons; // on récupère les pokemons likés
    const [liked, setLiked] = useState<boolean>(); // props.init
    grabAllINeed(); // contre l'asyncrone de l'async storage, c'est pas génial mais c'est ce que j'ai trouvé de plus simple

    return (
        <TouchableOpacity
        style={{ backgroundColor: "white", borderColor: "black" }}
        onPress={ () => {ToggleLikePokemons(props.id);} }>
            <Image
            style={[{borderRadius: 100, borderWidth: 1, borderColor: "#aaa", height: 50, width: 50}, liked ? styles.inLikedList : styles.notInLikedList ]}
            source={{uri: 'https://media.istockphoto.com/vectors/like-icon-vector-design-vector-id1175303918?k=6&m=1175303918&s=612x612&w=0&h=AKhAy61wfqwi_1IuevpWQTpHYBXEhUnNoGmDqt7l2H8='}}>
            </Image>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inLikedList: {borderWidth: 4, borderColor: "#ff4545"},
    notInLikedList: {borderColor: "#aaa"},
});
export default LikeButtonComponent;