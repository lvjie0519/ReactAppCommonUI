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

const App = StackNavigator({
    Main: {
        screen: RootMain,
        navigationOptions: {
            header:null,
        },
        mode:'card',
    },
    // PlanDetail: {
    //     screen: PlanDetail,
    //     navigationOptions: {
    //         header: {
    //             style: {
    //                 backgroundColor: '#fff'
    //             },
    //         }
    //     }
    // }
});

export default App;
