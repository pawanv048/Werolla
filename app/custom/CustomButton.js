import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor, disabled, showOTP }) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
            style={[styles.container,
            styles[`container_${type}`],
            bgColor ? { backgroundColor: bgColor } : {}
            ]}>
            <Text
                style={[styles.text,
                styles[`text_${type}`],
                fgColor ? { color: fgColor } : {},
                ]}>{text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black'
    },

    container_PRIMARY: {
        backgroundColor: '#D6AA54',
    },

    text: {
        fontWeight: '600',
        fontSize: 18,
        color: '#002D7F'
    },
})