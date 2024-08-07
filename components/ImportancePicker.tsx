import React from "react";
import { Picker } from "@react-native-picker/picker";

interface ImportancePickerProps {
  selectedImportance: string;
  onValueChange: (value: string) => void;
}

const ImportancePicker = ({
  selectedImportance,
  onValueChange,
}: ImportancePickerProps) => (
  <Picker
    selectedValue={selectedImportance}
    onValueChange={onValueChange}
    className='text-white bg-gray-700 rounded-lg mb-4 p-3'
  >
    <Picker.Item label='Select Importance' value='' />
    <Picker.Item label='Pre' value='Pre' />
    <Picker.Item label='Mains' value='Mains' />
    <Picker.Item label='Pre + Mains' value='Pre + Mains' />
  </Picker>
);

export default ImportancePicker;
