import React, { useState, useContext } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import { Formik } from "formik";
import AsyncStorage from "@react-native-community/async-storage";
import { Context } from "../context/Provider";

import globalStyles from "../globalStyles";

export default function DiceSet() {
  const context = useContext(Context);
  const { options } = context.state;
  const [fields, setFields] = useState(
    options?.length ? Object.values(JSON.parse(options)) : [""]
  );

  // clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (e) {
  //     // clear error
  //   }

  //   console.log("Done.");
  // };
  // clearAll();

  const setFieldsMap = () => {
    return {
      ...fields.filter(el => {
        if (el) return el;
      }),
    };
  };

  const [formikInitVals, setFormikInitVals] = useState(setFieldsMap());
  const {
    buttonsStyle,
    buttonsTitle,
    setDiceContainer,
    windowWidth,
  } = globalStyles;

  const handleDeleteField = index => {
    filteredFields = fields.filter(el => el != index);
    setFields(filteredFields);
  };

  const handleSave = async vals => {
    try {
      Object.keys(vals).forEach(
        k => !vals[k] && vals[k] !== undefined && delete vals[k]
      );

      await AsyncStorage.setItem("@storage_Key", JSON.stringify(vals));
      context.setOptions(JSON.stringify(vals));
      context.changePage("landing");
    } catch (error) {
      // saving error
      console.log(error.message);
    }
  };

  const handleNewField = () => {
    setFields(fields.concat([fields.length + 1]));
    setFormikInitVals(setFieldsMap());
  };

  return (
    <Formik onSubmit={vals => handleSave(vals)} initialValues={formikInitVals}>
      {({ handleChange, handleSubmit, setFieldValue, values }) => (
        <View>
          <View style={{ marginTop: "10%", width: windowWidth * 0.8 }}>
            <Input placeholder="Name" />
          </View>
          <ScrollView
            persistentScrollbar={true}
            keyboardShouldPersistTaps="always"
          >
            <View style={setDiceContainer}>
              {fields.map((field, index) => {
                return (
                  <Input
                    key={field}
                    placeholder="Option"
                    onChangeText={handleChange(index.toString())}
                    value={values[index.toString()]}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          handleDeleteField(field);
                          setFieldValue(index.toString(), "");
                        }}
                      >
                        <Icon
                          type="entypo"
                          name="cross"
                          color="red"
                          size={30}
                        />
                      </TouchableOpacity>
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
          <Button
            title="Add new field"
            onPress={handleNewField}
            icon={<Icon type="entypo" name="plus" color="white" />}
            iconRight={true}
          />
          <Text />
          <Button
            title="Save"
            buttonStyle={{
              backgroundColor: "green",
            }}
            onPress={handleSubmit}
          />
          <Text />
          <Button
            type="outline"
            title="Cancel"
            onPress={() => context.changePage("landing")}
          />
        </View>
      )}
    </Formik>
  );
}
