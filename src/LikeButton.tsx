// import React, { Component } from 'react';
// import {
//     View,
//     Platform,
//     TextInput,
//     TouchableOpacity,
//     Image,
//   } from 'react-native';

// export default class Liked extends Component {

//     static defaultProps = {
//         id: Props.sty,
//         likedPokemons: [],
//         onPress: ()=>{console.log("Liked pressed");},
//     }

//     constructor(props: any) {
//         super(props);
//     }
  
//     componentDidMount() {
//         console.log(this.props.someData);
//     }
  
//     render() {
//         return (
//             <TouchableOpacity
//             key={"highlight"+this.props.id}
//             style={styles.likedPokemonButton}
//             onPress={ () => {ToggleLikePokemons(id);} }>
//                 <Image
//                 style={[{borderRadius: 100, borderWidth: 1, borderColor: "#aaa", height: 50, width: 50}, likedList.includes(id) ? styles.inLikedList : styles.notInLikedList ]}
//                 source={{uri: 'https://media.istockphoto.com/vectors/like-icon-vector-design-vector-id1175303918?k=6&m=1175303918&s=612x612&w=0&h=AKhAy61wfqwi_1IuevpWQTpHYBXEhUnNoGmDqt7l2H8='}}>
//                 </Image>
//             </TouchableOpacity>
//             );
//         )
//     }
// }