import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { FirebaseConfig } from './config';
import { Header, Button, Spinner } from './components/common';
import LoginForm  from './components/LoginForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: null
        }
    }
    componentWillMount() {
        // Initialize Firebase
        firebase.initializeApp(FirebaseConfig);
        // Load Authentication Handler
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                // User signed in
                this.setState({ isAuthenticated: true })
            } else {
                // User signed out
                this.setState({ isAuthenticated: false })
            }
        })
    }

    renderContent() {
        switch(this.state.isAuthenticated) {
            case true:
                return (
                    <View style={{marginTop: 40}}><Button onPress={()=>{firebase.auth().signOut()}} buttonTitle="Logout" /></View>
                );
            case false:
                return <LoginForm />;
            case null:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Auth" /> 
                {this.renderContent()}
            </View>
        )
    }
}

export default App;