import React from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';


const CustomInput = ({ value, onChangeText,textAlign,autoCapitalize,placeholder, keyboardType ,secureTextEntry, error, onFocus = () => { }, ...props }) => {

    const [isFocus, setIsFocus] = React.useState(false)

    return (

        <View style={[styles.container,
        {
            borderColor: error
                ? 'red'
                : isFocus
                ? 'darkblue'
                : 'white'
        }
        ]}>
            <TextInput
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                textAlign='center'
                style={styles.input}
                onFocus={() => {
                    onFocus();
                    setIsFocus(true)
                }}
                onBlur={() => {
                    setIsFocus(false)
                }}
                secureTextEntry={secureTextEntry}
                {...props}
            />
            {error && (
                <Text style={{ color: 'red', marginTop: 5, fontSize: 12}}>{error}</Text>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D6D9EF',
        width: '90%',
        height: Platform.OS === 'ios' ? 60 : 55,
        borderWidth: 2.5,
        borderRadius: 12,
        marginVertical: Platform.OS === 'ios' ? 10 : 9,
        alignItems: 'center',
        justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start'
    },
    input: {

    },
});


export default CustomInput;

