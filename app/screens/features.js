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
    servics: 'Mobile Transfer',
    img: icons.moneytransfer,
    color: 'orange',
  },
  {
    id: 2,
    servics: 'Transac',
    img: icons.transac,
    color: 'red'
  },
  {
    id: 3,
    servics: 'Mobile Recharge',
    img: icons.rechange,
    color: 'blue'
  },
  {
    id: 4,
    servics: 'Add cart',
    img: icons.addcart,
    color: 'green'
  },
  {
    id: 5,
    servics: 'Electricity Bill',
    img: icons.electricbill,
    color: 'blue',
  },
  {
    id: 6,
    servics: 'Apartment Rent',
    img: icons.apartmentRent,
    color: 'red'
  },
  {
    id: 7,
    servics: 'Transport Bill',
    img: icons.transport,
    color: 'red'
  },
  {
    id: 8,
    servics: 'ISP Internet Bill',
    img: icons.internet,
    color: 'yellow'
  },
  {
    id: 9,
    servics: 'water bill',
    img: icons.waterbill,
    color: 'blue'
  },
  {
    id: 10,
    servics: 'Tution Fee',
    img: icons.tution,
    color: 'green'
  }
];


const Features = () => {

  const [search, setSearch] = useState('')
  const [serviceData, setServiceData] = useState(FeatureData)
  //const [newData, setNewData] =useState('')

  const navigation = useNavigation();

  // Navigation 
  const onCrossPressed = () => {
    navigation.navigate('home')
  }

  // Search Header
  function renderSearchHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: SIZES.padding * 3,
        marginBottom: SIZES.padding * 1,
        alignItems: 'center',
        paddingLeft: 20
      }}>
        <TouchableOpacity
          onPress={onCrossPressed}
        >
          <Image source={icons.close}
            style={{
              width: 16,
              height: 16,
              tintColor: '#000',

            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.searchTxt}>Search</Text>
        </View>
      </View>
    )
  };

  // Search Bar
  function renderSearchBar() {

    // const handleSearchInput = e => {
    //   let text = e.toLowerCase();
    //   let fullList = serviceData;
    //   let filteredList = fullList.filter((item) => {
    //     //search from a full list, and not from a previous search results
    //     if (item.servics.toLowerCase().includes(text)) return item.servics.toLowerCase().includes(text.toLowerCase());
    //   });
    //   if (!text || text === '') {
    //     setServiceData(fullList);
    //   } else if (!filteredList.length) {
    //     setServiceData([]);
    //   } else if (Array.isArray(filteredList)) {
    //     setServiceData(filteredList);
    //   }
    // };

    // searching for services

    const searchService = (input) => {
      let serviceData = FeatureData
      let searchData = serviceData.filter((item) =>{
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
            width: '80%',
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
            // value={search}
            // onChangeText={val => {
            //   let text = val.replace(/[^0-9a-zA-Z+ ]/g, '');
            //   handleSearchInput(text);
            //   setSearch(text);
            // }}

            onChangeText={(input) => {
              searchService(input)
            }}

            style={{
              marginLeft: 15
            }}
            placeholder='Search a Service'
          />
        </View>
        <TouchableOpacity style={{
          backgroundColor: '#EEEEEE',
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          borderRadius: 10
        }}>
          <Image source={icons.filter}
            style={{
              width: 20,
              height: 20,
              tintColor: '#838383'
            }}
          />
        </TouchableOpacity>
      </View>
    )
  };


  /// Indivisual list data

  function renderServiceList() {

    const renderItem = ({ item }) => {

      const onDelete = (id) => {
        //alert(item.id)
        if (item.id === 1) {
          navigation.navigate('moneyTransfer')
          //alert('Money Tranfer')
        }
        if (item.id === 2) {
          alert('Transac')
        }
      }
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
            onPress={onDelete}
            style={{
              flex: 1,
              //paddingVertical: 5,
              paddingHorizontal: SIZES.padding * 2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',

            }}
          >
            <View style={{
              flexDirection: 'row',
              //paddingLeft: 25,

            }}>
              <Image source={item.img}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: item.color
                }}
              />
              <Text style={styles.servicestxt}>{item.servics}</Text>
            </View>
            <Image source={icons.next}
              style={{
                width: 20,
                height: 20
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
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderSearchHeader()}
      {renderSearchBar()}
      {renderServiceList()}
    </View>
  )
}

export default Features;

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
    marginLeft: 20,
    fontSize: 18,
    color: '#000',
    fontFamily: 'Roboto-Medium'
  }
})