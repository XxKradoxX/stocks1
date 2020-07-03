import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { StackActions, NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';


import { connect } from 'react-redux';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import VerificationScreen from './VerificationScreen'
//import LoadingScreen from './LoadingScreen';

const Stack = createStackNavigator();

class AuthScreen extends Component {

    componentDidUpdate() {      
        console.log();
        if (this.props.isVerified == true && this.props.email != null) {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                })
            );
        }
    }

    render() {
        return(
            <Stack.Navigator                
            initialRouteName="Signup" 
            screenOptions={{headerShown: false}} >
                {/* <Stack.Screen name="AuthLoading" component={ LoadingScreen } /> */}
                <Stack.Screen name="Login" component={ LoginScreen } />  
                <Stack.Screen name="Signup" component={ SignupScreen } />
                <Stack.Screen name="Verification" component={ VerificationScreen } />  
            </Stack.Navigator> 
        );
    }

}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        status: state.auth.status,
        err: state.auth.err,
        isVerified: state.auth.isVerified,
    };
}

export default connect(mapStateToProps, {  })(AuthScreen);