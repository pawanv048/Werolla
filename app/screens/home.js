import React, { useRef, useState } from 'react';
import ServiceButton from '../custom/ServiceButton';
import icons from '../constant/icons';
import images from '../constant/images';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Animated,
  PanResponder,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native';
import { COLORS, SIZES } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';


const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.7;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWORD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; //navigation number
const MAX_DOWNWORD_TRANSLATE_Y = 0;


const transactionHistory = [
  {
    id: 1,
    nicename: "Cassius Stuart",
    date: "March20, 2022",
    amount: "+$7000",
    img: icons.wallet,
  },
  {
    id: 2,
    nicename: "Cassius Stuart",
    date: "March20, 2022",
    amount: "+$7000",
    img: icons.wallet
  },
  {
    id: 3,
    nicename: "Cassius Stuart",
    date: "March20, 2022",
    amount: "+$7000",
    img: icons.wallet,
    
  }
];

const Home = () => {

  const navigation = useNavigation();

  const onNotificationPressed = () => {
    navigation.navigate('notification')
  }

  const onSearchPressed = () => {
    navigation.navigate('features')
  }

//MARK: Slide sheet

  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy)
      },
      onPanResponderRelease: (e, gesture) => {
        lastGestureDy.current += gesture.dy;
        if (lastGestureDy.current < MAX_UPWORD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWORD_TRANSLATE_Y;
        } else {
          lastGestureDy.current = MAX_DOWNWORD_TRANSLATE_Y;
        }
      },
    })
  ).current

  const bottomSheetAnimation = {
    transform: [{
      translateY: animatedValue.interpolate({
        inputRange: [MAX_UPWORD_TRANSLATE_Y, MAX_DOWNWORD_TRANSLATE_Y],
        outputRange: [MAX_UPWORD_TRANSLATE_Y, MAX_DOWNWORD_TRANSLATE_Y],
        extrapolate: 'clamp'
      })
    }],
  }

  // Mark: Transaction History 

  function renderTransactionHistory() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          paddingVertical: 12,
          backgroundColor: '#D8E2E5',
          borderRadius: 15
        }}
        onPress={() => console.log(item)}
      >
        <Image
          source={icons.men}
          style={{
            width: 30,
            height: 30,
            tintColor: '#EA912D',
            marginLeft: 15
          }}
        />
        <View style={{ flex: 1, marginLeft: 25 }}>
          <Text style={styles.nameTxt}>{item.nicename}</Text>
          <Text style={styles.dateTxt}>{item.date}</Text>
        </View>
        <View style={{
          position: 'absolute',
          right: 25
        }}>
          <Text style={styles.amountTxt}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
    )

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.transTxt}>TRANSITIONS HISTORY</Text>
        <FlatList
          contentContainerStyle={styles.status}
          data={transactionHistory}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  };

// MARK: user Menu

  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center'
          }}
        >
          <Image
            source={icons.menu}
            resizeMode='contain'
            style={{
              width: 23,
              height: 23,
              tintColor: 'white'
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            fontSize: 20,
            color: 'white',
            fontFamily: 'Jost-Medium',
            paddingLeft: 25
          }}>
            Cassius Stuart
          </Text>
        </View>
        <TouchableOpacity
        onPress={onSearchPressed}
          style={{
            width: 40,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center'
          }}
        >
          <Image
            source={icons.search}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20,
              tintColor: 'white'
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center'
          }}
          onPress={onNotificationPressed}
        >
          <Image
            source={icons.notification}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20,
              tintColor: 'white',

            }}
          />
        </TouchableOpacity>
      </View>
    )
  };

  // MARK: Current Balance

  function renderCurrentBalance() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View>
          <Text style={styles.countryTxt}>Country Ip Address</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => console.log('Edit')}>
          <Image
            source={images.profile}
            resizeMode='contain'
            style={{
              width: WINDOW_WIDTH * 0.5,
              height: WINDOW_HEIGHT * 0.18,
              
            }}
          />
        </TouchableWithoutFeedback>
        <View>
          <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Jost-Regular' }}>Current Balance</Text>
          <Text style={{ color: '#FFDD6B', alignSelf: 'center', fontSize: 23 }}>$00.00</Text>
        </View>
      </View>
    )
  };

  // MARK: Render Home screen

  return (
    
    <View style={styles.mainContainer}>
      
      {/* user profile */}
     
      {renderHeader()}
      {renderCurrentBalance()}
      {/* service profile */}
      
      
      <View style={styles.footer}>
        <View style={styles.dragArea}>
          <View style={styles.dragHandler} />
        </View>
        <Text style={styles.servicestxt}>SERVICES</Text>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          //marginHorizontal: 10,
          //paddingVertical: 10,
          //backgroundColor: 'red'
          //alignContent: 'center'
        }}>
          <ServiceButton
            
            source={icons.deposit}
            text='Deposit'
            onPress={() => console.log('service button pressed')}
          />
          <ServiceButton
            source={icons.send}
            text='Send'
            onPress={() => navigation.navigate('sendMoney')}
          />
          <ServiceButton
            source={icons.switcharrow}
            text='Receive'
            onPress={() => console.log('service button pressed')}
          />
          <ServiceButton
            source={icons.wallet}
            text='Wallet'
            onPress={() => console.log('service button pressed')}
          />
          <ServiceButton
            source={icons.bill}
            text='Pay Bills'
            onPress={() => navigation.navigate('paybill')}
          />
          <ServiceButton
            source={icons.scan}
            text='QR Code'
            onPress={() => console.log('service button pressed')}
          />
          <ServiceButton
            source={icons.mobilepay}
            text="Mobile Prepaid"
            onPress={() => console.log('service button pressed')}
          />
          <ServiceButton
            source={icons.event}
            text='Events'
            onPress={() => console.log('service button pressed')}
          />
          <ServiceButton
            source={icons.viewall}
            text='View All'
            onPress={() => console.log('service button pressed')}
          />
        </View>
      </View>
     
      {/* Transition History */}

      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.dragArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandler} />
        </View>
        {renderTransactionHistory()}
      </Animated.View> 
    </View>
  )
};


export default Home;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  bottomSheet: {
    //3:26
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: 'white',
    ...Platform.select({
      android: { elevation: 10 },
      ios: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  dragArea: {
    width: 132,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  dragHandler: {
    width: 50,
    height: 5,
    backgroundColor: '#FFDD6B',
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 7
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  servicestxt: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontWeight: '600'
  },
  transTxt: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    fontWeight: '600'
  },
  status: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  countryTxt: {
    color: 'white',
    fontWeight: '300',
    fontFamily: 'Jost-Regular'
  },
  nameTxt: {
    fontSize: 17,
    color: '#020840',
    fontFamily: 'Jost-Medium',
    fontWeight: '700'
  },
  dateTxt: {
    fontSize: 15,
    color: '#020840',
    fontFamily: 'Jost-Regular'
  },
  amountTxt: {
    fontSize: 15,
    color: '#020840',
    fontFamily: 'Jost-Bold'
  }
})