/**
 * Created by Administrator on 2017/8/15 0015.
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

const {Surface, Shape, Path} = ART;

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

    constructor(props){
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.goNextPage = this.goNextPage.bind(this);
    }

    render(){

        let segmentedControlStyle = {
            selectTextColor:'#ffffff',
            unSelectTextColor:'#f05b72',
            borderColor:'#7fb80e',
            selectSegmentColor:'#a3cf62',
            unselectSegmentColor:'#ffffff',
        }

        let options = [
            {
                value:'公共微博',
                // icon: require('./img/home_unpress.png')
            },
            {
                value:'我的关注',
                // icon: require('./img/home_unpress.png')
            },
            {
                value:'微博热榜',
                // icon: require('./img/home_unpress.png')
            },
            {
                value:'我的收藏',
                // icon: require('./img/home_unpress.png')
            },
            {
                value:'99U消息',
                // icon: require('./img/home_unpress.png')
            },
        ];

        return(
            <View style={{margin:10}}>
                <SegmentedControl
                    selectedIndex={1}
                    values={['aaaa','bbbb','cccc','dddd']}
                    //segmentedControlStyle={segmentedControlStyle}
                    onValueChange={(index, value)=>{ToastAndroid.show('index='+index+'  value='+value, ToastAndroid.SHORT)}}
                />

                <View style={{height:50,flexDirection:'row',justifyContent: 'flex-start'}}>
                    <ModalDropdown
                        options={options}
                        onSelect={(index, option)=>{ToastAndroid.show('index='+index+'  option='+option.value, ToastAndroid.SHORT)}}
                    >
                        <Text>下拉列表-左边</Text>
                    </ModalDropdown>
                    <View style={{flex:1,flexDirection:'row', justifyContent: 'center'}}>
                        <ModalDropdown
                            options={options}
                            onSelect={(index, option)=>{ToastAndroid.show('index='+index+'  option='+option.value, ToastAndroid.SHORT)}}
                            //renderRow={this.renderItem}
                        >
                            <Text>下拉列表-中间</Text>
                        </ModalDropdown>
                    </View>
                    <ModalDropdown
                        options={options}
                        onSelect={(index, option)=>{ToastAndroid.show('index='+index+'  option='+option.value, ToastAndroid.SHORT)}}
                        //renderRow={this.renderItem}
                    >
                        <Text>下拉列表-右边</Text>
                    </ModalDropdown>
                </View>

                <TouchableOpacity onPress={this.goNextPage}>
                    <Text>Navigation 测试</Text>
                </TouchableOpacity>


            </View>
        );
    }

    goNextPage(){
        const {navigate} = this.props.navigation;
        navigate('NavPage1',{
        });
    }

    renderItem(rowData, index){
        return(
            <TouchableOpacity style={styles.itemstyle}>
                <Image
                    style={{width:20, height:20, marginLeft:10}}
                    source={require('./img/home_unpress.png')}
                />
                <Text style={{marginLeft:10}}>{rowData.value}</Text>
            </TouchableOpacity>
        );
    }

}

class Triangle extends Component{
    constructor(props){
        super(props);

        this.fillColor = this.props.fillColor == null?'#892265':this.props.fillColor;
    }
    render(){
        const path = new Path()
            .moveTo(0,12)
            .lineTo(20,12)
            .lineTo(10,0)
            .close();

        return(
            <Surface width={20} height={12}>
                <Shape d={path} fill={this.fillColor}  />
            </Surface>
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
    dropdownStyle: {      // 设置下拉列表的样式
        width: 150,
        height: 200,
        backgroundColor: '#cccccc'
    },
    dropdown_1_dropdownTextStyle: {     //  设置列表中文字的样式
        color: '#666666'
    },
    itemstyle:{
        height: 44,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center'
    }
});