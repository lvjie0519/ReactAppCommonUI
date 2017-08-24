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
import ModalDropdown from '../lib/component/ModalDropdown';

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

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


                {/*<ModalDropdown*/}
                    {/*style={styles.dropdown_1}*/}
                    {/*textStyle={styles.dropdown_1_text}*/}
                    {/*dropdownStyle={styles.dropdown_1_dropdown}*/}
                    {/*dropdownTextStyle={styles.dropdown_1_dropdownTextStyle}*/}
                    {/*options={DEMO_OPTIONS_1}*/}
                    {/*defaultValue="按我"*/}
                    {/*showsVerticalScrollIndicator = {false}*/}
                {/*/>*/}

                <ModalDropdown
                    defaultValue='下拉列表'
                    options={['公共微博','我的关注','微博热榜','我的收藏','99U消息']}
                    onSelect={(index, value)=>{ToastAndroid.show('index='+index+'  value='+value, ToastAndroid.SHORT)}}
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
    dropdown_1: {
        top: 10,
        left: 8,
        width: 150,
    },
    dropdown_1_text: {      // 设置defaultValue文字的样式
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    dropdown_1_dropdown: {      // 设置下拉列表的样式
        width: 150,
        height: 200,
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        backgroundColor: 'lightgray',
    },
    dropdown_1_dropdownTextStyle: {     //  设置列表中文字的样式
        color: '#666666'
    },
});