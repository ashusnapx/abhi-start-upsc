import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface SubjectPickerProps {
  subjects: any[];
  selectedSubject: string;
  onValueChange: (value: string) => void;
}

const SubjectPicker: React.FC<SubjectPickerProps> = ({
  subjects,
  selectedSubject,
  onValueChange,
}) => (
  <Picker
    selectedValue={selectedSubject}
    onValueChange={onValueChange}
    style={styles.picker}
  >
    <Picker.Item label='Select Subject' value='' />
    {subjects.map((subject) => (
      <Picker.Item
        key={subject.$id}
        label={subject.title}
        value={subject.$id}
      />
    ))}
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

export default SubjectPicker;
