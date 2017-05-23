import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, buttonTitle}) => {
    const { touchableStyle, textStyle } = styles;

    return (
        <TouchableOpacity style={touchableStyle} onPress={ () => onPress() }>
            <Text style={textStyle}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    touchableStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export default Button;