import React, { useState, useContext } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import { Formik } from "formik";
import AsyncStorage from "@react-native-community/async-storage";
import { Context } from "../context/Provider";
import * as Yup from "yup";

import globalStyles from "../globalStyles";

export default function DiceSet(props) {
  const context = useContext(Context);
  const { options } = context.state;
  const { dropdownPick } = props;
  const [fields, setFields] = useState(
    options[dropdownPick]?.length
      ? Object.values(JSON.parse(options[dropdownPick]))
      : [""]
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
      name: dropdownPick !== "new" && dropdownPick ? dropdownPick : "",
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
      const { name, ...rest } = vals;
      Object.keys(rest).forEach(
        k => !rest[k] && rest[k] !== undefined && delete rest[k]
      );

      await AsyncStorage.setItem(name, JSON.stringify(rest));
      context.addOption(name, JSON.stringify(rest));
      context.changePage();
    } catch (error) {
      // saving error
      console.log(error.message);
    }
  };

  const handleNewField = () => {
    setFields(fields.concat([fields.length + 1]));
    setFormikInitVals(setFieldsMap());
  };

  const deleteDice = async dice => {
    try {
      await AsyncStorage.removeItem(dice);
      context.deleteOption(dice);
      context.changePage();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Formik
      onSubmit={vals => handleSave(vals)}
      initialValues={formikInitVals}
      validationSchema={Yup.object({
        name: Yup.string().required("name required"),
      })}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <View style={{ marginBottom: "5%" }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: "10%",
              width: windowWidth * 0.8,
            }}
          >
            <Input
              editable={!dropdownPick || dropdownPick === "new"}
              placeholder="Name"
              onChangeText={handleChange("name")}
              value={values.name}
              errorMessage={touched.name && errors.name}
              errorStyle={{
                fontSize: 14,
              }}
              onBlur={handleBlur("name")}
              containerStyle={
                dropdownPick !== "new" && dropdownPick
                  ? { width: windowWidth * 0.5 }
                  : null
              }
            />
            {dropdownPick && dropdownPick !== "new" && (
              <Button
                buttonStyle={{ backgroundColor: "red" }}
                title="Delete dice"
                onPress={() => deleteDice(dropdownPick)}
              />
            )}
          </View>
          <ScrollView
            persistentScrollbar={true}
            keyboardShouldPersistTaps="always"
          >
            <View style={setDiceContainer}>
              {fields.map((field, index) => {
                return (
                  <Input
                    key={index}
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
