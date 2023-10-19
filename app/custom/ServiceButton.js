import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constant/theme';

const ServiceButton = props => {
   const {
      onPress,
      text,
      source,    
   } = props

    let br = `\n`;
    
   return (
      <View style={styles.mainContainer}>
         <TouchableOpacity
            onPress={onPress}
         >
            <Image
               source={source}
               style={styles.featureBtn}
            />
         </TouchableOpacity>
          <Text
            style={styles.txt}
         >
            {text}
         </Text>   
      </View>
   )
}

export default ServiceButton;

const styles = StyleSheet.create({
   mainContainer: {
      //paddingHorizontal: 15,
      marginHorizontal: 9,
      paddingLeft: 10,
      paddingVertical: 7,
      alignItems: 'center',
      // backgroundColor: 'red'
      
   },
   featureBtn: {
      width: 30,
      height: 30,
      tintColor: '#EA912D',
      
   },
   txt: {
      fontSize: 12,
      //color: '#16213E',
      color: '#000',
      marginTop: 5,
      textAlign: 'center',
      fontFamily: 'Jost-Medium',
      
   }
})
