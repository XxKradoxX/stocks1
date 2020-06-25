import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { signupWithEmail } from '../../actions/';

import { connect } from 'react-redux';

import { Formik } from 'formik';

class SignupScreen extends Component {
    render() {
        return(
            <View>
                <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => console.log(values)} >
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
                    <Button onPress={() => handleSubmit()} title="Submit" />
                </View>
                    )}
                </Formik>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        status: state.auth.status,
        err: state.auth.err,
    }
}   

export default connect(mapStateToProps, { signupWithEmail })(SignupScreen);