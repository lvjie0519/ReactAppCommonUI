/**
 * Created by sohobloo on 16/9/13.
 */

'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    Dimensions,
    Platform,
    ART,
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    ActivityIndicator,
    ScrollView,
} from 'react-native';

const {Surface, Shape, Path} = ART;

// const isIOS = Platform.OS === 'ios';
const isIOS = true;

const TOUCHABLE_ELEMENTS = ['TouchableHighlight', 'TouchableOpacity', 'TouchableWithoutFeedback', 'TouchableNativeFeedback'];
const dropModalIOSWidth = 170;
const dropModalAndWidth = 130;
const ArrowWidth = 20;
const ArrowHeight = 12;

export default class ModalDropdown extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        defaultIndex: PropTypes.number,
        defaultValue: PropTypes.string,
        options: PropTypes.array,
        arrawLocation: PropTypes.string,

        accessible: PropTypes.bool,
        animated: PropTypes.bool,
        showsVerticalScrollIndicator: PropTypes.bool,
        isCanScroll: PropTypes.bool,

        style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        dropdownTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),

        adjustFrame: PropTypes.func,
        renderRow: PropTypes.func,
        renderSeparator: PropTypes.func,

        onDropdownWillShow: PropTypes.func,
        onDropdownWillHide: PropTypes.func,
        onSelect: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        defaultIndex: -1,
        defaultValue: 'Please select...',
        options: null,
        animated: true,
        showsVerticalScrollIndicator: true,
        isCanScroll: false,
    };

    constructor(props) {
        super(props);

        this._button = null;
        this._buttonFrame = null;
        this._nextValue = null;
        this._nextIndex = null;

        this.state = {
            disabled: props.disabled,
            accessible: !!props.accessible,
            loading: props.options === null || props.options === undefined,
            showDropdown: false,
            buttonText: props.defaultValue,
            selectedIndex: props.defaultIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        var buttonText = this._nextValue == null ? this.state.buttonText : this._nextValue.toString();
        var selectedIndex = this._nextIndex == null ? this.state.selectedIndex : this._nextIndex;
        if (selectedIndex < 0) {
            selectedIndex = nextProps.defaultIndex;
            if (selectedIndex < 0) {
                buttonText = nextProps.defaultValue;
            }
        }
        this._nextValue = null;
        this._nextIndex = null;

        this.setState({
            disabled: nextProps.disabled,
            loading: nextProps.options == null,
            buttonText: buttonText,
            selectedIndex: selectedIndex
        });
    }

    render() {
        return (
            <View {...this.props}>
                {this._renderButton()}
                {this._renderModal()}
            </View>
        );
    }

    _updatePosition(callback) {
        if (this._button && this._button.measure) {
            this._button.measure((fx, fy, width, height, px, py) => {
                this._buttonFrame = {x: px, y: py, w: width, h: height};
                callback && callback();
            });
        }
    }

    show() {
        this._updatePosition(() => {
            this.setState({
                showDropdown: true
            });
        });
    }

    hide() {
        this.setState({
            showDropdown: false
        });
    }

    select(idx) {
        var value = this.props.defaultValue;
        if (idx == null || this.props.options == null || idx >= this.props.options.length) {
            idx = this.props.defaultIndex;
        }

        if (idx >= 0) {
            value = this.props.options[idx].toString();
        }

        this._nextValue = value;
        this._nextIndex = idx;

        this.setState({
            buttonText: value,
            selectedIndex: idx
        });
    }

    _renderButton() {
        return (
            <TouchableOpacity ref={button => this._button = button}
                              disabled={this.props.disabled}
                              accessible={this.props.accessible}
                              onPress={this._onButtonPress.bind(this)}>
                {
                    this.props.children ||
                    (
                        <View style={styles.button}>
                            <Text style={[styles.buttonText, this.props.textStyle]}
                                  numberOfLines={1}>
                                {this.state.buttonText}
                            </Text>
                        </View>
                    )
                }
            </TouchableOpacity>
        );
    }

    _onButtonPress() {
        if (!this.props.onDropdownWillShow ||
            this.props.onDropdownWillShow() !== false) {
            this.show();
        }
    }

    _renderModal() {
        if (this.state.showDropdown && this._buttonFrame) {
            let frameStyle = this._calcPosition();
            let animationType = this.props.animated ? 'fade' : 'none';
            let arrowStyle = this._calcArrowPosition(frameStyle);
            return (
                <Modal animationType={animationType}
                       transparent={true}
                       onRequestClose={this._onRequestClose.bind(this)}
                       supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
                    <TouchableWithoutFeedback accessible={this.props.accessible}
                                              disabled={!this.state.showDropdown}
                                              onPress={this._onModalPress.bind(this)}>
                        <View style={styles.modal}>
                            <View style={arrowStyle}>
                                <Triangle/>
                            </View>
                            <View style={[styles.dropdown, {width: isIOS ? dropModalIOSWidth : dropModalAndWidth},this.props.dropdownStyle,frameStyle]}>
                                {this.state.loading ? this._renderLoading() : this._renderDropdown1()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }

    // 计算箭头的位置
    _calcArrowPosition(frameStyle){
        let style = {
            height: ArrowHeight,
            top: frameStyle.top-ArrowHeight,
        }

        style.left = this._buttonFrame.x+this._buttonFrame.w/2-ArrowWidth/2;

        console.log('arrowStyle', style, this._buttonFrame);

        return style;
    }

    _calcPosition() {
        let dimensions = Dimensions.get('window');
        let windowWidth = dimensions.width;
        let windowHeight = dimensions.height;

        // dropdownHeight高度优先选择dropdownStyle中的高度，否则选择dropdown的高度
        let dropdownHeight = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).height) ||
            StyleSheet.flatten(styles.dropdown).height;

        // 屏幕底部剩下的空间 高度
        let bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
        // 屏幕右边剩下的空间 宽度
        let rightSpace = windowWidth - this._buttonFrame.x;
        // 是否显示在按钮底部
        let showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
        // 是否靠左显示
        let showInLeft = rightSpace >= this._buttonFrame.x;

        console.log('isIOS',isIOS);

        let top = 0;
        if(!isIOS){
            // android  需要遮挡住按钮
            top = showInBottom ? this._buttonFrame.y : Math.max(0, this._buttonFrame.y - dropdownHeight - this._buttonFrame.h);
        }else {
            // ios 不需要遮挡按钮
            top = showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight);
        }

        var style = {
            height: dropdownHeight,
            top: top,
        };

        if (showInLeft) {
            style.left = this._buttonFrame.x;
            // 当按钮在屏幕中间范围位置的时候，保证下拉框居中与文字显示
            let left = 0;
            if(isIOS){
                left = this._buttonFrame.x-(dropModalIOSWidth-this._buttonFrame.w)/2;
            }else{
                left = this._buttonFrame.x-(dropModalAndWidth-this._buttonFrame.w)/2;
            }
            style.left = left<=0?style.left:left;
        } else {
            let dropdownWidth = (this.props.dropdownStyle && StyleSheet.flatten(this.props.dropdownStyle).width) ||
                (this.props.style && StyleSheet.flatten(this.props.style).width) || -1;
            if (dropdownWidth !== -1) {
                style.width = dropdownWidth;
            }
            style.right = rightSpace - this._buttonFrame.w;
        }

        if (this.props.adjustFrame) {
            style = this.props.adjustFrame(style) || style;
        }

        if(this.props.isCanScroll){
            style.height = 200;
        }

        if(isIOS){
            // IOS 上方有箭头
            style.top = style.top+ArrowHeight-2;
        }


        console.log('style', style);

        return style;
    }

    _onRequestClose() {
        if (!this.props.onDropdownWillHide ||
            this.props.onDropdownWillHide() !== false) {
            this.hide();
        }
    }

    _onModalPress() {
        if (!this.props.onDropdownWillHide ||
            this.props.onDropdownWillHide() !== false) {
            this.hide();
        }
    }

    _renderLoading() {
        return (
            <ActivityIndicator size='small'/>
        );
    }

    _renderDropdown() {
        return (
            <ListView style={styles.list}
                      dataSource={this._dataSource}
                      renderRow={this._renderRow.bind(this)}
                      renderSeparator={this.props.renderSeparator || this._renderSeparator.bind(this)}
                      automaticallyAdjustContentInsets={false}
                      showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
            />
        );
    }

    _renderDropdown1() {

        if(this.props.options.length == 0){
            return(
                <View></View>
            );
        }

        let items =  this.props.options.map(function(data, index){
            return(
                <View key={index}>
                    {this._renderRow1(data, index)}
                </View>
            );
        }.bind(this));


        return (
            <ScrollView>
                {items}
            </ScrollView>
        );
    }


    get _dataSource() {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return ds.cloneWithRows(this.props.options);
    }

    /**
     *
     * @param rowData   数据源(Data source)中接受一条数据
     * @param sectionID
     * @param rowID     行数，第几行
     * @param highlightRow  为一个方法，高亮行
     * @returns {XML}
     * @private
     */
    _renderRow(rowData, sectionID, rowID, highlightRow) {
        let key = `row_${rowID}`;
        let highlighted = rowID == this.state.selectedIndex;
        let row = !this.props.renderRow ?
            (<Text style={[
                styles.rowText,
                {paddingHorizontal: isIOS ? 0 : 10 },
                {textAlign: isIOS ? 'center' : null },
                this.props.dropdownTextStyle,
              ]}
            >
                {rowData}
            </Text>) :
            this.props.renderRow(rowData, rowID, highlighted);
        let preservedProps = {
            key: key,
            accessible: this.props.accessible,
            onPress: () => this._onRowPress(rowData, sectionID, rowID, highlightRow),
        };
        if (TOUCHABLE_ELEMENTS.find(name => name == row.type.displayName)) {
            var props = {...row.props};
            props.key = preservedProps.key;
            props.onPress = preservedProps.onPress;
            switch (row.type.displayName) {
                case 'TouchableHighlight': {
                    return (
                        <TouchableHighlight {...props}>
                            {row.props.children}
                        </TouchableHighlight>
                    );
                }
                    break;
                case 'TouchableOpacity': {
                    return (
                        <TouchableOpacity {...props}>
                            {row.props.children}
                        </TouchableOpacity>
                    );
                }
                    break;
                case 'TouchableWithoutFeedback': {
                    return (
                        <TouchableWithoutFeedback {...props}>
                            {row.props.children}
                        </TouchableWithoutFeedback>
                    );
                }
                    break;
                case 'TouchableNativeFeedback': {
                    return (
                        <TouchableNativeFeedback {...props}>
                            {row.props.children}
                        </TouchableNativeFeedback>
                    );
                }
                    break;
                default:
                    break;
            }
        }
        return (
            <TouchableOpacity {...preservedProps}>
                {row}
            </TouchableOpacity>
        );
    }

    _renderRow1(rowData, index) {
        let key = index;
        // let highlighted = rowID == this.state.selectedIndex;
        let row = !this.props.renderRow ?
            (<Text style={[
                styles.rowText,
                {paddingHorizontal: isIOS ? 0 : 10 },
                {textAlign: isIOS ? 'center' : null },
                this.props.dropdownTextStyle,
              ]}
            >
                {rowData}
            </Text>) :
            this.props.renderRow(rowData, index, index);
        let preservedProps = {
            key: key,
            accessible: this.props.accessible,
            onPress: () => this._onRowPress(rowData, index, index, index),
        };
        if (TOUCHABLE_ELEMENTS.find(name => name == row.type.displayName)) {
            var props = {...row.props};
            props.key = preservedProps.key;
            props.onPress = preservedProps.onPress;
            switch (row.type.displayName) {
                case 'TouchableHighlight': {
                    return (
                        <TouchableHighlight {...props}>
                            {row.props.children}
                        </TouchableHighlight>
                    );
                }
                    break;
                case 'TouchableOpacity': {
                    return (
                        <TouchableOpacity {...props}>
                            {row.props.children}
                        </TouchableOpacity>
                    );
                }
                    break;
                case 'TouchableWithoutFeedback': {
                    return (
                        <TouchableWithoutFeedback {...props}>
                            {row.props.children}
                        </TouchableWithoutFeedback>
                    );
                }
                    break;
                case 'TouchableNativeFeedback': {
                    return (
                        <TouchableNativeFeedback {...props}>
                            {row.props.children}
                        </TouchableNativeFeedback>
                    );
                }
                    break;
                default:
                    break;
            }
        }
        return (
            <TouchableOpacity {...preservedProps}>
                {row}
            </TouchableOpacity>
        );
    }

    _onRowPress(rowData, sectionID, rowID, highlightRow) {
        if (!this.props.onSelect ||
            this.props.onSelect(rowID, rowData) !== false) {
            highlightRow(sectionID, rowID);
            this._nextValue = rowData;
            this._nextIndex = rowID;
            this.setState({
                buttonText: rowData.toString(),
                selectedIndex: rowID
            });
        }
        if (!this.props.onDropdownWillHide ||
            this.props.onDropdownWillHide() !== false) {
            this.setState({
                showDropdown: false
            });
        }
    }

    // IOS 需要分割线， android 不需要
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        let key = `spr_${rowID}`;
        if(isIOS){
            return (<View style={styles.separator}
                          key={key}
            />);
        }else{
            return(
                <View key={key}></View>
            );
        }

    }
}

// 三角形箭头，IOS需要
class Triangle extends Component{
    constructor(props){
        super(props);

        this.fillColor = this.props.fillColor == null?'#892265':this.props.fillColor;
    }
    render(){
        const path = new Path()
            .moveTo(0,ArrowHeight)
            .lineTo(ArrowWidth,ArrowHeight)
            .lineTo(ArrowWidth/2,0)
            .close();

        return(
            <Surface width={ArrowWidth} height={ArrowHeight}>
                <Shape d={path} fill={this.fillColor}  />
            </Surface>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 12
    },
    modal: {
        flexGrow: 1
    },
    dropdown: {
        position: 'absolute',
        // height: (33 + StyleSheet.hairlineWidth) * 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dddddd',
        borderRadius: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 4,
        paddingBottom: 4,
    },
    loading: {
        alignSelf: 'center'
    },
    list: {
        //flexGrow: 1,
    },
    rowText: {
        // paddingHorizontal: 6,
        // paddingVertical: 10,
        height: 44,
        fontSize: 15,
        color: '#333333',
        backgroundColor: '#ffffff',
        textAlignVertical: 'center',
    },
    highlightedRowText: {
        color: 'black'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'lightgray'
    }
});
