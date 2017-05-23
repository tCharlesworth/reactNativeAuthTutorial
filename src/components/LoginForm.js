import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardItem, TextField } from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            passwordText: ''
        };
    }
    onButtonPress() {
        const credentials = { 
            email: this.state.emailText, 
            password: this.state.passwordText 
        };
    }
    render() {
        return (
            <Card>
                <CardItem>
                    <TextField
                        placeholder="user@gmail.com"
                        autoCorrect={false}
                        value={this.state.emailText}
                        onChangeText={ emailText => this.setState({ emailText }) }
                        label="Email"/>
                </CardItem>

                <CardItem>
                    <TextField 
                        secureTextEntry
                        placeholder="********"
                        autoCorrect={false}
                        value={this.state.passwordText}
                        onChangeText={ passwordText => this.setState({ passwordText }) }
                        label="Password"/>
                </CardItem>

                <CardItem>
                    <Button onPress={this.onButtonPress.bind(this)} buttonTitle="Login" />
                </CardItem>
            </Card>
        );
    }
}

export default LoginForm;