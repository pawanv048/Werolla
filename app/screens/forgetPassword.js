import React, { useState } from 'react';
import icons from '../constant/icons';
import images from '../constant/images';
import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';
import Loader from '../custom/Loader';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import * as Strings from '../constant/strings';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Keyboard,
  Dimensions,
  Alert
} from 'react-native';

const ForgetPassword = ({ navigation }) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setcomfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    phone: '',
    password: '',
    cmpassword: ''
  });


  //https://moduleszone.com/API/User/forgot_password.php
  //PhoneNo,Password,confirm_Password


  const postDataForgotDetails = async () => {
    setLoading(true)
    var form = new FormData();
    form.append("PhoneNo", inputs.phone);
    form.append("Password", inputs.password);
    form.append("confirm_Password", inputs.cmpassword);
   
    await fetch('https://moduleszone.com/API/User/forgot_password.php', { method: 'POST', body: form })
        .then((response) => {
            return response.json();
        }).then((response) => {
            setLoading(false)
            if (response.status) {
                console.log(response.message)
               
                navigation.navigate('home')
            } else {
                console.log(response.message)
                Alert.alert('Error', 'User does not exist')
            }
        }).catch((error) => {
            console.log(error)
        })
};

  const [errors, setErrors] = useState({});

  //handle user change inputs
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));

  }

  // Error Messages
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  }

  // validation for forget password

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 7) {
      handleError('Min password length of 7', 'password');
      isValid = false;
    }

    if (!inputs.cmpassword) {
      handleError('Please input confirm password', 'cmpassword');
      isValid = false;
    } else if (inputs.cmpassword.length < 7) {
      handleError('Min confirm password length of 7', 'cmpassword');
      isValid = false;
    } else if(inputs.password === inputs.cmpassword){
      handleError('Password and Confirm password are not same')
      isValid = false;
    }

    if (isValid) {
      postDataForgotDetails();
    }
  };

  // const forgotPassword = () => {
  //   //console.log('popup otp screen')
  //   //navigation.navigate('home')
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //     try {
  //       makerequest()
  //     } catch (error) {
  //       Alert.alert('something went wrong')
  //     }
  //   }, 3000)
  // };


  function renderHeader() {
    return (
      <React.Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ position: 'absolute', left: 20}}>
            <Image source={icons.back} style={{ width: 20, height: 20, tintColor: 'white' }} resizeMode='cover' />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.headertxt}>Forgot Password</Text>
          </View>
        </View>
      </React.Fragment>
    )
  }

  function renderForgetScreen() {
    return (
      <ImageBackground source={images.backgroundImag}
        style={{ flex: 1, justifyContent: 'center', resizeMode: 'cover', height: Dimensions.get('window').height }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>

            <View style={{ alignItems: 'center' }}>
              <Image source={images.doller}
                style={styles.dollerImg}
              />
              {/* Phone number */}
              <CustomInput placeholder='Phone number'
                keyboardType="default"
                onChangeText={text => handleOnChange(text, 'phone')}
                error={errors.phone}
                onFocus={() => {
                  handleError(null, 'phone')
                }}
              />
              {/* New Password */}
              <CustomInput
                placeholder='Password'
                // value={password}
                onChangeText={text => handleOnChange(text, 'password')}
                error={errors.password}
                onFocus={() => {
                  handleError(null, 'Password')
                }}
                password
                secureTextEntry={true}
              />
              {/* Confirm Password number */}

              <CustomInput
                placeholder='Confirm Password'
                // value={password}
                onChangeText={text => handleOnChange(text, 'cmpassword')}
                error={errors.cmpassword}
                onFocus={() => {
                  handleError(null, 'cmpassword')
                }}
                cmpassword
                secureTextEntry={true}
              />
              {/* SaveButton */}
              <View style={styles.savePasswordBtn}>
                <CustomButton
                  text="Save Password"
                  //onPress={() => console.log('save button clicked')}
                  onPress={validate}
                />
              </View>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Loader visible={loading} />
      {renderHeader()}
      {renderForgetScreen()}
    </SafeAreaView>
  )
}

export default ForgetPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 80,
    backgroundColor: '#162972',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headertxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',

    //marginLeft: 95
  },
  dollerImg: {
    width: '65%',
    height: 150,
    marginVertical: 40,

    //alignSelf: 'center',
  },
  termTxt: {
    color: '#162972',
    paddingLeft: 5,
  },
  savePasswordBtn: {
    marginTop: 40,
    marginVertical: 25,
    width: '95%',
  }
})