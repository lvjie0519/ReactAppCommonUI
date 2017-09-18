/**
 * Created by Administrator on 2017/9/18 0018.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    ART,
    View,
    Button,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native'

import BasePage from './BasePage'

export default class NavPage3 extends BasePage{
    constructor(props){
        super(props);
        console.log("NavPage2 ---porps = ", this.props);

        this.goNextPage = this.goNextPage.bind(this);
    }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={this.goNextPage}>
                    <Text>当前页面为Page3, 进入下一个界面</Text>
                </TouchableOpacity>
            </View>
        );
    }

    goNextPage(){
        // const {navigate} = this.props.navigation;
        // navigate('NavPage1',{
        // });

        this.goBack('NavPage1');
    }

}