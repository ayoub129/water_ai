// import statement
import React, { useState } from 'react';
import { View, Text,  StyleSheet , Button, ScrollView} from 'react-native';
// component 
import Input from '../components/Input';
import { Colors } from '../constant/styles';
// start
const Sensor = () => {
  // state
  const [consumption, setConsumption] = useState('');

  const createConsumption = () => {
  };

  return (
    <ScrollView style={styles.login}>
      <Text style={styles.title}>Add consumption </Text>
      <Input
        label="Consumption (by Litre)"
        textInputConfig={{
          value: consumption,
          onChangeText: setConsumption,
          keyboardType: 'default',
        }}
        style={styles.input}
      />
      <View style={styles.button}>
        <Button title="create consumption" onPress={createConsumption} />
      </View>
    </ScrollView>
  );
};

export default Sensor;

// styles
const styles = StyleSheet.create({
    login: {
        paddingTop: 100,
        padding: 20,
        backgroundColor: 'white'
    },
    textArea: {
      width: '100%',
      height: 150
    },
    title: {
        fontSize: 33,
        fontWeight: '500',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
      marginTop: 20,
      marginVertical: 20,
      borderRadius: 12,
    },
    register: {
      flexDirection: 'row',
    },
    registerText: {
      marginHorizontal: 5,
      fontWeight: 'bold',
    },
    now: {
      color: Colors.primaryColor
    }
})