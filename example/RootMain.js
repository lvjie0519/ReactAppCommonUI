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

import {TabNavigator} from 'react-navigation';

import Home from './Home';
import Record from './Record';
import Me from './Me';

const RootMain = TabNavigator({
    Home: {
        screen: Home,
    },
    Record: {
        screen: Record,
    },
    Me: {
        screen: Me,
    },
}, {
    tabBarPosition: 'bottom',
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    initialRouteName: 'Home',        // 首次初始化的tab
    tabBarOptions: {
        activeTintColor: '#45b97c', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    },
});


export default RootMain;



