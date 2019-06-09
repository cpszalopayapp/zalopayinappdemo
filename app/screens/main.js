import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput
} from "react-native";
import ZPNativeModule from "react-native-zalopay-native-module";
import { Button } from "zalopay-react-native-ui-toolkit";
import API from "../api";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  textInput: {
    height: 50,
    borderColor: "#FAAAAA",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    alignSelf: "stretch",
    flex: 1
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  payButton: {
    alignSelf: "stretch",
    margin: 10
  }
});

export default class App extends Component {
  state = {
    amount: "15000"
  };

  handleChangeText = text => {
    this.setState({
      amount: text
    });
  };

  handlePayPress = () => {
    const { amount } = this.state;
    ZPNativeModule.showLoading();
    API.createOrder({ amount })
      .then(resp => {
        console.log("API.createOrder", resp);
        ZPNativeModule.hideLoading();
        resp.amount = amount;
        ZPNativeModule.payOrder(resp);
      })
      .catch(error => {
        ZPNativeModule.hideLoading();
        ZPNativeModule.showDialogWithMessage("Tạo đơn hàng lỗi");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text>Amount</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleChangeText}
            keyboardType={"number-pad"}
            value={this.state.amount}
          />
        </View>
        <Button.Normal
          title="Pay"
          style={styles.payButton}
          onPress={this.handlePayPress}
        />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
