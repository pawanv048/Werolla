// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid,
//   SafeAreaView,
//   Animated
// } from 'react-native';

// // import BottomSheet from 'reanimated-bottom-sheet';

// const { width, height } = Dimensions.get('screen')

// const Home = () => {


//   // const renderTransactionHistoryBottomSheet = () => {

//   //   return(
//   //     <View style={{ flex: 1, backgroundColor: 'red'}}>   
//   //       
//   //     </View>
//   //   )

//   // }


//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       <View style={styles.header}>
//         <Text>Header</Text>
//       </View>
//       <View style={styles.footer}>
//         <Text>Footer</Text>
//       </View>

//       {/* <View style={styles.bottomSheet}></View> */}

//     </SafeAreaView>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: 'darkblue'
//   },
//   header: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   footer: {
//     flex: 2,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50
//   },
//   bottomSheet: {
//     flex: 0.5,
//     position: 'absolute',
//     width: '100%',
//     height: 150,
//     bottom: 0,
//     backgroundColor: 'red'
//   }
// })






/////////////////////////

import { StyleSheet, Text, View, Dimensions, Platform, Animated, PanResponder } from 'react-native'
import React, { useRef } from 'react'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.3;
const MAX_UPWORD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; //navigation number
const MAX_DOWNWORD_TRANSLATE_Y = 0;

const Home = () => {

  // Bottom sheet Transition History

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

  return (
    <View style={styles.mainContainer}>

      {/* user profile */}
      <View style={styles.header}>
        <Text>header</Text>
      </View>
      {/* service profile */}
      <View style={styles.footer}>
        <View style={styles.dragArea}>
          <View style={styles.dragHandler} />
        </View>
      </View>
      {/* Transition History */}
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.dragArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandler} />
        </View>
      </Animated.View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'darkblue'
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  dragArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandler: {
    width: 90,
    height: 5,
    backgroundColor: 'orange',
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 10
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
  }

})