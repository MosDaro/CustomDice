import React, { useEffect, useContext, useState, useRef } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import globalStyles from "../globalStyles";
import AsyncStorage from "@react-native-community/async-storage";
import { Context } from "../context/Provider";
import DropDownPicker from "react-native-dropdown-picker";

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
  const [dropdownPick, setDropdownPick] = useState();
  const { options } = context.state;
  const dropDownRef = React.useRef();

  useEffect(() => {
    getOptionValues();
  }, [getOptionValues]);

  const getOptionValues = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@options");
      context.setOptions(jsonValue);
    } catch (error) {
      // error reading value
      console.log(error.message);
    }
  };

  const handleRoll = () => {
    let values = Object.values(JSON.parse(options));
    let max = values.length;
    let rand = Math.floor(Math.random() * max);
    setRandValue(values[rand]);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dropDownRef.current.close();
      }}
    >
      <View style={{ width: windowWidth, height: windowHeight * 0.9 }}>
        <View style={landingContainer}>
          <Text h1>{randValue || " "}</Text>
          <View style={{ width: buttonsStyle.width }}>
            <DropDownPicker
              placeholder="Choose dice"
              items={[
                {
                  label: "USA",
                  value: "usa",
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                  hidden: true,
                },
                {
                  label: "UK",
                  value: "uk",
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
                {
                  label: "France",
                  value: "france",
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]}
              containerStyle={{ height: 50 }}
              placeholderStyle={{ fontSize: 20 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              labelStyle={{ fontSize: 20 }}
              onChangeItem={item => setDropdownPick(item.value)}
              controller={instance => (dropDownRef.current = instance)}
            />

            <Text />
            <Button
              buttonStyle={buttonsStyle}
              titleStyle={buttonsTitle}
              title="Roll the dice"
              onPress={() => handleRoll()}
              disabled={!(options && Object.keys(options).length)}
            />
            <Text />
            <Button
              buttonStyle={buttonsStyle}
              titleStyle={buttonsTitle}
              title="Set the dice"
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
