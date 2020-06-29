import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";
import { connect } from 'react-redux';
;

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import VerificationScreen from './VerificationScreen'
//import LoadingScreen from './LoadingScreen';

const Stack = createStackNavigator();

class AuthScreen extends Component {

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
        user: state.auth.user,
        status: state.auth.status,
        err: state.auth.err,
    };
}

// export default connect(null, {  })(AuthScreen);
export default AuthScreen