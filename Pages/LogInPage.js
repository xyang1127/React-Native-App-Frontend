import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Constants from "expo-constants";
import { url } from "../constant";
import { fetch_all } from "../fetchActivities";

export default class LogInPage extends React.Component {
  static propType = {};

  state = {
    username: "",
    password: "",
    errorMessage: "",
    id: -1,
    name: "",
  };

  getHandler = (key) => {
    return (val) => {
      this.setState({ [key]: val });
    };
  };

  handleUsernameChanges = this.getHandler("username");
  handlePasswordChanges = this.getHandler("password");

  getActivities = async () => {
    const result = await fetch_all();
    result.reverse();
    return result;
  };

  handleLoginPress = async () => {
    // check not empty
    if (!this.state.username || !this.state.password) {
      this.setState({
        errorMessage: "some field is required, please check your input again",
      });
      return;
    }

    // todo: check valid
    try {
      let response = await fetch(url + "/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      let json = await response.json();
      if (json.hasOwnProperty("id")) {
        this.setState({
          errorMessage: "",
          username: "",
          password: "",
          id: json.id,
          name: json.name,
        });
        const activities = await this.getActivities();
        this.props.navigation.navigate("Main", {
          id: this.state.id,
          name: this.state.name,
          activities: activities,
        });
      } else {
        this.setState({
          errorMessage: "username or password is not correct",
        });
      }
    } catch (error) {
      this.setState({
        errorMessage: error.name + ":" + error.message,
      });
    }
  };

  handleSignUpPress = () => {
    this.setState({ errorMessage: "", username: "", password: "" });
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>username: </Text>
          <TextInput
            style={styles.input}
            value={this.state.username}
            placeholder="username"
            onChangeText={this.handleUsernameChanges}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>password: </Text>
          <TextInput
            style={styles.input}
            value={this.state.password}
            placeholder="password"
            onChangeText={this.handlePasswordChanges}
            secureTextEntry={true}
          />
        </View>
        <Button
          style={styles.button}
          title="Log In"
          onPress={this.handleLoginPress}
        />
        <Button
          style={styles.button}
          title="Sign Up"
          onPress={this.handleSignUpPress}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 150,
  },
  input: {
    width: 280,
    margin: 5,
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  title: {
    width: 100,
  },
  row: {
    marginLeft: 10,
    flexDirection: "row",
    fontWeight: "bold",
    alignItems: "center",
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    margin: 50,
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 10,
  },
});
