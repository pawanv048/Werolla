import React, { useContext, useState } from 'react';
import icons from '../constant/icons';
import images from '../constant/images';
import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Strings from '../constant/strings';
import Loader from '../custom/Loader';
import Toast from 'react-native-simple-toast';

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
  Alert,
  Dimensions
} from 'react-native';


const Login = ({ navigation }) => {

  // let uname = localPhoneValue || '';
  // let upassword = localPasswordValue || '';
  const [password, setPassword] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    phone: '',
    password: '',
  })


  const login = async () => {
    setLoading(true)
    var form = new FormData();

    form.append("PhoneNo", inputs.phone);
    form.append("Password", inputs.password);

    await fetch('https://moduleszone.com/API/User/login.php', { method: 'POST', body: form })
      .then((response) => {
        return response.json();
      }).then((response) => {
        setLoading(false)
        // setTimeout(() => {
        //     setLoading(false)
        // }, 3000)
        //console.log(response);
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

    if (isValid) {
      login();
    }
  };

  // const sdfdsfs = () => {
  //     setLoading(true)
  //     setTimeout(async() => {
  //         setLoading(false)
  //         var form = new FormData();

  //     form.append("PhoneNo", inputs.phone);
  //     form.append("Password", inputs.password);
  //         let userData = form;
  //         //console.log(userData);
  //         if(userData){
  //             //userData = JSON.stringify(responseJson.body);
  //             //userData = JSON.parse(userData);
  //             //alert(userData); 
  //             if(inputs.phone == userData.phone && userData.password){
  //                 AsyncStorage.setItem('user', JSON.stringify({...userData, loadingIn: true}));
  //                 console.log('navigate to home screen')
  //             }else{
  //                 Alert.alert('Error', 'Invalid Details')
  //             }
  //         }else{
  //             Alert.alert('Error', 'User does not exist')
  //         }

  //     }, 3000)
  // };



  const [errors, setErrors] = useState({});

  //handle user change inputs
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));

  }

  // Error Messages
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  }

  function renderHeader() {
    return (
      <React.Fragment>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={icons.back} style={{ width: 20, height: 20, tintColor: 'white' }} resizeMode='contain' />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headertxt}>Login</Text>
          </View>
        </View>
      </React.Fragment>
    )
  }

  function renderLogin() {
    return (
      <ImageBackground source={images.backgroundImag} style={{ height: Dimensions.get('window').height, flex: 1 }} resizeMode='cover'>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ flex: 1 }}>

            <View style={{ alignItems: 'center' }}>
              <Image source={images.doller}
                style={styles.dollerImg}
              />


              {/* Phone number */}
              <CustomInput
                placeholder='Phone Number'
                //keyboardType="default"
                onChangeText={text => handleOnChange(text, 'phone')}
                error={errors.phone}
                onFocus={() => {
                  handleError(null, 'phone')
                }}
              />

              {/* Password number */}
              <CustomInput
                placeholder='Password'
                onChangeText={text => handleOnChange(text, 'password')}
                error={errors.password}
                onFocus={() => {
                  handleError(null, 'password')
                }}
                secureTextEntry
              />

              {/* Remember */}
              <View style={{
                flexDirection: 'row',
                //marginHorizontal: 30,
                marginVertical: 20,
                alignItems: 'center'

              }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
                />
                <Text style={styles.termTxt}>{Strings.t4}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
                  <Text style={[styles.termTxt, { marginLeft: 110, }]}>{Strings.t5}</Text>
                </TouchableOpacity>
              </View>

              {/* LoginButton */}
              <CustomButton text="Login" onPress={validate} />

              {/* user Login */}
              <View style={{ flexDirection: 'row', marginVertical: 25 }}>
                <Text style={styles.termTxt}>{Strings.t6}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('register')}>
                  <Text style={[styles.termTxt, { fontWeight: '700' }]}>{Strings.t7}</Text>
                </TouchableOpacity>
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
      {renderLogin()}
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 80,
    backgroundColor: '#162972',
    paddingHorizontal: 20,
    alignItems: 'center',

  },
  headertxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: -15,
    alignSelf: 'center'
    //marginLeft: 130
  },
  dollerImg: {
    width: '65%',
    height: 150,
    marginVertical: 40
    //alignSelf: 'center',
  },
  termTxt: {
    color: '#162972',
    paddingLeft: 5,
  },
})