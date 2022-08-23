import React from 'react';
import { StyleSheet, useWindowDimensions, View, ActivityIndicator, Text } from 'react-native';

const Loader = ({ visible = false }) => {

    const { height, width } = useWindowDimensions();
    return visible && <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
            <ActivityIndicator size='large' color='blue'/>
            <Text style={{marginLeft: 20, fontSize: 20, color: 'black'}}>Loading...</Text>
        </View>
    </View>
}


export default Loader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    loader: {
        height: 70,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 30,
        flexDirection: 'row'
    }
})