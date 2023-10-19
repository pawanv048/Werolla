import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../constant/theme'


const ServiceInput = props => {
  const {
    keyboardType,
    value,
    placeholder,
    textAlign,
    onChangeText
  } = props
  return (

    <View style={{
      marginHorizontal: SIZES.padding * 2,
      marginVertical: SIZES.padding2 * 0.5,
    }}>
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}

          textAlign={textAlign}
          style={styles.input}
        />
      </View>
    </View>
  )
}

export default ServiceInput

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6D6F0',
    borderRadius: 25,
    width: '95%',
    height: 40,
    alignSelf: 'center',
    borderWidth: 1.2,
    borderColor: '#1E2472'
  },
  input: {

  }
})