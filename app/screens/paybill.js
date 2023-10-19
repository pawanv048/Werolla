
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';


// const Paybill = () => {
//   return (
//     <View style={styles.maincon}>
//       <Text>paybill</Text>
//     </View>
//   )
// }

// export default Paybill

// const styles = StyleSheet.create({})



import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView
} from 'react-native';
import icons from '../constant/icons';
import { SIZES, COLORS } from '../constant/theme';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';


const FeatureData = [
  {
    id: 1,
    servics: 'Electricity Bill',
    img: icons.electricbill,
    subservice: 'Desko'
  },
  {
    id: 2,
    servics: 'Apartment Rent',
    img: icons.apartmentRent,
    subservice: 'Andrson'
  },
  {
    id: 3,
    servics: 'Transport Bill',
    img: icons.transport,
    subservice: 'City Authority'
  },
  {
    id: 4,
    servics: 'ISP Internet Bill',
    img: icons.internet,
    subservice: 'Carnival'
  },
  {
    id: 5,
    servics: 'water Bill',
    img: icons.waterbill,
    subservice: 'City Corporation'
  },
  {
    id: 6,
    servics: 'Tution Fee',
    img: icons.tution,
    subservice: 'University of san fransico'
  }
];


const Paybill = () => {

  const [search, setSearch] = useState('')
  const [serviceData, setServiceData] = useState(FeatureData)
  //const [newData, setNewData] =useState('')

  const navigation = useNavigation();

  // Navigation 
  const onCrossPressed = () => {
    navigation.navigate('home')
  }

  // Search Header
  function renderPayBillHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: SIZES.padding * 3,
        marginBottom: SIZES.padding * 2,
        alignItems: 'center',
        paddingLeft: 20,

      }}>
        <TouchableOpacity
          onPress={onCrossPressed}
        >
          <Image source={icons.menu}
            style={{
              width: 24,
              height: 24,
              tintColor: '#000',

            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.searchTxt}>Pay Bills</Text>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',

          paddingHorizontal: SIZES.padding * 3
        }}>
          <Image source={icons.plus}
            style={{
              width: 17,
              height: 17,
              tintColor: 'grey'
            }}
          />
          <Text style={styles.billtxt}>Add bill</Text>
          <Image source={icons.filter}
            style={{
              width: 17,
              height: 17,
              tintColor: 'grey'
            }}
          />
        </View>
      </View>
    )
  };

  // Search Bar
  function renderSearchBar() {

    // searching for services

    const searchService = (input) => {
      let serviceData = FeatureData
      let searchData = serviceData.filter((item) => {
        return item.servics.toLowerCase().includes(input.toLowerCase())
      })
      setServiceData(searchData)
    }

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,

      }}>
        <View
          style={{
            width: '90%',
            height: 40,
            borderRadius: 10,
            backgroundColor: '#EEEEEE',
            flexDirection: 'row',
            //justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20
          }}
        >
          <Image
            source={icons.search}
            style={{
              width: 15,
              height: 15,
              tintColor: '#838383',
              marginHorizontal: 4
            }}
          />
          <TextInput
            onChangeText={(input) => {
              searchService(input)
            }}

            style={{
              marginLeft: 15
            }}
            placeholder='Search & Service'
          />
        </View>
      </View>
    )
  };

  function renderMostRecent() {
    return (
      <View
        style={{
          //flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: SIZES.padding
        }}
      >
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold'
          }}>MOST RECENT</Text>
      </View>
    )
  }


  /// Indivisual list data

  function renderRecentList() {

    const renderItem = ({ item, index }) => {

      const onDelete = (id) => {
        //alert(item.id)
        if (item.id === 1) {
          navigation.navigate('moneyTransfer')
          //alert('Money Tranfer')
        }
        if (item.id === 2) {
         // alert('Transac')
        }
      }
      return (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: SIZES.padding * 1.5,
            width: SIZES.width * 0.9,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 18,
            alignItems: 'center',
            marginBottom: 10,
            elevation: 1,
            backgroundColor: (index+1) === 1 ? '#7588C5' : (index+1) === 2 ? '#64B0A8': (index+1) === 3 ? '#DE6D92' : (index+1) === 4 ? '#FBEB85' : (index+1) === 5 ? '#6CCCDC' : (index+1) === 6 ? '#8EC087' : 'lightblue'
          }}>
          <TouchableOpacity
            onPress={onDelete}
            style={{
              flex: 1,
              //paddingVertical: 5,
              paddingHorizontal: SIZES.padding * 3.2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
             
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              
            }}>
              <Image source={item.img}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#fff'
                }}
              />
              <View style={{
                flex: 1,
                alignSelf: 'flex-start',
                marginLeft: SIZES.padding * 2
              }}>
                <Text style={styles.servicestxt}>{item.servics}</Text>
                <Text style={styles.subServicetxt}>{item.subservice}</Text>
              </View>
            </View>
            <Image source={icons.next}
              style={{
                width: 24,
                height: 24,
                tintColor: '#fff',
                
              }}
            />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={serviceData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id} ${index.toString()}`}
        //contentContainerStyle={{ paddingVertical: SIZES.padding}}
        />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderPayBillHeader()}
      {renderSearchBar()}
      {renderMostRecent()}
      {renderRecentList()}
    </View>
  )
}

export default Paybill;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EDF3F7'
    // backgroundColor: 'red'
  },
  searchTxt: {
    fontSize: 25,
    marginLeft: 20,
    color: '#000',
    fontWeight: 'bold'
  },
  servicestxt: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Roboto-Medium'
  },
  billtxt: {
    marginHorizontal: 5,
    marginRight: 17,
    //fontFamily: 'Jost-Regular',
    fontWeight: 'bold',
    color: 'grey'
  },
  subServicetxt: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Roboto-Regular'
  }
})



