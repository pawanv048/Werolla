import React, { useState } from 'react';
import { COLORS, SIZES } from '../constant/theme';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import icons from '../constant/icons';
import CustomRecipients from '../custom/CustomRecipients';
import ServiceInput from '../custom/ServiceInput';


let isSelected = false;

const SendMoney = () => {

  const [textMode, setTextMode] = useState('chart')

  // SCREEN HEADER 

  function renderHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        marginVertical: SIZES.padding * 2,
        marginHorizontal: SIZES.padding * 2,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          //backgroundColor: 'red'
        }}>
          <Image source={icons.menu}
            style={{
              width: 25,
              height: 25
            }}
          />
          <Text style={styles.sendtxt}>Send Money</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={icons.plus}
            style={{
              width: 17,
              height: 17
            }}
          />
          <Text style={styles.billtxt}>Add bill</Text>
          <Image source={icons.filter}
            style={{
              width: 17,
              height: 17
            }}
          />
        </View>

      </View>
    )
  };

  // SELECTED CARDIT CARD 

  function renderSelectedCard() {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: SIZES.padding * 2,
        }}>
          <TouchableWithoutFeedback onPress={() => setTextMode('chart')}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Jost-Medium',
                color: textMode == 'chart' ? '#231955' : null
              }}>
              CARD
            </Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setTextMode('list')}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Jost-Medium',
                color: textMode == 'list' ? '#231955' : null
              }}>
              BANK
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View>
          <Text style={styles.selectTxt}>SELECT CREDIT CARD</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: SIZES.padding,
            marginHorizontal: 10,
            justifyContent: 'space-evenly',
          }}
        >
          <View style={styles.card}>
            <Text style={styles.selectCard}>VISA CARD</Text>
            <Text style={styles.selectCardNo}>123 456 789</Text>
          </View>
          <View style={{
            backgroundColor: '#D2D4D7',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            width: 150,
            height: 120
          }}>
            <TouchableOpacity onPress={() => console.log('addcard')}>
              <Image source={icons.addcard}
                  style={{
                    width: 13,
                    height: 13,
                    margin: 3
                  }}
              />
            </TouchableOpacity>
            <Text style={[styles.selectCard, styles.addcardtxt]}>ADD CARD</Text>
          </View>
        </View>
        <View style={{ marginVertical: SIZES.padding * 0.5, }}>
          <Text style={styles.selectTxt}>RECIPIENTS</Text>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <CustomRecipients />
            <CustomRecipients />
            <CustomRecipients />
            <CustomRecipients />
            <CustomRecipients />
            <CustomRecipients />
          </View>
        </View>
      </View>
    )
  };


  // Transaction Details

  function renderTransactionDetails() {
    return (
      <View>
        <View>
          <Text style={styles.selectTxt}>TRANSACTION DETAILS</Text>
        </View>
        <View>
          <ServiceInput
            textAlign='center'
            placeholder='Enter Amount'
            keyboardType='numeric'
          />
          <ServiceInput
            textAlign='center'
            placeholder='Description(Optional)'
          />
          <TouchableOpacity style={styles.cnfBtn}>
            <Text style={styles.confirmtxt}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  // Main Screen

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 20}
      style={{ flex: 1 }}
    >
      <View style={styles.mainContainer}>
        {renderHeader()}
        <ScrollView>
          {renderSelectedCard()}
          {renderTransactionDetails()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
};

export default SendMoney

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#F0F5F8'
  },
  sendtxt: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Jost-Medium',
    color: COLORS.primary
  }, 
  billtxt: {
    marginHorizontal: 5,
    marginRight: 17,
    fontFamily: 'Jost-Regular',
    color: COLORS.primary
  },
  card: {
    backgroundColor: '#231955',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 150,
    height: 120
  },
  cnfBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.padding * 2,
    marginVertical: SIZES.padding2 * 0.5,
    paddingVertical: SIZES.padding * 0.5,
    width: '84%',
    backgroundColor: '#FFAC3E',
    alignSelf: 'center',
    borderRadius: 5
  },
  confirmtxt: {
    fontFamily: 'Jost-Medium',
    fontSize: 20,
    color: '#1B1D76'
  },
  selectTxt: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Jost-Medium',
    color: '#181D54'
  },
  selectCard: {
    color: '#fff',
    fontFamily: 'Jost-Medium',
    fontSize: 10,

  },
  selectCardNo: {
    color: '#fff',
    fontFamily: 'Jost-Medium',
    fontSize: 8,
    marginTop: 5
  },
  addcardtxt: {
    color: '#181D54',
    fontWeight: 'bold'
  }
})