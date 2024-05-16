// import statement
import React, { useState } from 'react';
import { View, Text,  StyleSheet , Button, ScrollView} from 'react-native';
// component 
import Input from '../components/Input';
import { Colors } from '../constant/styles';
// start
const Profile = () => {
  // state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState('');
  const [city , setCity] = useState('');
  const [info, setInfo] = useState('');

  const handleUpdate = () => {
  };

  return (
    <ScrollView style={styles.login}>
      <Text style={styles.title}>Profile</Text>
      <Input
        label="Username"
        textInputConfig={{
          value: username,
          onChangeText: setUsername,
          keyboardType: 'default',
        }}
        style={styles.input}
        />
      <Input
        label="Email"
        textInputConfig={{
          value: email,
          onChangeText: setEmail,
          keyboardType: 'email-address',
        }}
        style={styles.input}
        />
      <Input
        label="Members"
        textInputConfig={{
          value: members,
          onChangeText: setMembers,
          keyboardType: 'default',
        }}
        style={styles.input}
      />
      <Input
        label="City"
        textInputConfig={{
          value: city,
          onChangeText: setCity,
          keyboardType: 'default',
        }}
        style={styles.input}
      />
      <Input
        label="Info"
        textInputConfig={{
          value: info,
          onChangeText: setInfo,
          keyboardType: 'default',
        }}
        style={[styles.input , styles.textArea]}
      />
      <View style={styles.button}>
        <Button title="Update Profile" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
};

export default Profile;

// styles
const styles = StyleSheet.create({
    login: {
        marginTop: 35,
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
        width: "50%"
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