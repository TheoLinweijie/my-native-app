import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";



export default class PeopleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datas: [],
      loaded: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchDatas = this.fetchDatas.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.fetchDatas();
  }
  // Get the itemId from previous screen
  // Get the data(name, biography, birthday) from the url (Peole Details)
  fetchData() {
    const {route} = this.props;
    const {itemId} = route.params;
    let url = "https://api.themoviedb.org/3/person/"+itemId+"?api_key=d552533a59bd4d9490930430ac174c70&language=en-US";
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: this.state.data.concat(responseData),
          loaded: true
        });
      });
      
  }
  // Get the data from the url (List of the movie)
  fetchDatas() {
    const {route} = this.props;
    const {itemId} = route.params;
    let url = "https://api.themoviedb.org/3/person/"+itemId+"/movie_credits?api_key=d552533a59bd4d9490930430ac174c70&language=en-US";
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          datas: this.state.datas.concat(responseData.cast),
          loaded: true
        });
      });
      
  }
  // Display the People Details
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <ScrollView style={styles.list}>
        <View>
          <FlatList
          data={this.state.data}
          renderItem={this.renderMovie}
          style={styles.list}
          keyExtractor={item => item.id}
        />
        </View>
        <View style={styles.movielist}> 
          {this.state.datas.map(result => (
            <View key ={result.id} style={styles.movielist}>
              <Text style={styles.moviename}>{result.title} ({result.release_date})</Text>
            </View>
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
  // Set the data to be displayed
  renderMovie({ item }) {
    // Merge the url and get the full poster link
    item.poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + item.profile_path
    return (

        <View>
          <Image
            source={{ uri: item.poster }}
            style={styles.image}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>Biography: </Text>
            <Text style={styles.text}>{item.biography}</Text>
            <Text style={styles.text}>Birthday: {item.birthday}</Text>
            <Text style={styles.text}>List Of Movie:</Text>
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
    paddingTop: 10,
    backgroundColor: "#223343"
  },
  movielist: {
    backgroundColor: "#223343",
  },
  moviename: {
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