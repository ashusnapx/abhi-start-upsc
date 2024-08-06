import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface ImportancePickerProps {
  selectedImportance: string;
  onValueChange: (value: string) => void;
}

const ImportancePicker: React.FC<ImportancePickerProps> = ({
  selectedImportance,
  onValueChange,
}) => (
  <Picker
    selectedValue={selectedImportance}
    onValueChange={onValueChange}
    style={styles.picker}
  >
    <Picker.Item label='Select Importance' value='' />
    <Picker.Item label='Pre' value='Pre' />
    <Picker.Item label='Mains' value='Mains' />
    <Picker.Item label='Pre + Mains' value='Pre + Mains' />
  </Picker>
);

const styles = StyleSheet.create({
  picker: {
    color: "white",
    backgroundColor: "gray",
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default ImportancePicker;
