import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ImageBackground } from 'react-native';

export default function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData({
          name: data.name,
          id: data.id,
          image: data.sprites.versions['generation-v']['black-white'].animated.front_default,
        });
      })
      .catch((error) => console.log('Erro:', error));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.discordapp.com/attachments/690315070550573244/1300958661145006100/background.png?ex=6722bbab&is=67216a2b&hm=1529a617a113c505ff2b675947ac8e6334f2519e700db2c9c8c8d052a24bad62&' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/404px-International_Pok%C3%A9mon_logo.svg.png' }}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Pokemon"
          placeholderTextColor="#333" 
          value={pokemonName}
          onChangeText={(text) => setPokemonName(text)}
          onSubmitEditing={fetchPokemonData}
        />
        <Button title="Procurar" onPress={fetchPokemonData} color="red" />
        {pokemonData && (
          <View style={styles.card}>
            <Image source={{ uri: pokemonData.image }} style={styles.pokemonImage} />
            <Text style={styles.pokemonName}>Nome: {pokemonData.name}</Text>
            <Text style={styles.pokemonId}>ID: {pokemonData.id}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  input: {
    width: '80%', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    backgroundColor: 'white', 
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16, 
    color: '#333',
    marginBottom : 15,
  },
  card: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'steelblue',
    borderRadius: 8,
    width: '80%',
    marginTop: 20,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 20,
    color: 'black',
  },
  pokemonId: {
    fontSize: 16,
    color: 'black',
  },
});
