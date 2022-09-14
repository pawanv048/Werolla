import React, { useState, useStrings } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   Platform,
   TouchableOpacity,
   Alert,
   Modal,
   TouchableWithoutFeedback,
   ScrollView,
} from 'react-native';
import { COLORS, SIZES } from '../constant/theme';
import Countries from '../assets/others/countries.json';

const CustomInput = props => {
   const {
      value,
      onChangeText,
      textAlign,
      autoCapitalize,
      placeholder,
      keyboardType,
      secureTextEntry,
      error,
      onFocus,
      selectCountry,
      selectedCountry,
      setSelectedCountry,
   } = props;

   const [isFocus, setIsFocus] = React.useState(false);
   const [showPhoneModal, setShowPhoneModal] = React.useState(false);
   //   const [strings] = useStrings(); //
   const [data, setData] = useState(Countries);
   const [search, setSearch] = useState('');

   const handleSearchInput = e => {
      let text = e.toLowerCase();
      let fullList = Countries;
      let filteredList = fullList.filter(item => {
         //search from a full list, and not from a previous search results
         if (item.title.toLowerCase().includes(text)) return item;
      });
      if (!text || text === '') {
         setData(fullList);
      } else if (!filteredList.length) {
         setData([]);
      } else if (Array.isArray(filteredList)) {
         setData(filteredList);
      }
   };

   function countryCodeModal() {
      return (
         <Modal animationType="slide" transparent={true} visible={showPhoneModal}>
            <TouchableWithoutFeedback
            // onPress={() => setShowPhoneModal(false)}
            >
               <View
                  style={{
                     flex: 1,
                     alignItems: 'center',
                     marginTop: SIZES.height * 0.05,
                     //backgroundColor: 'rgba(0,0,0,0.5)'
                  }}>
                  <View
                     style={{
                        height: SIZES.height * 0.9,
                        width: SIZES.width * 0.75,
                        backgroundColor: 'white',
                        borderRadius: SIZES.radius,
                     }}>
                     <View
                        style={{
                           paddingVertical: 20,
                           paddingHorizontal: 20,
                           height: '100%',
                           width: '100%',
                        }}>
                        <Text
                           style={{
                              marginBottom: 15,
                              fontSize: 11,
                              color: '#aaa',
                              fontStyle: 'italic',
                           }}>
                           Select Country Code
                        </Text>
                        <View
                           style={{
                              backgroundColor: '#D6D9EF',
                              padding: Platform.OS == 'ios' ? 10 : 0,
                              paddingHorizontal: 20,
                              borderRadius: 30,
                              marginBottom: 15,
                              height: 50,
                              //   width: 120,
                           }}>
                           <TextInput
                              value={search}
                              style={{
                                 fontSize: 16,
                                 textAlign: 'left',
                                 height: 50,
                              }}
                              onChangeText={val => {
                                 let text = val.replace(/[^0-9a-zA-Z+ ]/g, '');
                                 handleSearchInput(text);
                                 setSearch(text);
                              }}
                              placeholder="Search.."
                              placeholderTextColor="#bbb"
                              keyboardType="name-phone-pad"
                           />
                        </View>
                        <ScrollView>
                           {data.length == 0 ? (
                              <Text style={{ alignItems: 'center', paddingVertical: 15 }}>
                                 No Data Found
                              </Text>
                           ) : (
                              <React.Fragment>
                                 {data.map((c, i) => (
                                    <TouchableOpacity
                                       key={i}
                                       onPress={() => {
                                          setSelectedCountry(c);
                                          setData(Countries);
                                          setSearch('');
                                          setShowPhoneModal(false);
                                       }}>
                                       <OptionTitle data={c} />
                                       <View
                                          style={{
                                             height: 1,
                                             backgroundColor: '#ddd',
                                             marginVertical: 15,
                                          }}></View>
                                    </TouchableOpacity>
                                 ))}
                              </React.Fragment>
                           )}
                        </ScrollView>
                     </View>
                  </View>
               </View>
            </TouchableWithoutFeedback>
         </Modal>
      );
   }

   return (
      <View
      
         style={[
            styles.container,
            {
               borderColor: error ? 'red' : isFocus ? 'darkblue' : 'white',
            },
         ]}>
         <View
            style={{
               flex: 1,
               flexDirection: 'row',
               //   backgroundColor: 'pink',
               width: '100%',
               alignItems: 'center',
               justifyContent: 'center',
            }}>
            {selectCountry && (
               <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => setShowPhoneModal(true)}>
                  <Text
                     style={{ fontSize: 14 }}>{`+${selectedCountry?.phonecode}`}</Text>
               </TouchableOpacity>
            )}
            <TextInput
               autoCorrect={false}
               autoCapitalize="none"
               keyboardType={keyboardType}
               value={value}
               onChangeText={onChangeText}
               placeholder={placeholder}
               textAlign="center"
               style={styles.input}
               onFocus={() => {
                  onFocus();
                  setIsFocus(true);
               }}
               onBlur={() => {
                  setIsFocus(false);
               }}
               secureTextEntry={secureTextEntry}
               {...props.inputProps}
            />
         </View >
         <View style={{ position: 'absolute', top: 50 }}>
            {error && (
               <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{error}</Text>
            )}
         </View>

         {countryCodeModal()}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#D6D9EF',
      width: '90%',
      height: Platform.OS === 'ios' ? 60 : 55,
      borderWidth: 2.5,
      borderRadius: 12,
      marginVertical: Platform.OS === 'ios' ? 10 : 13,
      alignItems: 'center',

      // justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
   },
   input: {
      fontSize: 14,
      padding: 0,
      margin: 0
   },
});

export default CustomInput;

const OptionTitle = ({ data }) => {
   return (
      <View
         style={{
            height: 30,
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
         }}>
         <Text
            style={{
               marginRight: 20,
            }}>
            {data?.title}
         </Text>
      </View>
   );
};