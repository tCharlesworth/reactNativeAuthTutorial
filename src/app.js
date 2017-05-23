import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { FirebaseConfig } from './config';
import { Header } from './components/common';
import LoginForm  from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp(FirebaseConfig);
    }

    render() {
        return (
            <View>
                <Header headerText="Auth" /> 
                <LoginForm />
            </View>
        )
    }
}

export default App;