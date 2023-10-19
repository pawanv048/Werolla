import React from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   Image,
   Platform,
   Text,
   TouchableWithoutFeedback,
   View
} from 'react-native';
import { COLORS, SIZES } from '../constant/theme';
import icons from '../constant/icons';


const FeatureButton = props => {
   const {
      onPress,
      title,
      source,
      
   } = props

   return (
      <View
         style={{
            flexDirection: 'row',
            marginHorizontal: SIZES.padding * 1.5,
            width: SIZES.width * 0.9,
            height: SIZES.height * 0.08,
            backgroundColor: '#fff',
            borderRadius: 20,
            alignItems: 'center',
            marginBottom: 16,
            elevation: 5
         }}>
         <TouchableOpacity
            onPress={onPress}
            style={{
               flex: 1,
               paddingVertical: 20,
               paddingHorizontal: SIZES.padding * 2,
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-between',  
            }}
         >
            <View style={styles.services}>
               <Image 
                  source={source}
                  style={styles.featureBtnImg}
                  
               />
               <Text style={styles.featureTitle}>{title}</Text>
            </View>

            <Image source={icons.next}
               style={{
                  width: 25,
                  height: 25,

               }}
            />
         </TouchableOpacity>
      </View>
   )
}

export default FeatureButton

const styles = StyleSheet.create({
   featureBtnImg: {
      height: 30,
      width: 30,
   },
   services: {
      flexDirection: 'row',
   },
   featureTitle: {
      marginLeft: 30,
      fontFamily: 'Roboto-Medium',
      fontSize: 18,
      color: COLORS.black
   }
})