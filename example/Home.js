/**
 * Created by Administrator on 2017/8/15 0015.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Image,
    Text
} from 'react-native'

export default class Home extends React.Component{

    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./img/home_press.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render(){
        return(
            <View>
                <Text>home</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});