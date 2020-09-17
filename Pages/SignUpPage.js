import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Constants from "expo-constants";
import { url } from "../constant";

export default class SignUpPage extends React.Component {
  static propType = {};

  state = {
    name: "",
    username: "",
    password: "",
    repeat: "",
    errorMessage: "",
  };

  getHandler = (key) => {
    return (val) => {
      this.setState({ [key]: val });
    };
  };

  handleNameChanges = this.getHandler("name");
  handleUsernameChanges = this.getHandler("username");
  handlePasswordChanges = this.getHandler("password");
  handleRepeatChanges = this.getHandler("repeat");

  handleSignUpPress = async () => {
    //chekc empty
    try {
      if (
        !this.state.name ||
        !this.state.username ||
        !this.state.password ||
        !this.state.repeat
      ) {
        this.setState({
          errorMessage: "some field is required, please check your input again",
        });
      } else if (this.state.password !== this.state.repeat) {
        this.setState({
          errorMessage: "passwords are not the same, please enter them again",
        });
      } else {
        //check if user name repeats
        let response = await fetch(
          `${url}/user/check?username=${this.state.username}`
        );
        let json = await response.json();
        if (json.message == "fail") {
          this.setState({
            errorMessage: "this username is taken, please choose another one",
          });
        } else if (json.message == "success") {
          // add user
          response = await fetch(url + "/user", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              name: this.state.name,
              username: this.state.username,
              password: this.state.password,
            }),
          });

          this.props.navigation.navigate("Login");
        } else {
          this.setState({
            errorMessage: "something went wrong, please try again",
          });
        }
      }
    } catch (error) {
      this.setState({
        errorMessage: error.name + ":" + error.message,
      });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>name: </Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            placeholder="name"
            onChangeText={this.handleNameChanges}
          />
        </View>
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
        <View style={styles.row}>
          <Text style={styles.title}>repeat pwd: </Text>
          <TextInput
            style={styles.input}
            value={this.state.repeat}
            placeholder="repeat password"
            onChangeText={this.handleRepeatChanges}
            secureTextEntry={true}
          />
        </View>
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
  button: {
    color: "red",
  },
  input: {
    width: 270,
    margin: 5,
    padding: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  title: {
    width: 110,
  },
  row: {
    marginLeft: 10,
    flexDirection: "row",
    fontWeight: "bold",
    alignItems: "center",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 10,
  },
});
