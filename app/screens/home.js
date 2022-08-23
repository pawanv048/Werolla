// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import { COLORS, SIZES } from '../constant/theme';
// import firebaseSetUp from '../context/setup';

// const Home = ({ navigation }) => {

//   //firebase phone otp
//   const { auth } = firebaseSetUp();
//   const [confirm, setConfirm] = useState(null)
//   const [code, setCode] = useState('')
// 7814

//   //Method to sign in with phone number
//   const signInPhoneNumber = async(phoneNumber) => {
//     const confirmation = await auth().signInPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   };

//   // confirm code

//   const confirmCode = async() => {
//     alert(code)
//     try {
//       await confirm.confirm(code);
//       alert('use singin successfully')
//     } catch (err) {
//       alert(JSON.stringify(err))
//     }
//   }

//   if (!confirm) {
//     return (
//       <View>
//         <Text>React native firebase Authencation</Text>
//         <Button title='Phone number singin' onPress={() => signInPhoneNumber('+917814315011')}/>
//           <Text>Phone number singin</Text>

//       </View>
//     )
//   }
//   return (
//     <View style={styles.mainContainer}>

//       <TextInput
//         style={{ width: "50%", height: 100}}
//         placeholder='enter otp'
//         value={code}
//         onChangeText={(text) => setCode(text)}
//       />
//       <Button onPress={() => confirmCode()} />
//       <Text>confirm otp</Text>
//     </View>
//   )
// }

// export default Home;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.darkgray
//   }
// })





import React, { useState,useEffect  } from 'react';
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

function Home() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');


  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user,'user')
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+917710622979')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default Home;













// import React, { useState, useEffect, useRef } from 'react'
// import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, keyboardType, TouchableOpacity } from 'react-native';


// const Home = () => {
//   const lengthInput = 6;
//   let textInput = useRef(null);
//   const defaultCountdown = 30;
//   const [internalVal, setInternalValue] = useState("")
//   const [countdown, setCountdown] = useState(defaultCountdown)

//   const onChangeText = (val) => {
//     setInternalValue(val)
//   }

//   const onResendOTP = () => {
//     if(enableResend){
//       setCountdown(defaultCountdown)
//       setEnableResend(false)
//     }
//   }

//   useEffect(() => {
//     textInput.focus()
//   }, [])

//   return (
//     <View style={styles.container}>
//       <KeyboardAvoidingView
//         keyboardVerticalOffset={50}
//         behavior={'padding'}
//         style={styles.containerAvodingView}
//       >
//         <Text style={styles.titleStyle}>{'Input your otp code via SMS'}</Text>
//         <View>
//           <TextInput
//             ref={(input) => textInput = input}
//             onChangeText={onChangeText}
//             style={{ width: 0, height: 0 }}
//             value={internalVal}
//             maxLength={lengthInput}
//             returnKeyType='done'
//             keyboardType='numeric'
//           />
//           <View style={styles.containerInput}>
//             {
//               Array(lengthInput).fill().map((data, index) => (
//                 <View 
//                   key={index}
//                   style={[styles.cellView,
//                     {
//                       borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DB7'
//                     }
//                   ]}

//                 >
//                   <Text style={styles.cellText}
//                     onPress={() => textInput.focus()}
//                   >
//                     {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                    
//                   </Text>
//                 </View>
//               ))
//             }
//           </View>
//         </View>

//         <View style={styles.bottomView}>
//           <TouchableOpacity>
//             <View style={{flexDirection: 'row', }}>
//               <Text style={{ marginRight: 40}}>change number</Text>
//               <Text>Resend code</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   containerAvodingView: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10
//   },
//   titleStyle: {
//     marginTop: 50,
//     marginBottom: 50,
//     fontSize: 16
//   },
//   containerInput: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   cellView: {
//     paddingVertical: 11,
//     width: 40,
//     margin: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 1.5
//   },
//   cellText: {
//     textAlign: 'center',
//     fontSize: 16
//   },
//   bottomView:{
//     flexDirection: 'row',
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginBottom: 50,
//     alignItems: 'center'
//   }
// })


