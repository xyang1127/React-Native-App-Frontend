import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class TimeSelector extends React.Component {
  static propType = {};

  state = {
    date: new Date(),
    time: new Date(),
  };

  render() {
    return (
      <View>
        <DateTimePicker value={this.state.date} mode="date" />
        <DateTimePicker value={this.state.time} mode="time" />
      </View>
    );
  }
}
