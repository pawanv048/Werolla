import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
// import RNOtpVerify from 'react-native-otp-verify';
const Home = () => {

//   const [otp, setOtp] = useState('')

//   useEffect(() => {
//     RNOtpVerify.getHash()
//       .then(console.log)
//       .catch(console.log);

//     RNOtpVerify.getOtp()
//       .then(p => RNOtpVerify.addListener(otpHandler))
//       .catch(p => console.log(p));
  
// }, [])

// const otpHandler = (message) => {
//   const lotp = /(\d{6})/g.exec(message)[1];
//   setOtp({ lotp });
// }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>jkdfhjkd</Text>
      <Text></Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})







// npm install react-native-otp-autocomplete --save

// import OtpAutocomplete from 'react-native-otp-autocomplete';

// const getHash = () =>
//     OtpAutocomplete.getHash()
//     .then(console.log)
//     .catch(console.log);

// const startListeningForOtp = () =>
//     OtpAutocomplete.getOtp()
//     .then(p => OtpAutocomplete.addListener(otpHandler))
//     .catch(p => console.log(p));

// const otpHandler = (message: string) => {
//         const otp = /(\d{4})/g.exec(message)[1];
//         this.setState({ otp });
//         OtpAutocomplete.removeListener();
//         Keyboard.dismiss();
// }

// useEffet(() => {
//     startListeningForOtp();

//     return () => OtpAutocomplete.removeListener();
// }, [startListeningForOtp]);