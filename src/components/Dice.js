import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import globalStyles from "../globalStyles";

/*
diceContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    diceStyleI: {
      position: "relative",
      backgroundColor: "green",
      width: windowWidth * 0.7,
      height: windowWidth * 0.7,
      borderRadius: 20,
    },
    diceStyleII: {
      backgroundColor: "green",
      width: windowWidth * 0.7,
      height: windowWidth * 0.7,
      borderRadius: 20,
      marginRight: 50,
    },
*/

export default function Dice(props) {
  const { windowHeight, windowWidth } = globalStyles;
  const { rgb } = props;
  const brightness = Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );
  const textColour = brightness > 125 ? "black" : "white";

  return (
    <View
      style={{
        backgroundColor: "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")",
        width: windowWidth * 0.8,
        height: windowWidth * 0.8,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: textColour, padding: 1 }} h1>
        {props.randValue || " "}
      </Text>
    </View>
  );
}
