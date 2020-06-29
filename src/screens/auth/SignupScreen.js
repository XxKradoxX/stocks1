import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { signupWithEmail } from '../../actions/';

import { connect } from 'react-redux';

import { Formik } from 'formik';
import { AUTH_SIGNUP_OK } from "../../actions/types";

class SignupScreen extends Component {

    componentDidUpdate() {
        console.log(this.props.isVerified);
        if (this.props.isVerified == false) {
            this.props.navigation.navigate("Verification");
        }
    }

    render() {
        return(
            <View style={ styles.container }>
                <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={ values => this.props.signupWithEmail(values.email, values.password) } >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <View>
                            <Text>email</Text>
                                <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email} />
                            </View>
                            <View>
                                <Text>Password</Text>
                                <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password} />
                            </View>
                            <Button onPress={ () => handleSubmit() } title="Submit" />
                        </View>
                    )}
                </Formik>
                <View style={{ marginTop: 10 }}>
                    <Text>Already have an account?</Text>  
                    <Text 
                        style={{ color: "#0000FF" }}
                        onPress={ () => this.props.navigation.navigate("Login") }> 
                        Login
                    </Text>  
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 25,
    },
});

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        status: state.auth.status,
        err: state.auth.err,
        isVerified: state.auth.isVerified,
    }
}   

export default connect(mapStateToProps, { signupWithEmail })(SignupScreen);