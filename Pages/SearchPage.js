import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import propType from "prop-type";
import Constants from "expo-constants";
import { url } from "../constant";
import { search } from "../fetchActivities";

export default class SearchPage extends React.Component {
  static propType = {};

  state = {
    type: "sport",
    date: new Date(),
    location: "",
  };

  handleActivityChanges = (activityName) => {
    this.setState({ activityName });
  };

  handleLocationChange = (location) => {
    this.setState({ location });
  };

  handledateOnChange = (event, selectedDate) => {
    this.setState({ date: selectedDate });
  };

  getActivities = async () => {
    const result = await search(
      this.state.type,
      this.state.date.toUTCString(),
      this.state.location
    );
    result.reverse();
    return result;
  };

  handleSearchPress = async () => {
    try {
      const activities = await this.getActivities();
      this.props.navigation.navigate("Main", {
        activities: activities,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container} extraScrollHeight={100}>
        <Text style={styles.title}>type</Text>
        <Picker
          style={styles.input}
          selectedValue={this.state.type}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ type: itemValue })
          }
        >
          <Picker.Item label="all" value="all" />
          <Picker.Item label="sport" value="sport" />
          <Picker.Item label="study" value="study" />
          <Picker.Item label="movie" value="movie" />
          <Picker.Item label="meal" value="meal" />
          <Picker.Item label="travel" value="travel" />
          <Picker.Item label="leetcode" value="leetcode" />
        </Picker>

        <Text style={styles.title}>Time (At and After)</Text>
        <DateTimePicker
          style={styles.input}
          value={this.state.date}
          mode="date"
          onChange={this.handledateOnChange}
        />

        <Text style={styles.title}>location</Text>
        <TextInput
          style={styles.input}
          value={this.state.location}
          placeholder="location"
          onChangeText={this.handleLocationChange}
        />
        <Button title="search" onPress={this.handleSearchPress} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  title: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    margin: 5,
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
  },
});
