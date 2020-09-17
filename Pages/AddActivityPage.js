import React from "react";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import propType from "prop-type";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { url } from "../constant";
import { fetch_all } from "../fetchActivities";

export default class AddActivityPage extends React.Component {
  static propType = {};

  state = {
    activityName: "",
    type: "sport",
    time: new Date(),
    location: "",
    description: "",
    errorMessage: "",
  };

  getHandler = (key) => {
    return (val) => {
      this.setState({ [key]: val });
    };
  };

  handleActivityChanges = this.getHandler("activityName");
  handleLocationChanges = this.getHandler("location");
  handleDescriptionChanges = this.getHandler("description");

  timeOnChange = (event, selectedDate) => {
    this.setState({ time: selectedDate });
  };

  getActivities = async () => {
    const result = await fetch_all();
    result.reverse();
    return result;
  };

  handleAddPress = async () => {
    try {
      if (
        !this.state.activityName ||
        !this.state.location ||
        !this.state.description
      ) {
        this.setState({
          errorMessage: "some field is required, please check your input again",
        });
      } else {
        let response = await fetch(url + "/activity", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: this.state.activityName,
            time: this.state.time.toUTCString(),
            type: this.state.type,
            location: this.state.location,
            user_id: this.props.route.params.id,
            description: this.state.description,
          }),
        });

        const activities = await this.getActivities();
        this.props.navigation.navigate("Main", {
          activities: activities,
        });
      }
    } catch (error) {
      this.setState({
        errorMessage: error.name + ":" + error.message,
      });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>activity name</Text>
        <TextInput
          style={styles.input}
          value={this.state.activityName}
          onChangeText={this.handleActivityChanges}
          placeholder="Activity"
        />

        <Text style={styles.title}>activity type</Text>
        <Picker
          style={styles.input}
          selectedValue={this.state.type}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ type: itemValue })
          }
        >
          <Picker.Item label="sport" value="sport" />
          <Picker.Item label="study" value="study" />
          <Picker.Item label="movie" value="movie" />
          <Picker.Item label="meal" value="meal" />
          <Picker.Item label="travel" value="travel" />
          <Picker.Item label="leetcode" value="leetcode" />
        </Picker>

        <Text style={styles.title}>time</Text>
        <DateTimePicker
          style={styles.input}
          value={this.state.time}
          mode="date"
          onChange={this.timeOnChange}
        />

        <Text style={styles.title}>location</Text>
        <TextInput
          style={styles.input}
          value={this.state.location}
          placeholder="location"
          onChangeText={this.handleLocationChanges}
        />

        <Text style={styles.title}>description</Text>
        <TextInput
          style={styles.description}
          multiline={true}
          value={this.state.description}
          placeholder="description"
          onChangeText={this.handleDescriptionChanges}
        />

        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <Button
          style={styles.input}
          title="submit"
          onPress={this.handleAddPress}
        />

        <View style={styles.blankSpace} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  blankSpace: {
    height: 100,
  },
  input: {
    margin: 5,
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  description: {
    height: 200,
    margin: 5,
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 10,
  },
});
