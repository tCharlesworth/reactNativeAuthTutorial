import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardItem, TextField, Spinner } from './common';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };
    }
    onLoginSuccess() {
        this.setState({ 
            email: '',
            password: '',
            loading: false, 
            error: '' })
    }
    onLoginError(err) {
        // Show Error
        this.setState({ error: 'Authentication Failed', loading: false });
        console.log(err);
    }
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({error: '', loading: true});

        // Attempt Sign In
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                // Create a new account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginError.bind(this));
            });
    }
    renderError() {
        if (this.state.error.length > 1) {
            return <Text style={styles.errorTextStyle}>{this.state.error}</Text> 
        }
    }
    renderButton() {
        if( this.state.loading ) {
            return <Spinner size="small" />
        }
        return <Button onPress={this.onButtonPress.bind(this)} buttonTitle="Login" />
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

                {this.renderError()}

                <CardItem>
                    {this.renderButton()}
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