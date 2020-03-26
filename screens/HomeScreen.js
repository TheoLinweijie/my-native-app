import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const REQUEST_URL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=d552533a59bd4d9490930430ac174c70";


export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  // Get the data of Trending Movie by REQUEST_URL'
  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: this.state.data.concat(responseData.results),
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
      <FlatList
        data={this.state.data}
        renderItem={({item})=>this.renderMovie(item, navigation)}
        style={styles.list}
        keyExtractor={item => item.id}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }


  // Set the data to be displayed
  renderMovie(item, navigation) {
    // Merge the url and get the full poster link
    item.poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + item.poster_path
    return (
      // onPress support user press one of the movie and go to the Movie Details, and send the moive id to next screen
      <TouchableOpacity onPress={() => navigation.navigate('MovieD',{ itemId: item.id })}>
        <View style={styles.container}>
          <Image
            source={{ uri: item.poster }}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>Vote Average: {item.vote_average}</Text>
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#223343",
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center",
    color: '#FFF'
  },
  year: {
    textAlign: "center"
  },
  thumbnail: {
    width: 120,
    height: 165
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#FFF"
  }
});