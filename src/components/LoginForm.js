import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardItem, TextField } from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({error: ''});

        // Attempt Sign In
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                // Create a new account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(err => {
                        // Show Error
                        this.setState({ error: 'Authentication Failed' });
                        console.log(err);
                    });
            });
    }
    render() {
        return (
            <Card>
                <CardItem>
                    <TextField
                        placeholder="user@gmail.com"
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={ email => this.setState({ email }) }
                        label="Email"/>
                </CardItem>

                <CardItem>
                    <TextField 
                        secureTextEntry
                        placeholder="********"
                        autoCorrect={false}
                        value={this.state.password}
                        onChangeText={ password => this.setState({ password }) }
                        label="Password"/>
                </CardItem>

                { (this.state.error.length > 1) ? <Text style={styles.errorTextStyle}>{this.state.error}</Text> : null }

                <CardItem>
                    <Button onPress={this.onButtonPress.bind(this)} buttonTitle="Login" />
                </CardItem>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;