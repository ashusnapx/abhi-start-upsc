import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder?: string;
  data: string[]; // List of data for suggestions
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  data,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (text: string) => {
    setSearchTerm(text);
    if (text.trim()) {
      const lowercasedText = text.toLowerCase();
      const suggestions = data.filter((item) =>
        item.toLowerCase().includes(lowercasedText)
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
    onSearch(text);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <View className='relative'>
      <View className='flex-row items-center border border-gray-300 rounded-full p-2 bg-white mb-4'>
        <TextInput
          value={searchTerm}
          onChangeText={handleChange}
          placeholder={placeholder}
          className='flex-1 px-4 py-2 text-base text-gray-700'
        />
        <TouchableOpacity onPress={() => onSearch(searchTerm)} className='p-2'>
          <FontAwesome name='search' size={20} color='gray' />
        </TouchableOpacity>
      </View>
      {filteredSuggestions.length > 0 && (
        <View className='absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1'>
          <FlatList
            data={filteredSuggestions}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectSuggestion(item)}
                className='p-2 border-b border-gray-200'
              >
                <Text className='text-gray-700'>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;
