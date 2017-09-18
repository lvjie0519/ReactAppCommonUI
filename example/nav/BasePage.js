/**
 * Created by Administrator on 2017/9/18 0018.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native'

export default class BasePage extends React.Component{

    static NavigationOptions = {
        header: null,
    }

    static propTypes = {
        init: PropTypes.object,
    }

    static stackHistory = [];

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BasePage.stackHistory.push({name: this.props.navigation.state.routeName, key: this.props.navigation.state.key});
    }

    componentWillUnmount() {
        for (let i = BasePage.stackHistory.length - 1; i >= 0; i--) {
            let temp = BasePage.stackHistory[i];
            if (temp.name === this.props.navigation.state.routeName) {
                BasePage.stackHistory.splice(i, BasePage.stackHistory.length - i);
                return;
            }
        }
    }

    go(screenName, param){
        if(this.props.navigation && screenName !==null){
            this.props.navigation.navigate(screenName, param);
        }else{
            console.log('navigate failed', screenName, param);
        }
    }

    goBack = (screenName) => {
        let found = false;
        for (let temp of BasePage.stackHistory) {
            if (found) {
                if (this.props.navigation.goBack(temp.key)) {
                    return;
                } else {
                    break;
                }
            }
            if (temp.name === screenName) {
                found = true;
            }
        }
        this.props.navigation.goBack();
    };

}