import React, { useState, useRef } from 'react';
import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';
import * as Strings from '../constant/strings';
import images from '../constant/images';
import icons from '../constant/icons';
import CheckBox from '@react-native-community/checkbox';
import PhoneInput from 'react-native-phone-number-input';
import Loader from '../custom/Loader';
import auth from '@react-native-firebase/auth';
import { COLORS, SIZES } from '../constant/theme';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  Dimensions,
  Platform,
  TextInput,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';


const Register = ({ navigation }) => {


  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [mesg, setmesg] = useState('')

  const [loading, setLoading] = useState(false)
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false)

  const [inputs, setInputs] = useState({
    yourName: '',
    email: '',
    phone: '',
    password: '',
  });


  const postDataUserDetail = async () => {
    var form = new FormData();
    form.append("UserName", inputs.yourName);
    form.append("Email", inputs.email);
    form.append("PhoneNo", inputs.phone);
    form.append("FirstName", inputs.yourName);
    form.append("LastName", inputs.yourName);
    form.append("Password", inputs.password);

    await fetch('https://moduleszone.com/API/User/signup.php', { method: 'POST', body: form })
      .then((response) => {
        return response.json();
      }).then((response) => {
        //console.log(response);
        if (response.status) {
          // navigation.navigate('login')
          setModelVisible(true)
          console.log('Registration Successful. Please Login to proceed')
        } else {
          console.log(response.message)
        }
      }).catch((error) => {
        console.log(error)
      })
  };


  // Validate user details
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.yourName) {
      handleError('Please input fullname', 'yourName');
      isValid = false;
    }

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
    if (!toggleCheckBox) {
      handleError('Please agree with Privacy Policy', 'mesg');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const register = () => {
    //console.log('popup otp screen')
    //navigation.navigate('home')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      try {
        postDataUserDetail()
      } catch (error) {
        Alert.alert('something went wrong')
      }
    }, 3000)
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


  // 
  function renderHeader() {
    return (
      <React.Fragment>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.back} style={{ width: 20, height: 20, tintColor: 'white' }} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.headertxt} >Register</Text>
          </View>
        </View>
      </React.Fragment>
    )
  };

  function renderRegisterForm() {

    return (
      <ImageBackground
        source={images.backgroundImag}
        style={{ height: Dimensions.get('window').height, flex: 1 }}
        resizeMode='cover'
      >

        <ScrollView contentContainerStyle={{ paddingBottom: 5 }} showsVerticalScrollIndicator={false}>
          <View>

            {/* User Register Form */}
            <View style={{ alignItems: 'center' }}>
              <Image source={images.doller}
                style={styles.dollerImg}
              />

              <CustomInput placeholder='Your name'
                onChangeText={text => handleOnChange(text, 'yourName')}
                error={errors.yourName}
                onFocus={() => {
                  handleError(null, 'yourName')
                }}
              />
              <CustomInput placeholder='Enter email'
                onChangeText={text => handleOnChange(text, 'email')}
                error={errors.email}
                onFocus={() => {
                  handleError(null, 'email')
                }}
              />

              {/* Phone Number */}
              <CustomInput placeholder='Phone number'
                keyboardType="default"
                onChangeText={text => handleOnChange(text, 'phone')}
                error={errors.phone}
                onFocus={() => {
                  handleError(null, 'phone')
                }}
              />

              <CustomInput
                placeholder='password'
                // value={password}
                onChangeText={text => handleOnChange(text, 'password')}
                error={errors.password}
                onFocus={() => {
                  handleError(null, 'password')
                }}
                password
                secureTextEntry={true}
              />

              {/* Terms and conditions */}
              <View style={{ flexDirection: 'row', marginHorizontal: 30, marginVertical: 25 }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}

                />
                <Text style={styles.termTxt}>{Strings.t1}</Text>
              </View>
              {/* validate */}
              {/* setModelVisible(true) */}

              <CustomButton
                text="Register"
                onPress={validate}
                disabled={!toggleCheckBox}
              />

              {/* <Button title='show model' onPress={() => console.log('showmodel')}/> */}

              {/* user Login */}
              <View style={{ flexDirection: 'row', marginVertical: 25 }}>
                <Text style={styles.termTxt}>{Strings.t2}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                  <Text style={[styles.termTxt, { fontWeight: '700' }]}>{Strings.t3}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    )
  };


  // Show otp varification model
  const [modelVisible, setModelVisible] = useState(false)

  function renderOtpModel() {
    let textInput = useRef(null)
    const lengthInput = 6;
    const [internalVal, setInternalValue] = useState("")


    const onChangeText = (val) => {
      setInternalValue(val)
    }

    // React.useEffect(() => {
    //   textInput.focus()
    // },[])

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modelVisible}
      >
        <TouchableWithoutFeedback
        // onPress={() => setmMdelVisible(true)}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                height: 600,
                width: SIZES.width * 0.75,
                backgroundColor: 'white',
                borderRadius: SIZES.radius
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Image source={images.verify} 
                style={{ 
                  width: 120, 
                  height: 120, 
                  backgroundColor: 'white', 
                  marginVertical: 25 
                }} />
                <Text 
                style={{ 
                  fontWeight: 'bold', 
                  color: 'black', 
                  fontSize: 18 
                  }}>Verification</Text>
                <Text 
                style={{ 
                  padding: 10, 
                  marginHorizontal: 30, 
                  textAlign: 'center' 
                  }}>Enter 6 digit code sent to your phone number</Text>
              </View>

              <View>
                <TextInput
                  ref={(input) => textInput = input}
                  onChangeText={onChangeText}
                  style={{ width: 0, height: 0 }}
                  value={internalVal}  
                  maxLength={lengthInput}
                  returnKeyType="done"
                  keyboardType='numeric'
                />
                <View style={styles.containerInput}>
                  {
                    Array(lengthInput).fill().map((data, index) => (
                      <View
                        key={index}
                        style={styles.cellView}
                      >
                        <Text
                          style={styles.cellText}
                          onPress={() => textInput.focus()}
                        >
                          {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                        </Text>
                      </View>
                    ))
                  }
                </View>
              </View>
              <View style={{ alignItems: 'center', marginTop: 80 }}>
                <Text style={{ color: 'black', fontSize: 16 }}>I didn't receive the code</Text>
                <TouchableOpacity style={styles.resendBtn}
                  onPress={() => setModelVisible(false)}
                >
                  <Text style={{ color: 'white' }}>Resend Code</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.verifyBtn}
                //onPress={() => confirmCode()}
                >
                  <Text style={{ color: 'white', fontSize: 20 }}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  };


  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={loading} />
      {renderHeader()}
      {renderRegisterForm()}
      {renderOtpModel()}
    </SafeAreaView>

  )
}

export default Register;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: '#162972',
    paddingHorizontal: 20,
    // paddingLeft: 20
    alignItems: 'center',
  },
  headertxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    //marginLeft: 130
  },
  termTxt: {
    color: '#162972',
    paddingLeft: 10,
    fontWeight: '400'
  },
  dollerImg: {
    width: '60%',
    height: 150,
    marginVertical: 20
    //alignSelf: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  cellView: {
    paddingVertical: 11,
    width: 30,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16
  },
  resendBtn: {
    backgroundColor: 'darkblue',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginTop: 8,
    elevation: 5
  },
  verifyBtn: {
    backgroundColor: "#DA9F46",
    paddingHorizontal: 95,
    paddingVertical: 13,
    borderRadius: 8,
    elevation: 5,
    marginTop: 10
  }

})


