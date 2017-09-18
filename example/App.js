/**
 * Created by Administrator on 2017/8/15 0015.
 */
import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native'

import {StackNavigator} from 'react-navigation';

import RootMain from './RootMain';
import NavPage1 from './nav/NavPage1';
import NavPage2 from './nav/NavPage2';
import NavPage3 from './nav/NavPage3';


const App = StackNavigator({
    RootMain: {
        screen: RootMain,
        navigationOptions: {
            header:null,
        },
        mode:'card',
    },
    NavPage1: {
        screen: NavPage1,
        navigationOptions: {
            header:null,
        },
        mode:'card',
    },
    NavPage2: {
        screen: NavPage2,
        navigationOptions: {
            header:null,
        },
        mode:'card',
    },
    NavPage3: {
        screen: NavPage3,
        navigationOptions: {
            header:null,
        },
        mode:'card',
    },
});

export default App;
