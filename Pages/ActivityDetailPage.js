import React from "react";
import { View, StyleSheet, Button, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { url } from "../constant";

// this component receives a object called activity, the field is defined in the file "../activities"
export default class ActivityDetailPage extends React.Component {
  state = {
    registered: false,
  };

  checkRegister = async () => {
    let activity_id = this.props.route.params.id;
    let user_id = this.props.route.params.user_id;
    let response = await fetch(
      `${url}/activity/check?user_id=${user_id}&activity_id=${activity_id}`
    );
    let json = await response.json();
    if (json.info == "registered") {
      this.setState({
        registered: true,
      });
    } else if (json.info == "unregistered") {
      this.setState({
        registered: false,
      });
    }
  };

  componentDidMount() {
    this.checkRegister();
  }

  handleRegisterPressed = async () => {
    let activity_id = this.props.route.params.id;
    let user_id = this.props.route.params.user_id;
    let response = await fetch(
      `${url}/activity/join?user_id=${user_id}&activity_id=${activity_id}`
    );
    this.setState({
      registered: true,
    });
  };

  handleUnregisterPressed = async () => {
    let activity_id = this.props.route.params.id;
    let user_id = this.props.route.params.user_id;
    let response = await fetch(
      `${url}/activity/unregister?user_id=${user_id}&activity_id=${activity_id}`
    );
    this.setState({
      registered: false,
    });
  };

  render() {
    const {
      activityName,
      type,
      time,
      location,
      organizer,
      description,
    } = this.props.route.params;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{activityName}</Text>
        {this.state.registered ? (
          <Button title="Unregister" onPress={this.handleUnregisterPressed} />
        ) : (
          <Button title="Register" onPress={this.handleRegisterPressed} />
        )}
        <View style={styles.row}>
          <Text style={styles.name}>type: </Text>
          <Text>{type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>time: </Text>
          <Text>{time.slice(0, 10) + " " + time.slice(11, 16)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>location: </Text>
          <Text>{location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>organizer: </Text>
          <Text>{organizer}</Text>
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>description: </Text>
        <Text>{description}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    margin: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
  },
});
