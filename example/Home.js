/**
 * Created by Administrator on 2017/8/15 0015.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    ToastAndroid
} from 'react-native'

import SegmentedControl from '../lib/component/SegmentedControl';

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

        let segmentedControlStyle = {
            selectTextColor:'#ffffff',
            unSelectTextColor:'#f05b72',
            borderColor:'#7fb80e',
            selectSegmentColor:'#a3cf62',
            unselectSegmentColor:'#ffffff',
        }

        return(
            <View style={{margin:10}}>
                <SegmentedControl
                    selectedIndex={1}
                    values={['aaaa','bbbb','cccc','dddd']}
                    //segmentedControlStyle={segmentedControlStyle}
                    onValueChange={(index, value)=>{ToastAndroid.show('index='+index+'  value='+value, ToastAndroid.SHORT)}}
                />
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