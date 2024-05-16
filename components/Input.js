import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Colors } from "../constant/styles";
import { useTranslation } from "react-i18next";

const Input = ({ required, label, invalid, textInputConfig, style }) => {
  const { t } = useTranslation();

  const inputStyles = [styles.input, style];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.inputInvalid);
  }

  return (
    <View style={[styles.inputContainer]}>
      <View style={styles.flex}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.req}>{required && "*"}</Text>
      </View>
      <TextInput {...textInputConfig} style={inputStyles} />
      {invalid && (
        <Text style={styles.textErr}>
          {label} {t("req")}
        </Text>
      )}
    </View>
  );
};

export default Input;
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    fontSize: 18,
    color: "#000",
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  inputInvalid: {
    borderColor: Colors.errorColor,
  },
  textErr: {
    color: Colors.errorColor,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  req: {
    color: Colors.errorColor,
    marginLeft: 5,
    marginBottom: 8,
  },
});