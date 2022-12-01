//This is an example code to make a Star Rating Bar //
import React, { Component } from "react";
//import react in our code.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
//import all the components we are going to use.

export default class Myapp extends Component<{}> {
  constructor() {
    super();
    this.state = {
      Default_Rating: 2.5,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
    };
    //Filled Star. You can also give the path from local
    this.Star =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";

    //Empty Star. You can also give the path from local
    this.Star_With_Border =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.textStyle}>Great value right   <MaterialIcons name="thumb-up" size={32} color="#1597E2" /></Text>
        <Text style={styles.textStyleSmall}>Rate your experience</Text>
        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>

        <View style={styles.buttonHolder}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => alert(this.state.Default_Rating)}
          >
            {/*Clicking on button will show the rating as an alert*/}
            <Text style={styles.lightTxt}>Submit  <Feather name="smile" size={20} color="#fff" /></Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button2}
            onPress={() => alert(this.state.Default_Rating)}
          >
            {/*Clicking on button will show the rating as an alert*/}
            <Text style={styles.lightTxt2}>Later  <Feather name="frown" size={20} color="#1597E2" /></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    elevation: 4,
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1597E2",
    marginHorizontal: 10,
    borderRadius: 5,
  },

  button2: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderColor: "#1597E2",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 25,
    color: "#000",
    marginTop: 15,
    fontWeight: "600",
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,

    color: "#000",
    marginTop: 15,
  },

  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lightTxt: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 20,
  },
  lightTxt2: {
    color: "#1597E2",
    fontWeight: "400",
    fontSize: 20,
  },
});
