import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// this component receives a object called activity, the field is defined in the file "../activities"
class Activity extends React.Component {
  render() {
    const location = this.props.location;
    const short_location =
      location.length >= 15 ? location.slice(0, 12) + "..." : location;
    return (
      <View style={styles.block}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Detail", {
              ...this.props,
            })
          }
        >
          <Text style={styles.titleText}>{this.props.activityName}</Text>
          <View style={styles.row}>
            <Text>{this.props.type}</Text>
            <Text>{this.props.organizer}</Text>
          </View>
          <View style={styles.row}>
            <Text>{this.props.time.slice(0, 10)}</Text>
            <Text>{short_location}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    padding: 20,
    margin: 5,
    borderColor: "black",
    borderWidth: 2,
    //flex: 1,
    //backgroundColor: "green",
    //alignItems: "center",
    //justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Activity;
