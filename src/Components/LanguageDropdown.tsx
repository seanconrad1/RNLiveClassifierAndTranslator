import React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

const showLanguageDropdown = ({
  language,
  pickerSelectStyles,
  setLanguage,
}) => {
  //if adding more languages, map codes from this list:
  // https://cloud.google.com/translate/docs/languages
  const availableLanguages = [
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "Hebrew", value: "he" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Arabic", value: "ar" },
    { label: "Chinese", value: "zh-CN" },
    { label: "German", value: "de" },
  ];

  return (
    <View>
      <RNPickerSelect
        placeholder={{}}
        onValueChange={(value) => setLanguage(value)}
        items={availableLanguages}
        value={language}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return (
            <Chevron
              style={{ marginTop: 20, marginRight: 15 }}
              size={1.5}
              color="gray"
            />
          );
        }}
      />
    </View>
  );
};

export default showLanguageDropdown;
