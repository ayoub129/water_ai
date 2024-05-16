// import statement
import React, { useState } from 'react';
import { View, Text,  StyleSheet , Button} from 'react-native';
// component 
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constant/styles';
// start
const Register = () => {
  // state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const navigate = useNavigation()

  return (
    <View style={styles.login}>
      <Text style={styles.title}>Create An Account</Text>
      <Input
        label="Username"
        required
        textInputConfig={{
          value: username,
          onChangeText: setUsername,
          keyboardType: 'default',
        }}
        style={styles.input}
      />
      <Input
        label="Email"
        required
        textInputConfig={{
          value: email,
          onChangeText: setEmail,
          keyboardType: 'email-address',
        }}
        style={styles.input}
      />
      <Input
        label="Password"
        required
        textInputConfig={{
          value: password,
          onChangeText: setPassword,
          secureTextEntry: true,
        }}
        style={styles.input}

      />
      <View style={styles.button}>
        <Button title="Register" onPress={handleRegister} />
      </View>
      <View style={styles.register}>
        <Text style={styles.registerText}>Already have an account ?</Text>
        <Text style={[styles.registerText, styles.now]} onPress={() => navigate.navigate('Login')}>Login</Text>  
      </View>
    </View>
  );
};

export default Register;

// styles
const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white'
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