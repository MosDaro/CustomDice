import React, { useEffect, useContext, useState, useRef } from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import globalStyles from "../globalStyles";
import AsyncStorage from "@react-native-community/async-storage";
import { Context } from "../context/Provider";
import DropDownPicker from "react-native-dropdown-picker";
import Dice from "./Dice";

export default function LandingPage() {
  const {
    buttonsStyle,
    buttonsTitle,
    landingContainer,
    windowHeight,
    windowWidth,
  } = globalStyles;
  const context = useContext(Context);
  const [randValue, setRandValue] = useState();
  const [rgb, setRgb] = useState([255, 0, 0]);
  const { options } = context.state;
  const dropDownRef = useRef();

  useEffect(() => {
    getOptionValues();
  }, [getOptionValues]);

  const getOptionValues = async () => {
    try {
      // const jsonValue = await AsyncStorage.getItem("@options");
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      context.setOptions(result);
    } catch (error) {
      // error reading value
      console.log(error.message);
    }
  };

  const handleRoll = () => {
    getRandomColor();
    const { dropdownPick } = context.state;
    if (dropdownPick && context.state.options[dropdownPick]) {
      const option = context.state.options[dropdownPick];
      // console.log(option);
      // console.log(context.state.options[dropdownPick]);
      let values = Object.values(JSON.parse(option));
      let max = values.length;
      let rand = Math.floor(Math.random() * max);
      setRandValue(values[rand]);
    }
  };

  const getRandomColor = () => {
    const color = [255, 0, 0];
    color[0] = Math.round(Math.random() * 255);
    color[1] = Math.round(Math.random() * 255);
    color[2] = Math.round(Math.random() * 255);
    setRgb(color);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dropDownRef.current.close();
      }}
    >
      <View style={{ width: windowWidth, height: windowHeight * 0.9 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
          }}
          onPress={() => handleRoll()}
        >
          <Dice rgb={rgb} randValue={randValue} />
        </TouchableOpacity>
        <View style={landingContainer}>
          <View style={{ width: buttonsStyle.width }}>
            <DropDownPicker
              defaultValue={context.state.dropdownPick}
              placeholder="Choose dice"
              items={[
                {
                  label: "New Dice",
                  value: "new",
                  textStyle: { color: "blue" },
                },
              ].concat(
                Object.keys(context.state.options).map(option => {
                  return {
                    label: option,
                    value: option,
                  };
                })
              )}
              dropDownMaxHeight={windowHeight * 0.22}
              containerStyle={{ height: 50 }}
              placeholderStyle={{ fontSize: 20 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              labelStyle={{ fontSize: 20 }}
              onChangeItem={item => context.setDropdownPick(item.value)}
              controller={instance => (dropDownRef.current = instance)}
            />

            <Text />
            <Button
              buttonStyle={buttonsStyle}
              titleStyle={buttonsTitle}
              title="Roll the dice"
              onPress={() => handleRoll()}
              disabled={
                !(options && Object.keys(options).length) ||
                !context.state.dropdownPick ||
                context.state.dropdownPick === "new"
              }
            />
            <Text />
            <Button
              buttonStyle={buttonsStyle}
              titleStyle={buttonsTitle}
              title={
                context.state.dropdownPick === "new" ||
                !context.state.dropdownPick
                  ? "Add new Dice"
                  : "Edit the dice"
              }
              onPress={() => {
                context.changePage("diceSet");
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
