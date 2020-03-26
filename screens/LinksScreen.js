import * as React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton } from 'react-native-gesture-handler';
import {useState} from "react";
import axios from 'axios';

export default function LinksScreen({navigation}) {

  const REQUEST_URL ="https://api.themoviedb.org/3/search/movie?api_key=d552533a59bd4d9490930430ac174c70&language=en-US&page=1&include_adult=false&query=";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected : {}
  });
  // This is the search function
  // Using 'axios' to search the data from the api and store the results to "results: []"
  const search = () => {
    axios(REQUEST_URL + state.s).then(({data}) =>
    {
      let results = data.results
      setState(prevState => {
        return {...prevState, results : results}
      })
    });
  }

  function GetImageUrl(res){
    return "https://image.tmdb.org/t/p/w600_and_h900_bestv2"+res;
  }
    
  return (
  
    <View style={styles.container}>
      <TextInput
        style={styles.searchbox}
        onChangeText={text => setState(prevState => {
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
        placeholder='Enter movie name'
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
          result.poster_path!=undefined?(
            <TouchableHighlight onPress={() => navigation.navigate('MovieD', {itemId: result.id})}>
              <View key={result.id} style={styles.resultbox}>
                <Image source={{uri:GetImageUrl(result.poster_path)}} style={styles.image}/>
                <Text style={styles.result}>{result.title}</Text>
              </View>
            </TouchableHighlight>):null
          ))}
      </ScrollView>
    </View>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  searchbox: {
    fontSize: 20,
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#223343',
    marginLeft: 10,
    marginRight: 10,
    color: '#FFF'

  },
  resultbox: {
    backgroundColor: '#223343',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: '#FFF',
    fontSize: 20
  },
  image: {
    width: 300,
    height: 380,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 10,
    marginTop: 10
  }
});
