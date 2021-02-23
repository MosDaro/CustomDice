import React, { useState, useContext, Component } from "react";
import { SafeAreaView } from "react-native";
import LandingPage from "./src/components/LandingPage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import globalStyles from "./src/globalStyles";
import { Context } from "./src/context/Provider";

import DiceSet from "./src/components/DiceSet";

class App extends Component {
  static contextType = Context;
  state = {
    loading: false,
  };

  render() {
    const { appContainer } = globalStyles;

    const currentPage = () => {
      switch (this.context.state.page) {
        case "diceSet":
          return <DiceSet dropdownPick={this.context.state.dropdownPick} />;
        default:
          return <LandingPage />;
      }
    };

    return (
      <SafeAreaProvider>
        <SafeAreaView style={appContainer}>{currentPage()}</SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default App;
