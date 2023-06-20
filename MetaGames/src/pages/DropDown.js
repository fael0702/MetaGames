import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropDown = () => {
  const options = Array.from({ length: 11 }, (_, i) => ({ label: i.toString(), value: i }));

  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label: 'Selecione um valor', value: null }}
        items={options}
        onValueChange={(value) => console.log(value)}
        style={styles.picker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 10,
    },
    picker: {
      fontSize: 16,
      color: '#333',
    },
  });  

export default DropDown;