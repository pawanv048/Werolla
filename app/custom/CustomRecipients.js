import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constant/theme';
import icons from '../constant/icons';

const CustomRecipients = props => {
   const {

   } = props
   return (
      <View style={{
         marginHorizontal: SIZES.padding * -0.8,
         marginVertical: SIZES.padding * 1.4,
         alignItems: 'center'
      }}>
         <ImageBackground
            //source={icons.addcart}
            style={{
               width: 38,
               height: 38,
               justifyContent: 'center',
               alignItems: 'center',
               //...StyleSheet.absoluteFill,
               // top: 10,
               backgroundColor: 'transparent'
            }}
         >
            <View style={{
               width: 60,
               height: 60,
               borderWidth: 1.5,
               borderColor: COLORS.primary,
               borderRadius: 60 / 2,
               backgroundColor: '#fff',

            }}>
               {/* <Image source={icons.bill} style={{width: 30, height: 30}}/> */}
            </View>
         </ImageBackground>
         <Text style={styles.nametxt}>Name</Text>
      </View>
   )
};



export default CustomRecipients;

const styles = StyleSheet.create({
   nametxt: {
      marginHorizontal: 14,
      //marginVertical: 8,
      fontSize: 14,
      fontFamily: 'Jost-Medium',
      color: COLORS.black,
      lineHeight: 50
   }
})