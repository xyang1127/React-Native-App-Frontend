import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import Constants from "expo-constants";

import Activity from "../Components/Activity";
// import activities from "../activities";
import { fetch_all, search } from "../fetchActivities";

class MainPage extends React.Component {
  renderActivity = (obj) => {
    return (
      <Activity
        {...obj.item}
        user_id={this.props.route.params.id}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const activities = this.props.route.params.activities;
    return (
      <View style={styles.container}>
        <View style={styles.bar}>
          <Button
            title="add"
            onPress={() => {
              this.props.navigation.navigate("Add", {
                id: this.props.route.params.id,
              });
            }}
          />
          <Button
            title="search"
            onPress={() => this.props.navigation.navigate("Search")}
          />
          <Button
            title="log out"
            onPress={() => this.props.navigation.popToTop()}
          />
        </View>
        {<FlatList data={activities} renderItem={this.renderActivity} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    paddingBottom: 50,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MainPage;
