import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import LanguageDropdown from "../Components/LanguageDropdown";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

//----------------------------------------------
// Helper function to show the Translation View.
//----------------------------------------------
const TranslationView = () => {
  const [language, setLanguage] = useState("es");
  const [translationAvailable, setTranslationAvailable] = useState(true);
  const [predictionFound, setPredictionFound] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [word, setWord] = useState(null);
  const [translation, setTranslation] = useState(null);
  const navigation = useNavigation();

  const loadNewTranslation = () => {
    setTranslation("");
    setWord("");
    setPredictionFound(false);
    setTranslationAvailable(false);
    navigation.navigate("CameraView", { language });
  };

  return (
    <SafeAreaView style={styles.translationView}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
        // showHideTransition={statusBarTransition}
        // hidden={true}
      />
      <View>
        <Text style={styles.translationTextField}>
          First select a languange that you'd like to translate to.
        </Text>
        <LanguageDropdown
          language={language}
          pickerSelectStyles={pickerSelectStyles}
          setLanguage={setLanguage}
        />
      </View>
      <Text style={styles.translationTextField}>
        Then open the camera and point it to different objects to get it's
        translation.
      </Text>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={{ backgroundColor: "#cf667f" }}
        title="Open Camera"
        onPress={() => loadNewTranslation()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  translationView: {
    flex: 1,
    padding: 20,
    height: "100%",
    marginHorizontal: 20,
    justifyContent: "space-around",
  },
  translationTextField: {
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    color: "grey",
    marginBottom: 50,
  },
  wordTextField: {
    textAlign: "left",
    fontSize: 20,
  },
  buttonContainer: {
    bottom: 130,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 3,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#cccccc",
  },
});

export default TranslationView;
