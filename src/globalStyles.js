import { StyleSheet, Dimensions, Platform } from "react-native";

function globalStyles() {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    windowHeight,
    windowWidth,
    buttonsStyle: {
      width: windowWidth * 0.6,
      height: windowHeight * 0.1,
    },
    buttonsTitle: {
      fontSize: 30,
    },
    appContainer: {
      marginTop: Platform.OS === "android" ? "10%" : 0,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    setDiceContainer: {
      width: windowWidth * 0.8,
      justifyContent: "flex-start",
    },
    landingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: Platform.OS === "android" ? 0 : "5%",
    },
  });

  return styles;
}

export default globalStyles();
