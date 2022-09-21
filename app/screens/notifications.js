
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,

} from "react-native"
import icons from "../constant/icons";
import images from "../constant/images";
import { COLORS, SIZES, FONTS } from "../constant/theme";


const transactionHistory = [
  {
    id: 1,
    nicename: "Cabel Bahamas Pay",
    date: "March20, 2022",
    bill: 'Pay your cable Bahamas bill ....',
  },
  {
    id: 2,
    nicename: "Cabel Bahamas Pay",
    date: "March20, 2022",
    bill: 'Pay your cable Bahamas bill ....',
  },
  {
    id: 3,
    nicename: "Cabel Bahamas Pay",
    date: "March20, 2022",
    bill: 'Pay your cable Bahamas bill ....',
  },
  {
    id: 4,
    nicename: "Cabel Bahamas Pay",
    date: "March20, 2022",
    bill: 'Pay your cable Bahamas bill ....',
  },
  {
    id: 5,
    nicename: "Cabel Bahamas Pay",
    date: "March20, 2022",
    bill: 'Pay your cable Bahamas bill ....',
  },
  {
    id: 6,
    nicename: "Cabel Bahamas Pay",
    date: "March20, 2022",
    bill: 'Pay your cable Bahamas bill ....',
  }
];


const Notifications = () => {

  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 1.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            source={icons.menu}
            style={{ height: 25, width: 25, tintColor: COLORS.primary }}
          />
          <Text style={{
            marginLeft: 10,
            fontSize: 20,
            color: COLORS.primary,
            fontFamily: 'Jost-Medium'
          }}>
            Notification Inbox
          </Text>
        </View>
        <View>
          <Image
            resizeMode='contain'
            source={icons.notification}
            style={{
              width: 20,
              height: 20,
              marginRight: 20,
              tintColor: COLORS.primary
            }}
          />
        </View>
      </View>
    )
  };
  //B5B6B8
  function renderPaymentHistory() {

   const onDelete = (id) => {
      alert(id)
    }

    const renderItem = ({ item, index }) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 8,
          paddingVertical: 10,
          marginHorizontal: 6,
          backgroundColor: ((index + 1) + 0) % 3 == 0 ? '#DCA147' : ((index + 1) + 1) % 3 == 0 ? '#4E5692' : '#B5B6B8',
          borderRadius: 15
        }}
        onPress={() => console.log(item, index)}
      >
        <Image
          source={images.tag}
          style={styles.tags}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontSize: 15, fontFamily: 'Jost-Bold', color: '#fff' }}>{item.nicename}</Text>
          <Text style={{ fontSize: 10, fontFamily: 'Jost-Regular', color: '#fff' }}>{item.date}</Text>
          <Text style={{ fontSize: 10, marginTop: 6, fontFamily: 'Jost-Regular', color: '#fff' }}>{item.bill}</Text>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 10, fontFamily: 'Jost-Medium', color: '#fff' }}>READ NOW</Text>
          <Image source={icons.arrowforward}
            resizeMode='contain'
            style={{
              height: 20,
              width: 20,
              tintColor: '#fff'
              //transform: [{ rotate: '180deg' }]
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cross}
          onPress={() => onDelete(item.id)}
        >
          <Image
            source={icons.cross}
            resizeMode='contain'
            style={{
              height: 10,
              width: 10,
              tintColor: 'white'
            }}
          />
        </TouchableOpacity>
      </View>
    )

    return (
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={transactionHistory}
        keyExtractor={(item) => `${item.id} `}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    )
  };

  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderPaymentHistory()}
    </View>
  )
};

export default Notifications

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EDF3F7'
  },
  cross: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: -5,
    top: -10,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 / 2
  },
  tags: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginLeft: 15
  }
})