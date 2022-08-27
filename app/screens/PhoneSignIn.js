import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(res => {
        setConfirm(res);
        console.log(res);
      })
      .catch(e => Alert.alert('erroe', e.message));
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
      throw new Error(error);
    }
  }

  const verifyOtp = () => {
    confirmCode()
      .then(() => {
        Alert.alert('Success', 'Otp Verified!');
      })
      .catch(e => Alert.alert('Error', e.message));
  };

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+91 78143 15011')}
      />
    );
  }

  return (
    <>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        style={styles.input}
      />
      <Button title="Confirm Code" onPress={verifyOtp} />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    marginVertical: 10,
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
  },
});
