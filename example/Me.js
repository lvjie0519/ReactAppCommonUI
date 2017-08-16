/**
 * Created by Administrator on 2017/8/15 0015.
 */
import React from 'react'
import {
    StyleSheet,
    View,
    Button,
    Image,
    Text
} from 'react-native'

export default class Me extends React.Component{

    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./img/me_press.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render(){
        return(
            <View>
                <Text>me</Text>
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