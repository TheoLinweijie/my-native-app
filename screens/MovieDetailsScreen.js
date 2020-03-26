import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {  ScrollView } from "react-native-gesture-handler";



export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datas: [],
      loaded: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchDatas = this.fetchDatas.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.fetchDatas();
  }
  // Get the data(title, overview, release date and runtime ) from the url (Moive Details)
  fetchData() {
    const {route} = this.props;
    const {itemId} = route.params;
    let url = 'https://api.themoviedb.org/3/movie/'+itemId+'?api_key=d552533a59bd4d9490930430ac174c70&language=en-US';
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: this.state.data.concat(responseData),
          loaded: true
        });
      });
    }
  // Get the data(cast) from the url (List of the cast member)
  fetchDatas() {
    const {route} = this.props;
    const {itemId} = route.params;
    let url ="https://api.themoviedb.org/3/movie/"+itemId+"/credits?api_key=d552533a59bd4d9490930430ac174c70";
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          datas: this.state.datas.concat(responseData.cast),
          loaded: true
        });
      });
      
  }

  render() {
    const { navigation } = this.props;
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ScrollView style={styles.scrollview}>
        <View>
          <FlatList
          data={this.state.data}
          renderItem={this.renderMovie}
          style={styles.list}
          keyExtractor={item => item.id}
          />
        </View>
        
        <View>
          {this.state.datas.map(result => (
            // onPress support user press each member's name and go to the People Details, and send the people id to next screen
            <TouchableOpacity onPress={() => navigation.navigate('PeopleD',{ itemId: result.id })}>
              <View key ={result.id} style={styles.namelist}>
              <Text style={styles.membername}>{result.name} (as {result.character})</Text>
              </View>
            </TouchableOpacity>
          ))
          }
        </View>
      </ScrollView>

      
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }


  // Display the data from Flatlist
  renderMovie({ item }) {
    // Merge the url and get the full poster link
    item.poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + item.poster_path
    return (

        <View>
          <Image
            source={{ uri: item.poster }}
            style={styles.image}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>Overview: </Text>
            <Text style={styles.text}>{item.overview}</Text>
            <Text style={styles.text}>Release Date: {item.release_date}</Text>
            <Text style={styles.text}>Runtime: {item.runtime} min</Text>
            <Text style={styles.text}>Cast Members:</Text>
          </View>
        </View>

        


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
    
  },
  scrollview: {
    backgroundColor: '#FFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: "center",
    color: '#FFF'
  },
  text: {
    textAlign: "left",
    padding: 10,
    fontSize: 20,
    color: '#FFF'
  },
  image: {
    width: 260,
    height: 400,
    marginLeft: 55,
    marginRight: 55,
    borderRadius: 10
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#223343"
  },
  namelist: {
    backgroundColor: "#223343",
  },
  membername: {
    textAlign: "left",
    padding: 10,
    fontSize: 20,
    backgroundColor: "#FFF",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  }
});