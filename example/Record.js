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

class Record extends React.Component{

    static navigationOptions = {
        tabBarLabel: '笔记',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('./img/record_press.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render(){
        return(
            <View>
                <Text>笔记</Text>
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

export default Record;