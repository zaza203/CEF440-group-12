import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomDropdown = ({ title, data, onSelect, placeholder }) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setFilteredData(
      data.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleSelect = (item) => {
    setSearch(item);
    setDropdownVisible(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setDropdownVisible(true);
        }}
        className="font-psemibold text-base text-black-200 h-25"
      />
      <FontAwesome
        name="caret-down"
        size={24}
        color="black"
        style={styles.icon}
      />
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    height: 50,
    marginTop: 10,
    marginHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    width: '100%',
    maxHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  item: {
    padding: 10,
  },
});

export default CustomDropdown;
